import { Engine } from "./Engine";
import { ServiceContainer } from "./services/ServiceContainer";
import { eventBus } from "./events/EventBus";
import { stateStore } from "@shared/state/StateStore";
import { initPhysics } from "./PhysicsWorld";

export interface GameContext {
  engine: Engine;
  services: ServiceContainer;
}

export async function createGame(container: HTMLElement): Promise<GameContext> {
  const engine = new Engine(container);
  await engine.init();

  const services = new ServiceContainer();
  services.register("engine", engine);
  services.register("eventBus", eventBus);
  services.register("stateStore", stateStore);

  return { engine, services };
}

export { initPhysics };
