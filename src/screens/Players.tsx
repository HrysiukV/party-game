type Props = {
  room: string | null;
  name: string;
  setName: (value: string) => void;
  players: string[];
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
        placeholder="Ім'я гравця"
      />

      <button onClick={addPlayer}>
        Додати
      </button>

      <div>
        {players.map((player, index) => (
          <p key={index}>👤 {player}</p>
        ))}
      </div>

      <button onClick={startGame}>
        Почати гру
      </button>
    </div>
  );
}

export default Players;