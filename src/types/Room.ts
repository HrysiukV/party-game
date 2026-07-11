import type { Player } from "./Player";

export type RoomData = {
  hostId: string | null;
  players: Player[];
  currentPlayerId: string | null;
  card: string | null;
  penalty: string | null;
  started: boolean;
  createdAt: number;
};