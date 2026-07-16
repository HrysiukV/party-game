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
  drawCard: () => void;
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
}: Props) {
  const [showCard, setShowCard] = useState(false);

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
    fontSize: 24,
    marginTop: 14,
    marginBottom: 6,
    fontWeight: 700,
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
    fontWeight: 600,
    marginBottom: 18,
  }}
>
  <span style={{ fontSize: 26 }}>
    {current?.avatar ?? "😎"}
  </span>

  <span>{currentPlayer}</span>
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

      {!card && !penalty && (
        <button
          onClick={drawCard}
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