import RoomBadge from "../components/RoomBadge";

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
  isHost: boolean;
};

function Players({
  room,
  name,
  setName,
  players,
  addPlayer,
  startGame,
  goBack,
  isHost,
}: Props) {
  return (
    <div className="app">
     
      <RoomBadge room={room} />

      <h1>👥 Гравці</h1>

      {room && (
        <p>
          Код кімнати: <b>{room}</b>
        </p>
      )}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введіть ім'я"
      />

      <button onClick={addPlayer}>
        Приєднатися
      </button>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {players.map((player) => (
          <div
            key={player.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 14,
              background: "#1c1c26",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />

            <span style={{ flex: 1 }}>
              {player.name}
            </span>
          </div>
        ))}
      </div>

      {isHost ? (
        <button
          style={{ marginTop: 25 }}
          onClick={startGame}
        >
          🎮 Почати гру
        </button>
      ) : (
        <p
          style={{
            marginTop: 25,
            color: "#a1a1aa",
          }}
        >
          ⏳ Очікуємо, поки хост почне гру...
        </p>
      )}

      <button
        onClick={goBack}
        style={{
          marginTop: 20,
          background: "#2a2a3a",
        }}
      >
        ⬅ Назад
      </button>
    </div>
  );
}

export default Players;