import * as THREE from "three";

export class CameraController {
  private target: THREE.Object3D | null = null;
  private offset = new THREE.Vector3(0, 4, 8);
  private lookOffset = new THREE.Vector3(0, 1.5, 0);
  private smooth = 8;
  private prevTargetPos = new THREE.Vector3();
  private hasPrev = false;
  private targetVelocity = new THREE.Vector3();
  private baseFov = 60;
  private minDistance = 3;

  setTarget(target: THREE.Object3D): void {
    this.target = target;
    this.prevTargetPos.copy(target.position);
    this.hasPrev = true;
  }

  private mouseRotation = 0;

  rotateMouse(deltaX: number): void {
    this.mouseRotation += deltaX * 0.003;
  }

  update(camera: THREE.PerspectiveCamera, dt: number): void {
    if (!this.target) return;

    // estimate target velocity
    if (this.hasPrev) {
      this.targetVelocity.subVectors(this.target.position, this.prevTargetPos).divideScalar(Math.max(dt, 1e-4));
    }
    this.prevTargetPos.copy(this.target.position);

    // look-ahead
    const lookAhead = this.targetVelocity.clone().multiplyScalar(0.3);
    lookAhead.y = 0;

    const rotOffset = this.offset.clone();
    rotOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.mouseRotation);
    const desiredPos = this.target.position.clone().add(rotOffset).add(lookAhead);

    // collision: simple raycast from target to desired (approximate by pushing in if too close)
    // We'll clamp distance to at least minDistance from target
    const toCam = desiredPos.clone().sub(this.target.position);
    if (toCam.length() < this.minDistance) {
      toCam.setLength(this.minDistance);
      desiredPos.copy(this.target.position).add(toCam);
    }

    camera.position.lerp(desiredPos, 1 - Math.exp(-this.smooth * dt));

    const look = this.target.position.clone().add(this.lookOffset).add(lookAhead.clone().multiplyScalar(0.5));
    camera.lookAt(look);

    // dynamic FOV based on speed
    const speed = this.targetVelocity.length();
    const targetFov = this.baseFov + Math.min(speed * 0.5, 10);
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.1);
    camera.updateProjectionMatrix();
  }
}
