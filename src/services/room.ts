import { db } from "./firebase";
import type { GameMode } from "../types/GameMode";

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
  mode: GameMode
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

  const players = data.players || [];

  const removedIndex = players.findIndex(
    (p: any) => p.id === userId
  );

  const newPlayers = players.filter(
    (p: any) => p.id !== userId
  );

  // якщо нікого не залишилось — видаляємо кімнату
  if (newPlayers.length === 0) {
    await deleteDoc(roomRef);
    return;
  }

  let currentPlayerId = data.currentPlayerId;

  // якщо вийшов той, чий зараз хід
  if (currentPlayerId === userId) {
    let nextIndex = removedIndex;

    if (nextIndex >= newPlayers.length) {
      nextIndex = 0;
    }

    currentPlayerId = newPlayers[nextIndex].id;
  }

  // якщо вийшов хост — передаємо хоста першому гравцю
  let hostId = data.hostId;

  if (hostId === userId) {
    hostId = newPlayers[0].id;
  }

  await updateDoc(roomRef, {
    players: newPlayers,
    currentPlayerId,
    hostId,
  });
}