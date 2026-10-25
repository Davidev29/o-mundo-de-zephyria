import { createGame } from "@core/GameFactory";
import { CameraController } from "@core/CameraController";
import { SceneManager } from "@core/SceneManager";
import { CostaCoral } from "@game/levels/CostaCoral";
import { Player } from "@game/entities/Player";
import { ReactHUD as HUD } from "@ui/ReactHUD";
import { Menu } from "@ui/Menu";
import { MockNetworkClient } from "@net/NetworkClient";
import { eventBus } from "@core/events/EventBus";
import { stateStore } from "@shared/state/StateStore";
import { audioManager } from "@audio/AudioManager";

async function bootstrap(): Promise<void> {
  const container = document.getElementById("app") as HTMLElement;
  const { engine } = await createGame(container);

  const cameraController = new CameraController();
  const sceneManager = new SceneManager(engine.scene);

  const level = new CostaCoral();
  await sceneManager.load(level);

  const player = new Player(engine.input, cameraController);
  player.camera = engine.camera;
  level.root.add(player.root);

  const hud = new HUD(document.getElementById("hud") as HTMLElement);
  const menu = new Menu();
  const net = new MockNetworkClient();
  await net.connect("mock://local");

  stateStore.set("currentIsland", level.name);
  eventBus.emit("game:started", { island: level.name });

  let started = false;
  window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !started) {
      started = true;
      audioManager.init();
      menu.hide();
      eventBus.emit("game:unpaused");
    }
  });

  engine.onUpdate((dt) => {
    if (!started) return;
    player.update(dt);
    cameraController.update(engine.camera, dt);
    sceneManager.update(dt);
    hud.update({
      health: player.health,
      stamina: player.stamina,
      hunger: player.hunger,
      oxygen: (player as { oxygen?: number }).oxygen ?? 100,
      level: 1,
      island: level.name,
    });
  });

  engine.start();
}

bootstrap().catch((err) => {
  console.error("Failed to bootstrap engine", err);
  const el = document.getElementById("app");
  if (el) el.textContent = String(err);
});
