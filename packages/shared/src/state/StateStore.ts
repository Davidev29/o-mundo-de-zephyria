type Listener = (state: Record<string, unknown>) => void;

export class StateStore {
  private state: Record<string, unknown> = {};
  private listeners = new Set<Listener>();

  get<T = unknown>(key: string): T | undefined {
    return this.state[key] as T | undefined;
  }

  set(key: string, value: unknown): void {
    this.state[key] = value;
    this.notify();
  }

  update(partial: Record<string, unknown>): void {
    Object.assign(this.state, partial);
    this.notify();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  snapshot(): Record<string, unknown> {
    return { ...this.state };
  }

  private notify(): void {
    const snap = this.snapshot();
    this.listeners.forEach((l) => l(snap));
  }
}

export const stateStore = new StateStore();
