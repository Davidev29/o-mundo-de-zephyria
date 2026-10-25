import { describe, it, expect } from "vitest";
import { getAccessibilitySettings, updateAccessibilitySettings } from "./AccessibilitySettings";

describe("AccessibilitySettings", () => {
  it("returns defaults", () => {
    const s = getAccessibilitySettings();
    expect(s.uiScale).toBe(1);
    expect(s.colorBlindMode).toBe("none");
  });
  it("updates settings", () => {
    updateAccessibilitySettings({ uiScale: 1.5, highContrast: true });
    const s = getAccessibilitySettings();
    expect(s.uiScale).toBe(1.5);
    expect(s.highContrast).toBe(true);
  });
});
