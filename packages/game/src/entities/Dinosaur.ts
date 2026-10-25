import * as THREE from "three";
import { Element, DinosaurState } from "@shared/types";
import { Entity } from "./Entity";

export abstract class Dinosaur extends Entity {
  readonly element: Element;
  stage: 1 | 2 | 3 = 1;
  bond = 1;

  constructor(element: Element, color: number) {
    super();
    this.element = element;
    const geo = new THREE.BoxGeometry(1, 1, 1.5);
    const mat = new THREE.MeshStandardMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    this.root.add(mesh);
  }

  abstract useAbility(): void;

  toState(id: string): DinosaurState {
    return { id, element: this.element, stage: this.stage, bond: this.bond };
  }

  update(dt: number): void {
    void dt;
  }
}
