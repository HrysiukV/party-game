type Player = {
  id: string;
  name: string;
};

type Props = {
  room: string | null;
  name: string;
  setName: (value: string) => void;
  players: Player[];
  addPlayer: () => void;
  startGame: () => void;
};

function Players({
  room,
  name,
  setName,
  players,
  addPlayer,
  startGame,
}: Props) {
  return (
    <div className="app">
      <h1>Гравці</h1>

      {room && <p>Кімната: {room}</p>}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ім'я"
      />

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