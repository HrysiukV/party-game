import { db } from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export async function createRoom(userId: string) {
  const code = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  await setDoc(doc(db, "rooms", code), {
    hostId: userId,
    players: [],
    currentPlayerId: null,
    card: null,
    penalty: null,
    createdAt: Date.now(),
  });

  return code;
}

export async function roomExists(roomCode: string) {
  const room = await getDoc(doc(db, "rooms", roomCode));
  return room.exists();
}

export async function addPlayer(
  room: string,
  userId: string,
  name: string
) {
  await updateDoc(doc(db, "rooms", room), {
    players: arrayUnion({
      id: userId,
      name,
    }),
  });
}