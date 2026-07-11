import { db } from "./firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";

const avatars = [
  "😎",
  "🤠",
  "🦊",
  "🐼",
  "🐸",
  "👻",
  "🤖",
  "🐯",
  "🦁",
  "🐨",
  "🐵",
  "🐙",
  "🦄",
  "🐧",
  "🐺",
  "🐱",
  "🐻",
  "🦥",
  "🐲",
  "🦉",
];

export async function createRoom(
  roomCode: string,
  hostId: string,
  mode: string
) {
  await setDoc(doc(db, "rooms", roomCode), {
    hostId,
    mode,
    players: [],
    currentPlayerId: null,
    card: null,
    penalty: null,
    started: false,
    createdAt: Date.now(),
  });
}

export async function getRoom(roomCode: string) {
  return await getDoc(doc(db, "rooms", roomCode));
}

export async function roomExists(roomCode: string) {
  const room = await getRoom(roomCode);
  return room.exists();
}

export async function updateRoom(
  roomCode: string,
  data: Record<string, any>
) {
  await updateDoc(doc(db, "rooms", roomCode), data);
}

export async function removeRoom(roomCode: string) {
  await deleteDoc(doc(db, "rooms", roomCode));
}

export async function addPlayer(
  roomCode: string,
  userId: string,
  name: string
) {
  await updateDoc(doc(db, "rooms", roomCode), {
    players: arrayUnion({
      id: userId,
      name: name.trim(),
      avatar:
        avatars[
          Math.floor(Math.random() * avatars.length)
        ],
    }),
  });
}

export async function removePlayer(
  roomCode: string,
  userId: string
) {
  const roomRef = doc(db, "rooms", roomCode);

  const snap = await getDoc(roomRef);

  if (!snap.exists()) return;

  const data = snap.data();

  const players = (data.players || []).filter(
    (player: any) => player.id !== userId
  );

  if (players.length === 0) {
    await deleteDoc(roomRef);
    return;
  }

  await updateDoc(roomRef, {
    players,
  });
}