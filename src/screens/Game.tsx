import { useEffect, useState } from "react";

type Screen = "room" | "players" | "game" | "admin";

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
  setScreen,
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

  return (
    <div className="app">
      <h1>🎮 Хід: {currentPlayer}</h1>

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
          onClick={nextTurn}
          disabled={!isMyTurn}
        >
          Наступний гравець ➜
        </button>
      )}

      <button
        style={{
          marginTop: 10,
        }}
        onClick={() => setScreen("room")}
      >
        Вийти
      </button>
    </div>
  );
}

export default Game;