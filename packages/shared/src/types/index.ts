export type Element = "terra" | "fogo" | "gelo" | "vento" | "trovao";

export interface PlayerStats {
  maxHealth: number;
  stamina: number;
  speed: number;
  attack: number;
}

export interface DinosaurState {
  id: string;
  element: Element;
  stage: 1 | 2 | 3;
  bond: number;
}

export interface GameState {
  level: number;
  xp: number;
  island: number;
  dinosaurs: DinosaurState[];
}
