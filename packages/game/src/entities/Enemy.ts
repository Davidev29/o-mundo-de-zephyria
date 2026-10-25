import * as THREE from "three";
import { Entity } from "./Entity";

export type EnemyBehavior =
  | "passive"
  | "aggressive"
  | "territorial"
  | "ambusher"
  | "flying"
  | "armored"
  | "elemental"
  | "vorax";

export class Enemy extends Entity {
  behavior: EnemyBehavior;
  health: number;

  constructor(behavior: EnemyBehavior, color: number, health = 30) {
    super();
    this.behavior = behavior;
    this.health = health;
    const geo = new THREE.SphereGeometry(0.4, 12, 12);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    this.root.add(mesh);
  }

  update(dt: number): void {
    void dt;
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) this.alive = false;
  }
}
