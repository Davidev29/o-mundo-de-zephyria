import * as THREE from "three";
import { initPhysics, stepPhysics } from "./PhysicsWorld";
import { InputService } from "./input/InputService";

export interface EngineUpdateCallback {
  (dt: number): void;
}

export class Engine {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  readonly input: InputService;
  readonly clock = new THREE.Clock();

  private container: HTMLElement;
  private updateCallbacks: EngineUpdateCallback[] = [];
  private running = false;
  private rafId = 0;

  constructor(container: HTMLElement) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 40, 120);

    this.camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      500
    );
    this.camera.position.set(0, 5, 10);

    this.input = new InputService();

    window.addEventListener("resize", () => this.onResize());
  }

  async init(): Promise<void> {
    await initPhysics();
  }

  onUpdate(cb: EngineUpdateCallback): void {
    this.updateCallbacks.push(cb);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this.loop();
  }

  stop(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private loop = (): void => {
    if (!this.running) return;
    const dt = Math.min(this.clock.getDelta(), 1 / 30);
    this.input.update();
    for (const cb of this.updateCallbacks) cb(dt);
    stepPhysics(dt);
    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this.loop);
  };

  private onResize(): void {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }
}
