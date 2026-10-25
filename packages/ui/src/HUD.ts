export class HUD {
  private el: HTMLElement;

  constructor() {
    this.el = document.getElementById("hud") ?? document.body;
  }

  update(data: { health: number; stamina: number; level: number; island: string }): void {
    this.el.innerHTML = `
      <div><strong>${data.island}</strong></div>
      <div>Nível: ${data.level}</div>
      <div>Vida: ${Math.round(data.health)}</div>
      <div>Stamina: ${Math.round(data.stamina)}</div>
      <div style="margin-top:8px;font-size:12px;opacity:0.8">WASD mover • Espaço pular • F atacar • E interagir</div>
    `;
  }
}
