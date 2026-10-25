import RAPIER from "@dimforge/rapier3d-compat";

let world: RAPIER.World | null = null;

export async function initPhysics(): Promise<RAPIER.World> {
  await RAPIER.init();
  world = new RAPIER.World(new RAPIER.Vector3(0, -9.81, 0));
  return world;
}

export function getWorld(): RAPIER.World {
  if (!world) throw new Error("Physics not initialized. Call initPhysics() first.");
  return world;
}

export function stepPhysics(dt: number): void {
  if (world) world.step();
}

export { RAPIER };
