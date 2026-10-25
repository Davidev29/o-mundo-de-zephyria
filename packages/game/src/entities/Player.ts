import * as THREE from "three";
import { getWorld, RAPIER } from "@core/PhysicsWorld";
import { InputService } from "@core/input/InputService";
import { CameraController } from "@core/CameraController";
import { PLAYER } from "@shared/constants/game";
import { Entity } from "./Entity";

export class Player extends Entity {
  private body: RAPIER.RigidBody;
  private mesh: THREE.Mesh;
  private input: InputService;
  private camController: CameraController;
  public camera: THREE.Camera | null = null;
  private grounded = false;

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
    this.grounded = !!hit;

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

    const speed = PLAYER.baseSpeed;
    const vel = this.body.linvel();
    const targetX = move.x * speed;
    const targetZ = move.z * speed;
    this.body.setLinvel(
      new RAPIER.Vector3(
        THREE.MathUtils.lerp(vel.x, targetX, 0.25),
        vel.y,
        THREE.MathUtils.lerp(vel.z, targetZ, 0.25)
      ),
      true
    );

    if (this.input.isAction("jump") && this.grounded) {
      this.body.applyImpulse(new RAPIER.Vector3(0, PLAYER.jumpImpulse, 0), true);
    }

    const t = this.body.translation();
    this.root.position.set(t.x, t.y, t.z);
  }

  get position(): THREE.Vector3 {
    const t = this.body.translation();
    return new THREE.Vector3(t.x, t.y, t.z);
  }
}
