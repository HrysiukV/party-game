import RoomBadge from "../components/RoomBadge";
import PlayersBadge from "../components/PlayersBadge";

type Player = {
  id: string;
  name: string;
  avatar?: string;
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
  hostId: string | null;
  mode: string;
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
   hostId,
}: Props) {
  return (
    <div className="app">
     
      <RoomBadge room={room} />
      <PlayersBadge count={players.length} />

      <h1>👥 Гравці</h1>

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
    maxWidth: 430,
    marginTop: 25,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  }}
>
  {players.map((player) => (
  <div
    key={player.id}
    className="player-card"
  >
    <div className="player-avatar">
    {player.avatar ?? "😎"}
    </div>

    <div className="player-info">
      <span className="player-name">
        {player.name}
      </span>

      <span className="player-status">
        🟢 Онлайн
      </span>
    </div>

    {player.id === hostId && (
      <span
        className="host-icon"
        title="Хост"
      >
        👑
      </span>
    )}
  </div>
))}
</div>

      {isHost ? (
        <button
  disabled={players.length < 2}
  style={{
    marginTop: 25,
  }}
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