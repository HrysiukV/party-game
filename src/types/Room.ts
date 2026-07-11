
export type RoomData = {
  hostId: string | null;
  players: Player[];
  currentPlayerId: string | null;
  card: string | null;
  penalty: string | null;
  started: boolean;
  createdAt: number;
  mode: string;
};

export type RoomMode =
  | "classic"
  | "choose"
  | "party";


export type Player = {
  id: string;
  name: string;
};


export type Room = {
  id: string;
  mode: RoomMode;
  players: Player[];
};