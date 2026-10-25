export interface NetworkEvents {
  onPlayerJoin?: (id: string) => void;
  onPlayerLeave?: (id: string) => void;
  onState?: (state: unknown) => void;
}

export abstract class NetworkClient {
  protected events: NetworkEvents = {};

  setEvents(events: NetworkEvents): void {
    this.events = events;
  }

  abstract connect(url: string): Promise<void>;
  abstract disconnect(): void;
  abstract send(action: string, payload: unknown): void;
}

export class MockNetworkClient extends NetworkClient {
  async connect(_url: string): Promise<void> {
    // no-op mock for local development
  }

  disconnect(): void {
    // no-op
  }

  send(action: string, payload: unknown): void {
    void action;
    void payload;
  }
}
