import * as THREE from "three";

export class AnimationController {
  private mixer: THREE.AnimationMixer;
  private actions = new Map<string, THREE.AnimationAction>();
  private current: string | null = null;

  constructor(root: THREE.Object3D, clips: THREE.AnimationClip[]) {
    this.mixer = new THREE.AnimationMixer(root);
    clips.forEach((clip) => {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    });
  }

  play(name: string, loop = true): void {
    const next = this.actions.get(name);
    if (!next) return;
    if (this.current === name) return;
    const prev = this.current ? this.actions.get(this.current) : null;
    if (prev) prev.fadeOut(0.2);
    next.reset().fadeIn(0.2);
    next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
    next.play();
    this.current = name;
  }

  update(dt: number): void {
    this.mixer.update(dt);
  }

  dispose(): void {
    this.mixer.stopAllAction();
  }
}
