export type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia";

export interface AccessibilitySettings {
  highContrast: boolean;
  colorBlindMode: ColorBlindMode;
  reduceMotion: boolean;
  uiScale: number;
  subtitles: boolean;
  damageNumbers: boolean;
}

const defaults: AccessibilitySettings = {
  highContrast: false,
  colorBlindMode: "none",
  reduceMotion: false,
  uiScale: 1,
  subtitles: true,
  damageNumbers: true,
};

let settings: AccessibilitySettings = { ...defaults };

export function getAccessibilitySettings(): AccessibilitySettings {
  return { ...settings };
}

export function updateAccessibilitySettings(partial: Partial<AccessibilitySettings>): void {
  settings = { ...settings, ...partial };
  applyAccessibilitySettings();
}

export function applyAccessibilitySettings(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--ui-scale", String(settings.uiScale));
  root.classList.toggle("high-contrast", settings.highContrast);
  root.classList.toggle("reduce-motion", settings.reduceMotion);
  root.dataset.colorBlind = settings.colorBlindMode;
}
