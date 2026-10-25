import * as THREE from "three";
import { SceneLike } from "@core/SceneManager";

export abstract class Level implements SceneLike {
  readonly root = new THREE.Group();
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  onEnter(): void {
    // override
  }

  onExit(): void {
    // override
  }

  update(dt: number): void {
    void dt;
  }
}
