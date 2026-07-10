import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./screens/Admin.tsx";
import Room from "./screens/Room";
import Players from "./screens/Players";
import Game from "./screens/Game";

import {
  addTruth,
  addDare,
  addPenalty,
  deleteTruth,
  deleteDare,
  deletePenalty,
} from "./services/questions";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  collection,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./services/firebase";

const tg = (window as any).Telegram?.WebApp;

const userId =
  tg?.initDataUnsafe?.user?.id?.toString() ??
  crypto.randomUUID();

const isAdmin = userId === "846617693";

function App() {
  // UI
 const [screen, setScreen] = useState<  "room" | "players" | "game" | "admin">("room");

  // ROOM
  const [room, setRoom] = useState<string | null>(null);

  const [roomInput, setRoomInput] = useState("");

  // GAME STATE (SYNC FIREBASE)
  type Player = {
  id: string;
  name: string;
};

const [players, setPlayers] = useState<Player[]>([]);
const [currentPlayerId, setCurrentPlayerId] =
  useState<string | null>(null);

  const [hostId, setHostId] =
  useState<string | null>(null);

  const [card, setCard] = useState<string | null>(null);
  const [penalty, setPenalty] = useState<string | null>(null);
const [showJoin, setShowJoin] = useState(false);
const [name, setName] = useState("");

type Question = {
  id: string;
  text: string;
};

const [truths, setTruths] = useState<Question[]>([]);
const [dares, setDares] = useState<Question[]>([]);
const [penalties, setPenalties] = useState<Question[]>([]);
const [, setStarted] = useState(false);

const currentPlayer =
  players.find(
    (player) => player.id === currentPlayerId
  )?.name ?? null;

  const isMyTurn = currentPlayerId === userId;

  // REALTIME LISTENER
useEffect(() => {
  const unsubTruths = onSnapshot(collection(db, "truths"), (snapshot) => {
    setTruths(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text || "",
      }))
    );
  });

  const unsubDares = onSnapshot(collection(db, "dares"), (snapshot) => {
    setDares(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text || "",
      }))
    );
  });

  const unsubPenalties = onSnapshot(collection(db, "penalties"), (snapshot) => {
    setPenalties(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text || "",
      }))
    );
  });

  return () => {
    unsubTruths();
    unsubDares();
    unsubPenalties();
  };
}, []);

useEffect(() => {
  if (!room) return;

  const unsub = onSnapshot(
    doc(db, "rooms", room),
    (snap) => {
      if (!snap.exists()) return;

      const data = snap.data();

      setPlayers(data.players || []);
      setCurrentPlayerId(data.currentPlayerId || null);
      setCard(data.card || null);
      setPenalty(data.penalty || null);
      setHostId(data.hostId || null);
      setStarted(data.started || false);
      if (data.started) {
  setScreen("game");
}
    }
  );

  return () => unsub();
}, [room]);

  // CREATE ROOM
async function createRoom() {
  const code = Math.random().toString(36).substring(2, 7).toUpperCase();

  await setDoc(doc(db, "rooms", code), {
    hostId: userId,
    players: [],
    currentPlayerId: null,
    card: null,
    penalty: null,
    started: false,
    createdAt: Date.now(),
  });

  setRoom(code);
  setScreen("players");
}

  // JOIN ROOM (FIXED)
  async function joinRoom() {
    const code = roomInput.trim().toUpperCase();

    if (!code) {
      alert("Введи код кімнати");
      return;
    }

    const roomRef = doc(db, "rooms", code);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      alert("Кімната не знайдена");
      return;
    }

  const data = roomSnap.data();

setRoom(code);

if (data.started) {
    setScreen("game");
} else {
    setScreen("players");
}

  }

  // ADD PLAYER
  async function addPlayer() {
  if (!room || !name.trim()) return;

  const exists = players.some(
    (player) => player.id === userId
  );

  if (exists) {
    alert("Ти вже приєднався до кімнати");
    return;
  }

  await updateDoc(doc(db, "rooms", room), {
    players: arrayUnion({
  id: userId,
  name: name.trim(),
}),
  });
}

async function leaveRoom() {
  if (!room) return;

  const roomRef = doc(db, "rooms", room);
  const snap = await getDoc(roomRef);

  if (!snap.exists()) return;

  const data = snap.data();

  const updatedPlayers = (data.players || []).filter(
    (player: Player) => player.id !== userId
  );

  // Якщо нікого не залишилось — видаляємо кімнату
  if (updatedPlayers.length === 0) {
    await deleteDoc(roomRef);
  } else {
    await updateDoc(roomRef, {
      players: updatedPlayers,
    });
  }

  setRoom(null);
  setPlayers([]);
  setCard(null);
  setPenalty(null);
  setCurrentPlayerId(null);
  setScreen("room");
}

  // START GAME
  async function startGame() {
  if (!room || players.length === 0) return;

  const random =
    players[Math.floor(Math.random() * players.length)];

  await updateDoc(doc(db, "rooms", room), {
  currentPlayerId: random.id,
  started: true,
});

  setScreen("game");
}

  // NEXT TURN
  async function nextTurn() {
  if (!room || players.length === 0) return;

  const currentIndex = players.findIndex(
    (player) => player.id === currentPlayerId
  );

  const nextIndex =
    currentIndex === players.length - 1
      ? 0
      : currentIndex + 1;

  await updateDoc(doc(db, "rooms", room), {
    currentPlayerId: players[nextIndex].id,
    card: null,
    penalty: null,
  });
}

  // DRAW CARD
  async function drawCard() {
  if (!room) return;

  const type = Math.random() < 0.5 ? "truth" : "dare";

  const list = type === "truth" ? truths : dares;

  if (list.length === 0) return;

  const randomItem =
    list[Math.floor(Math.random() * list.length)];

  const text =
    type === "truth"
      ? `🧠 ПРАВДА\n\n${randomItem.text}`
      : `🔥 ДІЯ\n\n${randomItem.text}`;

  await updateDoc(doc(db, "rooms", room), {
    card: text,
    penalty: null,
  });
}

  // REFUSE
 async function refuse() {
  if (!room) return;

  const random =
  penalties.length
    ? penalties[Math.floor(Math.random() * penalties.length)].text
    : "Випий 1 ковток 🍺";

  await updateDoc(doc(db, "rooms", room), {
    penalty: "⚠️ ШТРАФ:\n\n" + random,
    card: null,
  });
}


  // SCREENS
  if (screen === "room") {
    return (
      <Room
  roomInput={roomInput}
  setRoomInput={setRoomInput}
  createRoom={createRoom}
  joinRoom={joinRoom}
  showJoin={showJoin}
  setShowJoin={setShowJoin}
  isAdmin={isAdmin}
openAdmin={() => {
  console.log("CLICK ADMIN");
  setScreen("admin");
}}
/>
    );
  }

  if (screen === "players") {
    function goBack() {
  setScreen("room");
  setRoom(null);
}
return (
      <Players
  room={room}
  name={name}
  setName={setName}
  players={players}
  addPlayer={addPlayer}
  startGame={startGame}
  goBack={goBack}
  isHost={hostId === userId}
/>
    );

    
  }

if (screen === "admin") {
  return (
    <Admin
  truths={truths}
  dares={dares}
  penalties={penalties}
  addTruth={addTruth}
  addDare={addDare}
  addPenalty={addPenalty}
  deleteTruth={deleteTruth}
  deleteDare={deleteDare}
  deletePenalty={deletePenalty}
  goBack={() => setScreen("room")}
/>
  );
}

  if (screen === "game") {
    return (
      <Game
  currentPlayer={currentPlayer}
  card={card}
  penalty={penalty}
  drawCard={drawCard}
  refuse={refuse}
  nextTurn={nextTurn}
  isMyTurn={isMyTurn}
  setCard={setCard}
  setPenalty={setPenalty}
  setScreen={setScreen}
  leaveRoom={leaveRoom}
/>
    );
  }

  return null;
}

export default App;