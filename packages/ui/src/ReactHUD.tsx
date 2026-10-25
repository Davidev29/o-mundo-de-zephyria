import React from "react";
import { createRoot } from "react-dom/client";

interface HudProps {
  health: number;
  stamina: number;
  level: number;
  island: string;
}

const HudComponent: React.FC<HudProps> = ({ health, stamina, level, island }) => (
  <div style={{ color: "#fff", fontFamily: "sans-serif" }}>
    <div><strong>{island}</strong></div>
    <div>Nível: {level}</div>
    <div>Vida: {Math.round(health)}</div>
    <div>Stamina: {Math.round(stamina)}</div>
  </div>
);

export class ReactHUD {
  private root: ReturnType<typeof createRoot>;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.root = createRoot(container);
  }

  update(props: HudProps): void {
    this.root.render(<HudComponent {...props} />);
  }

  dispose(): void {
    this.root.unmount();
  }
}
