import { useState } from "react";
import "./App.css";
import Admin from "./screens/Admin.tsx";
import Room from "./screens/Room";
import Players from "./screens/Players";
import Game from "./screens/Game";
import { useRoom } from "./hooks/useRoom";
import { useQuestions } from "./hooks/useQuestions";
import { useGame } from "./hooks/useGame";
import { useRoomListener } from "./hooks/useRoomListener";

import {
  createRoom as createRoomService,
  getRoom,
  addPlayer as addPlayerService,
  removePlayer,
} from "./services/room";

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
  updateDoc,
} from "firebase/firestore";

import { db } from "./services/firebase";

const tg = (window as any).Telegram?.WebApp;

const userId =
  tg?.initDataUnsafe?.user?.id?.toString() ??
  localStorage.getItem("userId") ??
  (() => {
    const id = crypto.randomUUID();
    localStorage.setItem("userId", id);
    return id;
  })();

const isAdmin = userId === "846617693";

function App() {
  // UI
 const [screen, setScreen] = useState<  "room" | "players" | "game" | "admin">("room");
 // ROOM
  const {
  room,
  setRoom,
  roomInput,
  setRoomInput,
  mode,
  setMode,

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
} = useRoom();

const {
  truths,
  dares,
  penalties
} = useQuestions(mode);

const {
  drawCard,
  nextTurn,
  refuse,
} = useGame({
  room,
  players,
  currentPlayerId,
  truths,
  dares,
  penalties,
  mode,
});

const [showJoin, setShowJoin] = useState(false);

const [selectedMode, setSelectedMode] =
  useState("classic");

const [name, setName] = useState("");

const currentPlayer =
  players.find(
    (player) => player.id === currentPlayerId
  )?.name ?? null;

  const isMyTurn = currentPlayerId === userId;

  useRoomListener({
  room,

  setPlayers,
  setCurrentPlayerId,
  setCard,
  setPenalty,
  setHostId,
  setMode,

  setScreen,

  userId,
});

  // CREATE ROOM
async function createRoom() {
  const code = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  await createRoomService(
    code,
    userId,
    selectedMode
  );

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

  const roomSnap = await getRoom(code);

  if (!roomSnap.exists()) {
    alert("Кімната не знайдена");
    return;
  }
  
 setRoom(code);
setName("");
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

  await addPlayerService(
    room,
    userId,
    name.trim()
);
}

async function leaveRoom() {
  if (!room) return;

  await removePlayer(
    room,
    userId
  );

  setRoom(null);
  setRoomInput(""); // очищає код кімнати
  setName(""); // очищає нік

  setPlayers([]);
  setCurrentPlayerId(null);
  setCard(null);
  setPenalty(null);

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
  selectedMode={selectedMode}
  setSelectedMode={setSelectedMode}
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
  hostId={hostId}
  mode={mode}
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
  mode={mode}
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
  room={room}
 playersCount={players.length}
 mode={mode}
/>
    );
  }

  return null;
}

export default App;