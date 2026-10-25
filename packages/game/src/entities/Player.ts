import * as THREE from "three";
import { getWorld, RAPIER } from "@core/PhysicsWorld";
import { InputService } from "@core/input/InputService";
import { CameraController } from "@core/CameraController";
import { PLAYER } from "@shared/constants/game";
import { Entity } from "./Entity";
import { AnimationController } from "../animation/AnimationController";
import { audioManager } from "@audio/AudioManager";
import { createPlayerClips } from "../animation/PlayerAnimations";

export class Player extends Entity {
  private body: RAPIER.RigidBody;
  private mesh: THREE.Mesh;
  private input: InputService;
  private camController: CameraController;
  public camera: THREE.Camera | null = null;
  private grounded = false;
  health = 100;
  stamina = 50;
  hunger = 100;
  oxygen = 100;
  animation: AnimationController | null = null;
  private wasGrounded = false;
  private coyoteTimer = 0;
  private jumpBufferTimer = 0;
  private dashCooldown = 0;
  private dashTimer = 0;
  private iFramesTimer = 0;
  private readonly coyoteTime = 0.1;
  private readonly jumpBufferTime = 0.1;
  private readonly dashDuration = 0.15;
  private readonly dashCooldownTime = 0.6;
  private readonly iFramesDuration = 0.2;
  private acceleration = 12;
  private deceleration = 18;
  private maxSpeed = PLAYER.baseSpeed;

  constructor(input: InputService, camera: CameraController) {
    super();
    this.input = input;
    this.camController = camera;

    const world = getWorld();
    const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, 3, 0)
      .setLinearDamping(2)
      .lockRotations();
    this.body = world.createRigidBody(bodyDesc);
    const colliderDesc = RAPIER.ColliderDesc.capsule(0.5, 0.35);
    world.createCollider(colliderDesc, this.body);

    const geo = new THREE.CapsuleGeometry(0.35, 1.0, 4, 8);
    const mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.root.add(this.mesh);

    this.animation = new AnimationController(this.root, createPlayerClips());

    camera.setTarget(this.root);
  }

  update(dt: number): void {
    const world = getWorld();
    const pos = this.body.translation();
    const ray = new RAPIER.Ray(
      new RAPIER.Vector3(pos.x, pos.y, pos.z),
      new RAPIER.Vector3(0, -1, 0)
    );
    const hit = world.castRay(ray, 1.2, true);
    this.wasGrounded = this.grounded;
    this.grounded = !!hit;

    // coyote time
    if (this.grounded) {
      this.coyoteTimer = this.coyoteTime;
    } else {
      this.coyoteTimer = Math.max(0, this.coyoteTimer - dt);
    }

    // jump buffer
    if (this.input.isAction("jump")) {
      this.jumpBufferTimer = this.jumpBufferTime;
    } else {
      this.jumpBufferTimer = Math.max(0, this.jumpBufferTimer - dt);
    }

    // timers
    this.dashCooldown = Math.max(0, this.dashCooldown - dt);
    this.dashTimer = Math.max(0, this.dashTimer - dt);
    this.iFramesTimer = Math.max(0, this.iFramesTimer - dt);

    // hunger decay
    this.hunger = Math.max(0, this.hunger - dt * 0.05);

    // stamina regen (when not dashing)
    if (this.dashTimer <= 0) {
      this.stamina = Math.min(50, this.stamina + dt * 8);
    }

    let yaw = 0;
    if (this.camera) {
      const dir = new THREE.Vector3();
      this.camera.getWorldDirection(dir);
      dir.y = 0;
      if (dir.lengthSq() > 0) {
        yaw = Math.atan2(dir.x, dir.z);
      }
    }

    const move = new THREE.Vector3();
    if (this.input.isAction("moveForward")) move.z -= 1;
    if (this.input.isAction("moveBackward")) move.z += 1;
    if (this.input.isAction("moveLeft")) move.x -= 1;
    if (this.input.isAction("moveRight")) move.x += 1;
    if (move.lengthSq() > 0) {
      move.normalize();
      move.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    }

    const vel = this.body.linvel();

    // dash
    if (this.input.isAction("dash") && this.dashCooldown <= 0 && move.lengthSq() > 0 && this.stamina >= 15) {
      this.dashTimer = this.dashDuration;
      this.dashCooldown = this.dashCooldownTime;
      this.iFramesTimer = this.iFramesDuration;
      this.stamina = Math.max(0, this.stamina - 15);
      const dashSpeed = this.maxSpeed * 2.5;
      this.body.setLinvel(
        new RAPIER.Vector3(move.x * dashSpeed, vel.y, move.z * dashSpeed),
        true
      );
    } else if (this.dashTimer <= 0) {
      // horizontal acceleration/deceleration
      const targetX = move.x * this.maxSpeed;
      const targetZ = move.z * this.maxSpeed;
      const accel = move.lengthSq() > 0 ? this.acceleration : this.deceleration;
      const stepX = accel * dt;
      const stepZ = accel * dt;
      const newX = Math.abs(targetX - vel.x) <= stepX ? targetX : vel.x + Math.sign(targetX - vel.x) * stepX;
      const newZ = Math.abs(targetZ - vel.z) <= stepZ ? targetZ : vel.z + Math.sign(targetZ - vel.z) * stepZ;
      this.body.setLinvel(new RAPIER.Vector3(newX, vel.y, newZ), true);
    }

    const currentVel = this.body.linvel();
    const currentSpeed = Math.sqrt(currentVel.x * currentVel.x + currentVel.z * currentVel.z);
    if (this.grounded && currentSpeed > 0.5 && this.dashTimer <= 0) {
      audioManager.playFootstep();
    }

    // jump with coyote + buffer
    if (this.jumpBufferTimer > 0 && this.coyoteTimer > 0 && this.stamina >= 5) {
      this.body.applyImpulse(new RAPIER.Vector3(0, PLAYER.jumpImpulse, 0), true);
      this.jumpBufferTimer = 0;
      this.coyoteTimer = 0;
      this.stamina = Math.max(0, this.stamina - 5);
      audioManager.playBeep(660, 0.1);
    }

    const t = this.body.translation();
    this.root.position.set(t.x, t.y, t.z);

    this.animation?.update(dt);

    // Animation state transition
    const velY = this.body.linvel();
    const speed = Math.sqrt(velY.x * velY.x + velY.z * velY.z);
    const anim = this.animation;
    if (anim) {
      if (!this.grounded && velY.y < -0.5) {
        anim.play("fall", false);
      } else if (!this.grounded && this.coyoteTimer > 0 && this.jumpBufferTimer > 0) {
        anim.play("jump", false);
      } else if (speed > 1) {
        anim.play("walk", true);
      } else {
        anim.play("idle", true);
      }
    }

    // i-frames visual (opacity) optional
    const mesh = this.root.children[0] as THREE.Mesh;
    if (mesh && mesh.material) {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = this.iFramesTimer > 0 ? 0.5 : 1;
      mat.transparent = this.iFramesTimer > 0;
    }
  }

  get position(): THREE.Vector3 {
    const t = this.body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  }
}
