import * as THREE from "three";
import { Level } from "./Level";
import { getWorld, RAPIER } from "@core/PhysicsWorld";

// Seeded RNG (mulberry32)
function mulberry32(seed: number): () => number {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export class CostaCoral extends Level {
  constructor() {
    super("Costa Coral");
  }

  onEnter(): void {
    const rng = mulberry32(42);

    // Lighting
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x3a5f3a, 0.6);
    this.root.add(hemi);
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(50, 80, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 400;
    sun.shadow.camera.left = -200;
    sun.shadow.camera.right = 200;
    sun.shadow.camera.top = 200;
    sun.shadow.camera.bottom = -200;
    this.root.add(sun);

    const size = 400;

    // Ground
    const groundGeo = new THREE.PlaneGeometry(size, size, 80, 80);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x3fa34d, roughness: 0.9 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.root.add(ground);

    const world = getWorld();
    const groundDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(0, 0, 0);
    const groundBody = world.createRigidBody(groundDesc);
    const groundCollider = RAPIER.ColliderDesc.cuboid(size / 2, 0.5, size / 2);
    world.createCollider(groundCollider, groundBody);

    // Water
    const water = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshStandardMaterial({ color: 0x1e6fa8, transparent: true, opacity: 0.6 })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = -0.5;
    this.root.add(water);

    // Platforms (fixed)
    for (let i = 0; i < 8; i++) {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.5, 4),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
      );
      box.position.set((rng() - 0.5) * 120, 1 + rng() * 2, (rng() - 0.5) * 120);
      box.castShadow = true;
      box.receiveShadow = true;
      this.root.add(box);

      const bDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(box.position.x, box.position.y, box.position.z);
      const bBody = world.createRigidBody(bDesc);
      const bCol = RAPIER.ColliderDesc.cuboid(2, 0.25, 2);
      world.createCollider(bCol, bBody);
    }

    // Procedural scatter: trees (instanced)
    const treeCount = 1500;
    const treeGeo = new THREE.ConeGeometry(0.8, 3, 6);
    const treeMat = new THREE.MeshStandardMaterial({ color: 0x1f6f3a });
    const treeMesh = new THREE.InstancedMesh(treeGeo, treeMat, treeCount);
    treeMesh.castShadow = true;
    treeMesh.receiveShadow = true;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < treeCount; i++) {
      const x = (rng() - 0.5) * (size - 20);
      const z = (rng() - 0.5) * (size - 20);
      const scale = 0.7 + rng() * 1.3;
      dummy.position.set(x, 1.5 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.y = rng() * Math.PI * 2;
      dummy.updateMatrix();
      treeMesh.setMatrixAt(i, dummy.matrix);
    }
    treeMesh.instanceMatrix.needsUpdate = true;
    this.root.add(treeMesh);

    // Rocks (instanced)
    const rockCount = 400;
    const rockGeo = new THREE.DodecahedronGeometry(0.6, 0);
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const rockMesh = new THREE.InstancedMesh(rockGeo, rockMat, rockCount);
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    for (let i = 0; i < rockCount; i++) {
      const x = (rng() - 0.5) * (size - 20);
      const z = (rng() - 0.5) * (size - 20);
      const scale = 0.5 + rng() * 1.5;
      dummy.position.set(x, 0.3 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
      dummy.updateMatrix();
      rockMesh.setMatrixAt(i, dummy.matrix);
    }
    rockMesh.instanceMatrix.needsUpdate = true;
    this.root.add(rockMesh);

    // Bushes (instanced)
    const bushCount = 800;
    const bushGeo = new THREE.SphereGeometry(0.5, 6, 6);
    const bushMat = new THREE.MeshStandardMaterial({ color: 0x5fa35f });
    const bushMesh = new THREE.InstancedMesh(bushGeo, bushMat, bushCount);
    bushMesh.castShadow = true;
    bushMesh.receiveShadow = true;
    for (let i = 0; i < bushCount; i++) {
      const x = (rng() - 0.5) * (size - 20);
      const z = (rng() - 0.5) * (size - 20);
      const scale = 0.6 + rng() * 0.8;
      dummy.position.set(x, 0.25 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      bushMesh.setMatrixAt(i, dummy.matrix);
    }
    bushMesh.instanceMatrix.needsUpdate = true;
    this.root.add(bushMesh);
  }
}
