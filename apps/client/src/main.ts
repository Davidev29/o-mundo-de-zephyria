import React from "react";
import { createGame } from "@core/GameFactory";
import { CameraController } from "@core/CameraController";
import { SceneManager } from "@core/SceneManager";
import { CostaCoral } from "@game/levels/CostaCoral";
import { Player } from "@game/entities/Player";
import { ReactHUD as HUD } from "@ui/ReactHUD";
import { EnhancedMenu } from "@ui/EnhancedMenu";
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
  const menuContainer = document.createElement("div");
  menuContainer.id = "menu";
  document.body.appendChild(menuContainer);

  let started = false;
  import("react-dom/client").then(({ createRoot }) => {
    const root = createRoot(menuContainer);
    root.render(
      React.createElement(EnhancedMenu, {
        onStart: () => {
          started = true;
          audioManager.init();
          root.render(null);
          eventBus.emit("game:unpaused");
        },
        onConfig: () => console.log("Config"),
        onGallery: () => console.log("Gallery"),
        onCredits: () => console.log("Credits"),
      })
    );
  });

  const net = new MockNetworkClient();
  await net.connect("mock://local");

  stateStore.set("currentIsland", level.name);
  eventBus.emit("game:started", { island: level.name });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Enter" && !started) {
      started = true;
      audioManager.init();
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
