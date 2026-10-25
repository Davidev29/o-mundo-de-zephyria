export class Menu {
  private overlay: HTMLDivElement;

  constructor() {
    this.overlay = document.createElement("div");
    this.overlay.style.cssText =
      "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);color:#fff;font-family:sans-serif;z-index:10;";
    this.overlay.innerHTML = `
      <div style="text-align:center">
        <h1>O Mundo de Zephyria</h1>
        <p>Pressione Enter para começar</p>
      </div>
    `;
    document.body.appendChild(this.overlay);
  }

  hide(): void {
    this.overlay.style.display = "none";
  }

  show(): void {
    this.overlay.style.display = "flex";
  }
}
