export class ServiceContainer {
  private services = new Map<string, unknown>();

  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }

  get<T>(key: string): T {
    const s = this.services.get(key);
    if (!s) throw new Error(`Service not registered: ${key}`);
    return s as T;
  }

  has(key: string): boolean {
    return this.services.has(key);
  }

  dispose(): void {
    this.services.clear();
  }
}
