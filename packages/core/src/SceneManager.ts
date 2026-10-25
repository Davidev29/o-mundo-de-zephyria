import * as THREE from "three";

export interface SceneLike {
  root: THREE.Group;
  onEnter?(): void;
  onExit?(): void;
  update?(dt: number): void;
}

export class SceneManager {
  private current: SceneLike | null = null;
  private scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  async load(next: SceneLike): Promise<void> {
    if (this.current) {
      this.current.onExit?.();
      this.scene.remove(this.current.root);
    }
    this.current = next;
    this.scene.add(next.root);
    next.onEnter?.();
  }

  update(dt: number): void {
    this.current?.update?.(dt);
  }

  get currentScene(): SceneLike | null {
    return this.current;
  }
}
