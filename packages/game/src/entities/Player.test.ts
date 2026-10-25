import { describe, it, expect } from "vitest";
import { AnimationController } from "../animation/AnimationController";
import { StateStore } from "../../../shared/src/state/StateStore";

describe("Animation", () => {
  it("creates animation controller with clips", () => {
    const root = { add: () => {} } as any;
    const clips = [];
    const anim = new AnimationController(root, clips);
    expect(anim).toBeDefined();
  });
});

describe("StateStore", () => {
  it("sets and gets values", () => {
    const store = new StateStore();
    store.set("foo", 42);
    expect(store.get("foo")).toBe(42);
  });
});
