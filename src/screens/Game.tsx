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
  return (
    <div className="app">
      <h1>🎮 Хід: {currentPlayer}</h1>
      {!isMyTurn && (
  <p style={{ color: "#999", marginBottom: 20 }}>
    ⏳ Зараз хід гравця <b>{currentPlayer}</b>
  </p>
)}

      {/* Кнопка витягнути карту */}
      {!card && !penalty && (
        <button
  onClick={drawCard}
  disabled={!isMyTurn}
>
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
  disabled={!isMyTurn}
  onClick={() => {
    setPenalty(null);
    nextTurn();
  }}
>
              Виконано ✅
            </button>

           <button
  onClick={refuse}
  disabled={!isMyTurn}
>
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

      {/* Наступний хід */}
      {!card && !penalty && (
        <button
  onClick={nextTurn}
  disabled={!isMyTurn}
>
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