import { db } from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";


export async function createRoom(
  roomCode: string,
  userId: string
) {
  await setDoc(doc(db, "rooms", roomCode), {
    hostId: userId,
    players: [],
    currentPlayerId: null,
    card: null,
    penalty: null,
    started: false,
    createdAt: Date.now(),
  });
}


export async function getRoom(
  roomCode: string
) {
  return await getDoc(
    doc(db, "rooms", roomCode)
  );
}


export async function updateRoom(
  roomCode: string,
  data: any
) {
  return await updateDoc(
    doc(db, "rooms", roomCode),
    data
  );
}


export async function removeRoom(
  roomCode: string
) {
  return await deleteDoc(
    doc(db, "rooms", roomCode)
  );
}


export async function addPlayerToRoom(
  roomCode: string,
  userId: string,
  name: string
) {
  return await updateDoc(
    doc(db, "rooms", roomCode),
    {
      players: arrayUnion({
        id: userId,
        name,
      }),
    }
  );
}

