export const GAME = {
  name: "O Mundo de Zephyria",
  maxLevel: 50,
  maxPlayersCoop: 4,
  islands: 8,
  elements: ["terra", "fogo", "gelo", "vento", "trovao"] as const,
} as const;

export const PLAYER = {
  baseHealth: 100,
  baseStamina: 50,
  baseSpeed: 6,
  jumpImpulse: 4,
  healthPerLevel: 5,
  staminaPerLevel: 3,
} as const;
