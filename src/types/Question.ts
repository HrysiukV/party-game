import type { GameMode } from "./GameMode";

export type Question = {
  id: string;
  text: string;
  modes: GameMode[];
};