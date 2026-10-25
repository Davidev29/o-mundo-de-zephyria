const DB_NAME = "zephyria";
const STORE = "saves";

export interface SaveData {
  version: number;
  slot: number;
  data: unknown;
  updatedAt: number;
}

export class SaveManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    if (typeof indexedDB === "undefined") return;
    this.db = await new Promise<IDBDatabase>((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "slot" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async save(slot: number, data: unknown, version = 1): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    const entry: SaveData = { version, slot, data, updatedAt: Date.now() };
    await new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(entry);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async load(slot: number): Promise<SaveData | null> {
    if (!this.db) await this.init();
    if (!this.db) return null;
    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(slot);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  }

  async delete(slot: number): Promise<void> {
    if (!this.db) await this.init();
    if (!this.db) return;
    await new Promise<void>((resolve, reject) => {
      const tx = this.db!.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(slot);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
}

export const saveManager = new SaveManager();
