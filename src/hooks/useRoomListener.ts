import { useEffect } from "react";
import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../services/firebase";

type Props = {
  room: string | null;

  setPlayers: (players: any[]) => void;
  setCurrentPlayerId: (id: string | null) => void;
  setCard: (card: string | null) => void;
  setPenalty: (penalty: string | null) => void;
  setHostId: (id: string | null) => void;
  setMode: (mode: string) => void;

  setScreen: (
    screen: "room" | "players" | "game" | "admin"
  ) => void;

  userId: string;
};


export function useRoomListener({
  room,

  setPlayers,
  setCurrentPlayerId,
  setCard,
  setPenalty,
  setHostId,
  setMode,

  setScreen,

  userId,

}: Props) {

  useEffect(() => {
    if (!room) return;


    const unsubscribe = onSnapshot(
      doc(db, "rooms", room),
      (snap) => {

        if (!snap.exists())
          return;


        const data = snap.data();


        setPlayers(
          data.players || []
        );


        setCurrentPlayerId(
          data.currentPlayerId || null
        );


        setCard(
          data.card || null
        );


        setPenalty(
          data.penalty || null
        );


        setHostId(
          data.hostId || null
        );


        setMode(
          data.mode || "classic"
        );


        if (
          data.started &&
          data.players?.some(
            (p: any) =>
              p.id === userId
          )
        ) {
          setScreen("game");
        }

      }
    );


    return () => unsubscribe();


  }, [room]);

}