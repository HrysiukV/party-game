import { useState } from "react";

export function useRoom() {
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");

  const [players, setPlayers] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const [currentPlayerId, setCurrentPlayerId] =
    useState<string | null>(null);

  const [hostId, setHostId] =
    useState<string | null>(null);

  const [card, setCard] =
    useState<string | null>(null);

  const [penalty, setPenalty] =
    useState<string | null>(null);

  return {
    room,
    setRoom,

    roomInput,
    setRoomInput,

    players,
    setPlayers,

    currentPlayerId,
    setCurrentPlayerId,

    hostId,
    setHostId,

    card,
    setCard,

    penalty,
    setPenalty,
  };
}