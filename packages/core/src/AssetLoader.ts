import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

export interface LoadedGLTF {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
}

export class AssetLoader {
  private gltfLoader = new GLTFLoader();
  private textureLoader = new THREE.TextureLoader();
  private dracoLoader: DRACOLoader | null = null;
  private ktx2Loader: KTX2Loader | null = null;
  private cache = new Map<string, LoadedGLTF>();

  constructor(renderer?: THREE.WebGLRenderer) {
    try {
      const draco = new DRACOLoader();
      draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
      this.gltfLoader.setDRACOLoader(draco);
      this.dracoLoader = draco;
    } catch (e) {
      console.warn("DRACO loader unavailable", e);
    }

    if (renderer) {
      try {
        const ktx2 = new KTX2Loader();
        ktx2.setTranscoderPath("https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/libs/basis/");
        ktx2.detectSupport(renderer);
        this.gltfLoader.setKTX2Loader(ktx2);
        this.ktx2Loader = ktx2;
      } catch (e) {
        console.warn("KTX2 loader unavailable", e);
      }
    }
  }

  async loadGLTF(url: string): Promise<LoadedGLTF> {
    const cached = this.cache.get(url);
    if (cached) {
      return { scene: cached.scene.clone(), animations: cached.animations };
    }
    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => {
          const entry: LoadedGLTF = { scene: gltf.scene, animations: gltf.animations ?? [] };
          this.cache.set(url, entry);
          resolve({ scene: entry.scene.clone(), animations: entry.animations });
        },
        undefined,
        reject
      );
    });
  }

  async loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(url, resolve, undefined, reject);
    });
  }

  dispose(): void {
    this.dracoLoader?.dispose();
    this.ktx2Loader?.dispose();
  }
}
