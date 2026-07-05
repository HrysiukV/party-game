import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./screens/Admin.tsx";

import Room from "./screens/Room";
import Players from "./screens/Players";
import Game from "./screens/Game";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

import { db } from "./services/firebase";

const tg = (window as any).Telegram?.WebApp;

const userId =
  tg?.initDataUnsafe?.user?.id?.toString() ??
  crypto.randomUUID();

const isAdmin = userId === "846617693";

function App() {
  // UI
 const [screen, setScreen] = useState<
  "room" | "players" | "game" | "admin"
>("room");

  // ROOM
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");

  // PLAYER
 

  // GAME STATE (SYNC FIREBASE)
  type Player = {
  id: string;
  name: string;
};

const [players] = useState<Player[]>([]);
const [currentPlayerId] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [penalty, setPenalty] = useState<string | null>(null);
const [showJoin, setShowJoin] = useState(false);
const [name, setName] = useState("");


const [truths, setTruths] = useState<string[]>([]);
const [dares, setDares] = useState<string[]>([]);
const [penalties, setPenalties] = useState<string[]>([]);

const currentPlayer =
  players.find(
    (player) => player.id === currentPlayerId
  )?.name ?? null;

  const isMyTurn = currentPlayerId === userId;

  // REALTIME LISTENER
 useEffect(() => {
  const unsubTruths = onSnapshot(doc(db, "global", "truths"), (snap) => {
    const data = snap.data();
    setTruths(data?.items?.map((i: any) => i.text) || []);
  });

  const unsubDares = onSnapshot(doc(db, "global", "dares"), (snap) => {
    const data = snap.data();
    setDares(data?.items?.map((i: any) => i.text) || []);
  });

  const unsubPenalties = onSnapshot(doc(db, "global", "penalties"), (snap) => {
    const data = snap.data();
    setPenalties(data?.items?.map((i: any) => i.text) || []);
  });

  return () => {
    unsubTruths();
    unsubDares();
    unsubPenalties();
  };
}, []);

  // CREATE ROOM
  async function createRoom() {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    await setDoc(doc(db, "rooms", code), {
  hostId: userId,
  players: [],
  currentPlayerId: null,
  card: null,
  penalty: null,

  truths: [
    "Який твій найбільший секрет?",
    "Кому з компанії ти найбільше довіряєш?",
    "Твоя найбільша фейл-історія?"
  ],

  dares: [
    "Станцюй 10 секунд 💃",
    "Заспівай приспів пісні 🎤",
    "Зроби смішне селфі 🤳"
  ],
  penalties: [
  "Випий 1 ковток 🍺",
  "Випий 2 ковтки 🍻",
  "Пропусти хід ⛔"
],

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

    setRoom(code);
    setScreen("players");
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

  // START GAME
  async function startGame() {
  if (!room || players.length === 0) return;

  const random =
    players[Math.floor(Math.random() * players.length)];

  await updateDoc(doc(db, "rooms", room), {
    currentPlayerId: random.id,
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

const list =
  type === "truth" ? truths : dares;
if (!list.length) return;
const randomText =
  list[Math.floor(Math.random() * list.length)];

const text =
  type === "truth"
    ? `🧠 ПРАВДА\n\n${randomText}`
    : `🔥 ДІЯ\n\n${randomText}`;
 
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
    ? penalties[Math.floor(Math.random() * penalties.length)]
    : "Випий 1 ковток 🍺";

  await updateDoc(doc(db, "rooms", room), {
    penalty: "⚠️ ШТРАФ:\n\n" + random,
    card: null,
  });
}

async function addTruth(text: string) {
  const ref = doc(db, "global", "truths");

  await updateDoc(ref, {
    items: arrayUnion({
      id: crypto.randomUUID(),
      text,
    }),
  });
}

async function addDare(text: string) {
  const ref = doc(db, "global", "dares");

  const snap = await getDoc(ref);
const data = snap.exists() ? snap.data() : null;

  await updateDoc(ref, {
    items: [
      ...(data?.items || []),
      { id: crypto.randomUUID(), text }
    ]
  });
}
async function addPenalty(text: string) {
  const ref = doc(db, "global", "penalties");

  const snap = await getDoc(ref);
const data = snap.exists() ? snap.data() : null;

  await updateDoc(ref, {
    items: [
      ...(data?.items || []),
      { id: crypto.randomUUID(), text }
    ]
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
openAdmin={() => setScreen("admin")}
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
  addTruth={addTruth}
  addDare={addDare}
  addPenalty={addPenalty}
  isAdmin={isAdmin}
/>
    );

    
  }
  
if (screen === "admin") {
  return (
    <Admin
      addTruth={addTruth}
      addDare={addDare}
      addPenalty={addPenalty}
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
/>
    );
  }

  return null;
}

export default App;