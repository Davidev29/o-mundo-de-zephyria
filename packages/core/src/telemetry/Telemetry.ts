import { config } from "@shared/config/env";

export interface TelemetryEvent {
  name: string;
  payload?: Record<string, unknown>;
  timestamp: number;
}

export class Telemetry {
  private enabled = config.telemetryEnabled;
  private queue: TelemetryEvent[] = [];

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  track(name: string, payload?: Record<string, unknown>): void {
    if (!this.enabled) return;
    const event: TelemetryEvent = { name, payload, timestamp: Date.now() };
    this.queue.push(event);
    // In production, batch-send to analytics endpoint.
    if (this.queue.length > 50) this.flush();
  }

  flush(): void {
    if (!this.enabled || this.queue.length === 0) return;
    const batch = this.queue.splice(0, this.queue.length);
    // Placeholder: send to server.
    console.debug("Telemetry flush", batch.length);
  }
}

export const telemetry = new Telemetry();
