type Player = {
  id: string;
  name: string;
};

type Props = {
  room: string | null;
  players: Player[];
  addPlayer: () => void;
  startGame: () => void;
};

function Players({
  room,
  players,
  addPlayer,
  startGame,
}: Props) {
  return (
    <div className="app">
      <h1>Гравці</h1>

      {room && <p>Кімната: {room}</p>}

      <button onClick={addPlayer}>
  Приєднатися
</button>

      <button onClick={addPlayer}>
        Додати
      </button>

      <div style={{ marginTop: 20 }}>
        {players.map((player) => (
          <p key={player.id}>
            👤 {player.name}
          </p>
        ))}
      </div>

      <button
        style={{ marginTop: 20 }}
        onClick={startGame}
      >
        Почати гру
      </button>
    </div>
  );
}

export default Players;