import { useEffect, useState } from "react";
import RoomBadge from "../components/RoomBadge";
import PlayersBadge from "../components/PlayersBadge";

type Screen = "room" | "players" | "game" | "admin";

type Player = {
  id: string;
  name: string;
  avatar?: string;
};

type Props = {
  currentPlayer: string | null;
  card: string | null;
  penalty: string | null;
  drawCard: (type?: "truth" | "dare") => void;
  refuse: () => void;
  nextTurn: () => void;
  setCard: React.Dispatch<React.SetStateAction<string | null>>;
  setPenalty: React.Dispatch<React.SetStateAction<string | null>>;
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
  isMyTurn: boolean;
  leaveRoom: () => void;
  room: string | null;
  playersCount: number;
players: Player[];
mode: string;

};

function Game({
  currentPlayer,
  card,
  penalty,
  drawCard,
  refuse,
  nextTurn,
  isMyTurn,
  setCard,
  setPenalty,
  leaveRoom,
 room,
playersCount,
players,
mode,
}: Props) {
  const [showCard, setShowCard] = useState(false);
const [chooseType, setChooseType] = useState<
  "truth" | "dare" | null
>(null);

  useEffect(() => {
    if (card || penalty) {
      setShowCard(false);

      const timer = setTimeout(() => {
        setShowCard(true);
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [card, penalty]);

  const current = players.find(
  (p) => p.name === currentPlayer
);

  return (
  <div className="app">
  <div className="top-bar">
    <RoomBadge room={room} />
    <PlayersBadge count={playersCount} />

    <button
      className="top-badge exit-button"
      onClick={leaveRoom}
    >
      🚪
    </button>
  </div>

   <h2
  style={{
    fontSize: 30,
    marginTop: 14,
    marginBottom: 8,
    fontWeight: 700,

    color: "#ffffff",

    textShadow:
      "0 0 8px rgba(168,85,247,.8), 0 0 20px rgba(124,58,237,.5)",
      letterSpacing: 1,
  }}
>
  🎮 Хід
</h2>

<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 18,

    color: "#f5f3ff",
    textShadow:
      "0 0 6px rgba(168,85,247,.7), 0 0 14px rgba(124,58,237,.4)",
  }}
>
  <span style={{ fontSize: 26 }}>
    {current?.avatar ?? "😎"}
  </span>

  <span>{current?.name ?? "..."}</span>
</div>

      {!isMyTurn && (
        <p
          style={{
            color: "#999",
            marginBottom: 20,
          }}
        >
          ⏳ Зараз хід гравця <b>{currentPlayer}</b>
        </p>
      )}

      {!card && !penalty && mode === "choose" && !chooseType && (
  <div
  style={{
    width: "100%",
    maxWidth: 420,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
    marginTop: 10,
  }}
>
    <div
      onClick={() => {
        if (!isMyTurn) return;
        setChooseType("truth");
        drawCard("truth");
      }}
      style={{
  cursor: isMyTurn ? "pointer" : "default",
  padding: "16px 12px",
  borderRadius: 18,
  background: "rgba(124,58,237,.18)",
  border: "2px solid #7c3aed",
  textAlign: "center",
  opacity: isMyTurn ? 1 : 0.5,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minHeight: 170,
}}
    >
      <div style={{ fontSize: 34 }}>🧠</div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        Правда
      </div>

      <div
        style={{
          opacity: 0.7,
marginTop: 4,
fontSize: 13,
        }}
      >
        Відповісти чесно
      </div>
    </div>

    <div
      onClick={() => {
        if (!isMyTurn) return;
        setChooseType("dare");
        drawCard("dare");
      }}
      style={{
        cursor: isMyTurn ? "pointer" : "default",
        padding: 18,
        borderRadius: 18,
        background: "rgba(124,58,237,.18)",
        border: "2px solid #7c3aed",
        textAlign: "center",
        opacity: isMyTurn ? 1 : .5,
      }}
    >
      <div style={{ fontSize: 34 }}>🔥</div>

      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginTop: 8,
        }}
      >
        Дія
      </div>

      <div
        style={{
          opacity: 0.7,
marginTop: 4,
fontSize: 13,
        }}
      >
        Виконати завдання
      </div>
    </div>
  </div>
)}

{!card && !penalty && mode !== "choose" && (
  <button
    onClick={() => drawCard()}
    disabled={!isMyTurn}
  >
    Витягнути карту 🎲
  </button>
)}

      {card && (
        <div
          className={`card ${
            showCard ? "card-show" : "card-hide"
          }`}
        >
          <h2
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {card}
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button
              disabled={!isMyTurn}
              onClick={() => {
                setPenalty(null);
                setChooseType(null);
                nextTurn();
              }}
            >
              Виконано ✅
            </button>

            <button
              disabled={!isMyTurn}
              onClick={refuse}
            >
              Відмовляюсь ❌
            </button>
          </div>
        </div>
      )}

      {penalty && (
        <div
          className={`card ${
            showCard ? "card-show" : "card-hide"
          }`}
        >
          <h2
            style={{
              whiteSpace: "pre-line",
            }}
          >
            {penalty}
          </h2>

          <button
            style={{ marginTop: 20 }}
            disabled={!isMyTurn}
            onClick={() => {
              setCard(null);
              setChooseType(null);
              nextTurn();
            }}
          >
            Ок, далі ➜
          </button>
        </div>
      )}

      {!card && !penalty && (
  <button
    className="next-button"
    onClick={nextTurn}
    disabled={!isMyTurn}
  >
    Наступний гравець ➜
  </button>
)}
    </div>
  );
}

export default Game;