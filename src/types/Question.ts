import type { RoomMode } from "./Room";

export type Question = {
  id: string;
  text: string;
  mode: RoomMode;
};