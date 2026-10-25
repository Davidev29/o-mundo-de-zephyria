import React from "react";
import { createRoot } from "react-dom/client";
import { stateStore } from "@shared/state/StateStore";

interface HudProps {
  health: number;
  stamina: number;
  hunger: number;
  oxygen: number;
  level: number;
  island: string;
}

const HudComponent: React.FC<HudProps> = ({ health, stamina, hunger, oxygen, level, island }) => (
  <div style={{ color: "#fff", fontFamily: "sans-serif" }}>
    <div><strong>{island}</strong></div>
    <div>Nível: {level}</div>
    <div>Vida: {Math.round(health)}</div>
    <div>Stamina: {Math.round(stamina)}</div>
    <div>Fome: {Math.round(hunger)}</div>
    <div>Oxigênio: {Math.round(oxygen)}</div>
  </div>
);

export class ReactHUD {
  private root: ReturnType<typeof createRoot>;
  private container: HTMLElement;
  private unsubscribe?: () => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.root = createRoot(container);
    this.unsubscribe = stateStore.subscribe((snap) => {
      this.root.render(
        <HudComponent
          health={(snap.currentHealth as number) ?? 100}
          stamina={(snap.currentStamina as number) ?? 50}
          hunger={(snap.currentHunger as number) ?? 100}
          oxygen={(snap.currentOxygen as number) ?? 100}
          level={(snap.currentLevel as number) ?? 1}
          island={(snap.currentIsland as string) ?? ""}
        />
      );
    });
  }

  update(props: Partial<HudProps>): void {
    stateStore.update({
      currentHealth: props.health,
      currentStamina: props.stamina,
      currentHunger: props.hunger,
      currentOxygen: props.oxygen ?? 100,
      currentLevel: props.level,
      currentIsland: props.island,
    });
  }

  dispose(): void {
    this.unsubscribe?.();
    this.root.unmount();
  }
}
