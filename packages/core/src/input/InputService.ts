export type Action =
  | "moveForward"
  | "moveBackward"
  | "moveLeft"
  | "moveRight"
  | "jump"
  | "interact"
  | "attack"
  | "pause";

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
  Escape: "pause",
};

export class InputService {
  private actions = new Set<Action>();
  private keyState = new Set<string>();

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", (e) => this.onKey(e, true));
      window.addEventListener("keyup", (e) => this.onKey(e, false));
      window.addEventListener("blur", () => {
        this.actions.clear();
        this.keyState.clear();
      });
      window.addEventListener("gamepadconnected", () => {
        // gamepad polling starts automatically in update()
      });
    }
  }

  private onKey(e: KeyboardEvent, down: boolean): void {
    if (e.repeat) return;
    const action = KEY_MAP[e.code];
    if (action) {
      if (down) this.actions.add(action);
      else this.actions.delete(action);
      e.preventDefault();
    }
    if (down) this.keyState.add(e.code);
    else this.keyState.delete(e.code);
  }

  /** Poll gamepads; call once per frame. */
  update(): void {
    const gps = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const gp of gps) {
      if (!gp) continue;
      // Standard mapping: axes[0] left stick X, axes[1] Y; buttons
      const deadzone = 0.2;
      const x = gp.axes[0] ?? 0;
      const y = gp.axes[1] ?? 0;
      if (x < -deadzone) this.actions.add("moveLeft");
      else this.actions.delete("moveLeft");
      if (x > deadzone) this.actions.add("moveRight");
      else this.actions.delete("moveRight");
      if (y < -deadzone) this.actions.add("moveForward");
      else this.actions.delete("moveForward");
      if (y > deadzone) this.actions.add("moveBackward");
      else this.actions.delete("moveBackward");
      if (gp.buttons[0]?.pressed) this.actions.add("jump");
      if (gp.buttons[1]?.pressed) this.actions.add("attack");
      if (gp.buttons[2]?.pressed) this.actions.add("interact");
      if (gp.buttons[9]?.pressed) this.actions.add("pause");
    }
  }

  isAction(action: Action): boolean {
    return this.actions.has(action);
  }

  dispose(): void {
    // listeners are anonymous; reload clears them
  }
}
