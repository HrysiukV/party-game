import { useState } from "react";
import "./App.css";

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
  // 🎮 навігація екранів
  const [screen, setScreen] = useState("room");

  // 🏠 кімната
  const [room, setRoom] = useState<string | null>(null);
  const [roomInput, setRoomInput] = useState("");

  // 👥 гравці
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");

  // 🎲 гра
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [penalty, setPenalty] = useState<string | null>(null);

  // 🏠 кімната
  function createRoom() {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setRoom(code);
    setScreen("players");
  }

  function joinRoom() {
    if (roomInput.trim() === "") return;
    setRoom(roomInput.toUpperCase());
    setScreen("players");
  }

  // 👥 гравці
  function addPlayer() {
    if (name.trim() === "") return;
    setPlayers([...players, name]);
    setName("");
  }

  // 🎮 старт гри
  function startGame() {
    const random =
      players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(random);
    setScreen("game");
    setCard(null);
    setPenalty(null);
  }

  // 🎲 наступний хід
  function nextTurn() {
    const random =
      players[Math.floor(Math.random() * players.length)];
    setCurrentPlayer(random);
    setCard(null);
    setPenalty(null);
  }

  // 🃏 карта
  function drawCard() {
    const type = Math.random() < 0.5 ? "truth" : "dare";

    if (type === "truth") {
      const random =
        truths[Math.floor(Math.random() * truths.length)];
      setCard(`🧠 ПРАВДА\n\n${random}`);
    } else {
      const random =
        dares[Math.floor(Math.random() * dares.length)];
      setCard(`🔥 ДІЯ\n\n${random}`);
    }
  }

  // ❌ відмова
  function refuse() {
    const random =
      penalties[Math.floor(Math.random() * penalties.length)];

    setPenalty("⚠️ ШТРАФ:\n\n" + random);
    setCard(null);
  }

  // 🏠 КІМНАТА
  if (screen === "room") {
    return (
      <div className="app">
        <h1>🏠 AFTER</h1>
        <p>Створіть або приєднайтесь до кімнати</p>

        <button onClick={createRoom}>
          Створити кімнату
        </button>

        <input
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder="Код кімнати"
        />

        <button onClick={joinRoom}>
          Приєднатись
        </button>
      </div>
    );
  }

  // 👥 ГРАВЦІ
  if (screen === "players") {
    return (
      <div className="app">
        <h1>Гравці</h1>

        {room && <p>Кімната: {room}</p>}

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ім'я гравця"
        />

        <button onClick={addPlayer}>
          Додати
        </button>

        <div>
          {players.map((p, i) => (
            <p key={i}>👤 {p}</p>
          ))}
        </div>

        <button onClick={startGame}>
          Почати гру
        </button>
      </div>
    );
  }

  // 🎮 ГРА
  if (screen === "game") {
    return (
      <div className="app">
        <h1>🎮 Хід: {currentPlayer}</h1>

        {!card && !penalty && (
          <button onClick={drawCard}>
            Витягнути карту 🎲
          </button>
        )}

        {card && (
          <div className="card">
            <h2 style={{ whiteSpace: "pre-line" }}>
              {card}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
  <button
    onClick={() => {
      setCard(null);
      nextTurn();
    }}
  >
    Виконано ✅
  </button>

  <button onClick={refuse}>
    Відмовляюсь ❌
  </button>
</div>
          </div>
        )}

        {penalty && (
          <div className="card">
            <h2 style={{ whiteSpace: "pre-line" }}>
              {penalty}
            </h2>

            <button
              onClick={() => {
                setPenalty(null);
                nextTurn();
              }}
            >
              Ок, далі ➜
            </button>
          </div>
        )}

        {!card && !penalty && (
          <button onClick={nextTurn}>
            Наступний гравець ➜
          </button>
        )}

        <button onClick={() => setScreen("room")}>
          Вийти
        </button>
      </div>
    );
  }

  return null;
}

export default App;