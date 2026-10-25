import * as THREE from "three";

export abstract class Entity {
  readonly root = new THREE.Group();
  alive = true;

  abstract update(dt: number): void;

  dispose(): void {
    this.root.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
        else m.material?.dispose();
      }
    });
  }
}
