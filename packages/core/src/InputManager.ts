export type Action =
  | "moveForward"
  | "moveBackward"
  | "moveLeft"
  | "moveRight"
  | "jump"
  | "interact"
  | "attack";

const KEY_MAP: Record<string, Action> = {
  KeyW: "moveForward",
  ArrowUp: "moveForward",
  KeyS: "moveBackward",
  ArrowDown: "moveBackward",
  KeyA: "moveLeft",
  ArrowLeft: "moveLeft",
  KeyD: "moveRight",
  ArrowRight: "moveRight",
  Space: "jump",
  KeyE: "interact",
  KeyF: "attack",
};

export class InputManager {
  private pressed = new Set<string>();
  private actions = new Set<Action>();

  constructor() {
    window.addEventListener("keydown", (e) => this.onKey(e, true));
    window.addEventListener("keyup", (e) => this.onKey(e, false));
    window.addEventListener("blur", () => {
      this.pressed.clear();
      this.actions.clear();
    });
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    if (e.repeat) return;
    const action = KEY_MAP[e.code];
    if (action) {
      if (down) this.actions.add(action);
      else this.actions.delete(action);
      e.preventDefault();
    }
    if (down) this.pressed.add(e.code);
    else this.pressed.delete(e.code);
  }

  isAction(action: Action): boolean {
    return this.actions.has(action);
  }

  dispose(): void {
    // listeners are anonymous; reload clears them. Kept for API symmetry.
  }
}
