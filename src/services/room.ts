import { db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function createRoom(roomCode: string) {
  await setDoc(doc(db, "rooms", roomCode), {
    createdAt: Date.now(),
    started: false,
    players: [],
    currentPlayer: "",
    currentCard: null,
  });
}

export async function roomExists(roomCode: string) {
  const room = await getDoc(doc(db, "rooms", roomCode));
  return room.exists();
}