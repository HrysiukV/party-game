import { db } from "./firebase";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
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

export async function removePlayerFromRoom(
  roomCode: string,
  userId: string
) {
  const roomRef = doc(db, "rooms", roomCode);

  const snap = await getDoc(roomRef);

  if (!snap.exists()) return;

  const data = snap.data();

  const players = (data.players || []).filter(
    (player: {
      id: string;
      name: string;
    }) => player.id !== userId
  );


  // якщо нікого не залишилось
  if (players.length === 0) {
    await deleteDoc(roomRef);
    return;
  }


  await updateDoc(roomRef, {
    players,
  });
}

