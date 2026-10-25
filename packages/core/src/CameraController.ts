import * as THREE from "three";

export class CameraController {
  private target: THREE.Object3D | null = null;
  private offset = new THREE.Vector3(0, 4, 8);
  private lookOffset = new THREE.Vector3(0, 1.5, 0);
  private smooth = 8;

  setTarget(target: THREE.Object3D): void {
    this.target = target;
  }

  update(camera: THREE.PerspectiveCamera, dt: number): void {
    if (!this.target) return;
    const desired = this.target.position.clone().add(this.offset);
    camera.position.lerp(desired, 1 - Math.exp(-this.smooth * dt));
    const look = this.target.position.clone().add(this.lookOffset);
    camera.lookAt(look);
  }
}
