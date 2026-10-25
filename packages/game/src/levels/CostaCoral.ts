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

    // Procedural trees: trunk + crown
    const treeTrunkGeo = new THREE.CylinderGeometry(0.15, 0.2, 1.2, 6);
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5c3a1e });
    const treeCrownGeo = new THREE.ConeGeometry(0.9, 2.5, 6);
    const treeCrownMat = new THREE.MeshStandardMaterial({ color: 0x1f6f3a });

    for (let i = 0; i < 300; i++) {
      const x = (rng() - 0.5) * (size - 20);
      const z = (rng() - 0.5) * (size - 20);
      const scale = 0.7 + rng() * 1.3;

      // Trunk
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat);
      trunk.position.set(x, 0.6 * scale, z);
      trunk.scale.set(scale, scale, scale);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      this.root.add(trunk);

      // Crown
      const crown = new THREE.Mesh(treeCrownGeo, treeCrownMat);
      crown.position.set(x, 1.2 * scale + 0.6 * scale, z);
      crown.scale.set(scale, scale, scale);
      crown.castShadow = true;
      crown.receiveShadow = true;
      this.root.add(crown);
    }

    // Grass patches (procedural detail)
    const grassCount = 2000;
    const grassGeo = new THREE.PlaneGeometry(0.8, 0.8);
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x4a7a3a, transparent: true, opacity: 0.9 });
    for (let i = 0; i < grassCount; i++) {
      const x = (rng() - 0.5) * (size - 30);
      const z = (rng() - 0.5) * (size - 30);
      const blade = new THREE.Mesh(grassGeo, grassMat);
      blade.position.set(x, 0.02, z);
      blade.rotation.x = -Math.PI / 2;
      blade.rotation.z = rng() * Math.PI * 2;
      blade.scale.set(1, 0.5 + rng() * 1.5, 1);
      this.root.add(blade);
    }

    // Rocks with better variation
    const rockCount = 400;
    for (let i = 0; i < rockCount; i++) {
      const x = (rng() - 0.5) * (size - 20);
      const z = (rng() - 0.5) * (size - 20);
      const scale = 0.5 + rng() * 1.5;
      const rockGeo = new THREE.DodecahedronGeometry(0.6 * scale, 0);
      const rockMat = new THREE.MeshStandardMaterial({
        color: 0x7a6e60,
        roughness: 0.9,
        metalness: 0.1,
      });
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(x, 0.2 * scale + 0.05, z);
      rock.castShadow = true;
      rock.receiveShadow = true;
      rock.rotation.set(rng() * Math.PI, rng() * Math.PI, rng() * Math.PI);
      this.root.add(rock);
    }

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
      dummy.position.set(x, 0.25 * scale + 0.05, z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      bushMesh.setMatrixAt(i, dummy.matrix);
    }
    bushMesh.instanceMatrix.needsUpdate = true;
    this.root.add(bushMesh);
  }
}
