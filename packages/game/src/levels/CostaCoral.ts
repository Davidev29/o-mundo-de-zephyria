import * as THREE from "three";
import { Level } from "./Level";
import { getWorld, RAPIER } from "@core/PhysicsWorld";

export class CostaCoral extends Level {
  constructor() {
    super("Costa Coral");
  }

  onEnter(): void {
    // Lighting
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x3a5f3a, 0.6);
    this.root.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(50, 80, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 200;
    sun.shadow.camera.left = -60;
    sun.shadow.camera.right = 60;
    sun.shadow.camera.top = 60;
    sun.shadow.camera.bottom = -60;
    this.root.add(sun);

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x3fa34d, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.root.add(ground);

    const world = getWorld();
    const groundDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
    const groundBody = world.createRigidBody(groundDesc);
    const groundCollider = RAPIER.ColliderDesc.cuboid(100, 0.1, 100);
    world.createCollider(groundCollider, groundBody);

    // A few platforms
    for (let i = 0; i < 5; i++) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.5, 4),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
      );
      box.position.set((i - 2) * 8, 1 + i * 0.5, -10);
      box.castShadow = true;
      box.receiveShadow = true;
      this.root.add(box);

      const bDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(box.position.x, box.position.y, box.position.z);
      const bBody = world.createRigidBody(bDesc);
      const bCol = RAPIER.ColliderDesc.cuboid(2, 0.25, 2);
      world.createCollider(bCol, bBody);
    }

    // Water plane hint
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x1e6fa8, transparent: true, opacity: 0.6 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.5;
    this.root.add(water);
  }
}
