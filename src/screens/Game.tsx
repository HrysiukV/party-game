type Screen = "room" | "players" | "game";

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
};

function Game({
  currentPlayer,
  card,
  penalty,
  drawCard,
  refuse,
  nextTurn,
  setCard,
  setPenalty,
  setScreen,
}: Props) {
  return (
    <div className="app">
      <h1>🎮 Хід: {currentPlayer}</h1>

      {/* Кнопка витягнути карту */}
      {!card && !penalty && (
        <button onClick={drawCard}>
          Витягнути карту 🎲
        </button>
      )}

      {/* КАРТА */}
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

      {/* ШТРАФ */}
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

      {/* Наступний хід */}
      {!card && !penalty && (
        <button onClick={nextTurn}>
          Наступний гравець ➜
        </button>
      )}

      {/* Вихід */}
      <button onClick={() => setScreen("room")}>
        Вийти
      </button>
    </div>
  );
}

export default Game;