import { useEffect, useState } from "react";
import "./App.css";

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

const truths = [
  "Який твій найбільший секрет?",
  "Кому з компанії ти найбільше довіряєш?",
  "Твоя найбільша фейл-історія?",
];

const dares = [
  "Станцюй 10 секунд 💃",
  "Заспівай приспів пісні 🎤",
  "Зроби смішне селфі 🤳",
];

const penalties = [
  "Випий 1 ковток 🍺",
  "Випий 2 ковтки 🍻",
  "Пропусти хід ⛔",
  "Зроби смішне селфі 🤳",
  "Виконай танець 10 секунд 💃",
];

function App() {
  // UI
  const [screen, setScreen] = useState<"room" | "players" | "game">("room");

  // ROOM
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");

  // PLAYER
  const [name, setName] = useState("");

  // GAME STATE (SYNC FIREBASE)
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [penalty, setPenalty] = useState<string | null>(null);
const [showJoin, setShowJoin] = useState(false);
  // REALTIME LISTENER
  useEffect(() => {
    if (!room) return;

    const roomRef = doc(db, "rooms", room);

    const unsub = onSnapshot(roomRef, (snap) => {
      const data = snap.data();
      if (!data) return;

      setPlayers(data.players || []);
      setCurrentPlayer(data.currentPlayer || null);
      setCard(data.card || null);
      setPenalty(data.penalty || null);
    });

    return () => unsub();
  }, [room]);

  // CREATE ROOM
  async function createRoom() {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();

    await setDoc(doc(db, "rooms", code), {
      players: [],
      currentPlayer: null,
      card: null,
      penalty: null,
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

    await updateDoc(doc(db, "rooms", room), {
      players: arrayUnion(name),
    });

    setName("");
  }

  // START GAME
  async function startGame() {
    if (!room || players.length === 0) return;

    const random = players[Math.floor(Math.random() * players.length)];

    await updateDoc(doc(db, "rooms", room), {
      currentPlayer: random,
    });

    setScreen("game");
  }

  // NEXT TURN
  async function nextTurn() {
    if (!room || players.length === 0) return;

    const random = players[Math.floor(Math.random() * players.length)];

    await updateDoc(doc(db, "rooms", room), {
      currentPlayer: random,
      card: null,
      penalty: null,
    });
  }

  // DRAW CARD
  async function drawCard() {
    if (!room) return;

    const type = Math.random() < 0.5 ? "truth" : "dare";

    const text =
      type === "truth"
        ? `🧠 ПРАВДА\n\n${truths[Math.floor(Math.random() * truths.length)]}`
        : `🔥 ДІЯ\n\n${dares[Math.floor(Math.random() * dares.length)]}`;

    await updateDoc(doc(db, "rooms", room), {
      card: text,
      penalty: null,
    });
  }

  // REFUSE
  async function refuse() {
    if (!room) return;

    const random =
      penalties[Math.floor(Math.random() * penalties.length)];

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
/>
    );
  }

  if (screen === "players") {
    return (
      <Players
        room={room}
        name={name}
        setName={setName}
        players={players}
        addPlayer={addPlayer}
        startGame={startGame}
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
        setCard={setCard}
        setPenalty={setPenalty}
        setScreen={setScreen}
      />
    );
  }

  return null;
}

export default App;