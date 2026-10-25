import { describe, it, expect } from "vitest";
import { StateStore } from "./StateStore";

describe("StateStore", () => {
  it("sets and gets values", () => {
    const store = new StateStore();
    store.set("foo", 42);
    expect(store.get("foo")).toBe(42);
  });

  it("notifies subscribers", () => {
    const store = new StateStore();
    let called = false;
    store.subscribe(() => {
      called = true;
    });
    store.set("bar", 1);
    expect(called).toBe(true);
  });
});
