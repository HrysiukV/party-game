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
  goBack: () => void;
};

function Players({
  room,
  name,
  setName,
  players,
  addPlayer,
  startGame,
  goBack,
}: Props) {
  return (
    <div className="app">
      <h1>Гравці</h1>

      {room && <p>Кімната: {room}</p>}
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Введіть ім'я"
/>
      <button onClick={addPlayer}>
  Приєднатися
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
     
      <button
  onClick={goBack}
  style={{ marginTop: 20, background: "#2a2a3a" }}
>
  ⬅ Назад
</button>
    </div>
    
  );
  
}

export default Players;