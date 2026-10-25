import * as THREE from "three";

export function createPlayerClips(): THREE.AnimationClip[] {
  // Idle: subtle vertical bob
  const idleTrack = new THREE.NumberKeyframeTrack(
    ".position[y]",
    [0, 0.5, 1],
    [0, 0.15, 0]
  );
  const idleClip = new THREE.AnimationClip("idle", 1, [idleTrack]);

  // Walk: slight rotation bob on Y and Z
  const walkRotY = new THREE.NumberKeyframeTrack(
    ".rotation[y]",
    [0, 0.25, 0.5, 0.75, 1],
    [0, -0.05, 0, 0.05, 0]
  );
  const walkClip = new THREE.AnimationClip("walk", 1, [walkRotY]);

  // Jump: quick scale up then down
  const jumpScale = new THREE.VectorKeyframeTrack(
    ".scale",
    [0, 0.1, 0.5, 1],
    [
      new THREE.Vector3(1, 1, 1).toArray(),
      new THREE.Vector3(1.1, 1.2, 1.1).toArray(),
      new THREE.Vector3(1.05, 1.1, 1.05).toArray(),
      new THREE.Vector3(1, 1, 1).toArray(),
    ].flat()
  );
  const jumpClip = new THREE.AnimationClip("jump", 0.8, [jumpScale]);

  // Fall: tilt forward
  const fallRotX = new THREE.NumberKeyframeTrack(
    ".rotation[x]",
    [0, 0.5, 1],
    [0, 0.3, 0.3]
  );
  const fallClip = new THREE.AnimationClip("fall", 1, [fallRotX]);

  return [idleClip, walkClip, jumpClip, fallClip];
}
