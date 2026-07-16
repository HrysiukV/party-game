import { gameModes } from "../data/gameModes";
import type { RoomMode } from "../types/Room";

type Props = {
  roomInput: string;
  setRoomInput: (value: string) => void;

  createRoom: (mode: RoomMode) => void;
  joinRoom: () => void;

  showJoin: boolean;
  setShowJoin: (value: boolean) => void;

  isAdmin: boolean;
  openAdmin: () => void;

  selectedMode: RoomMode;
  setSelectedMode: (mode: RoomMode) => void;
};

function Room({
  roomInput,
  setRoomInput,
  createRoom,
  joinRoom,
  showJoin,
  setShowJoin,
  isAdmin,
  openAdmin,
  selectedMode,
  setSelectedMode,
}: Props) {
  return (
    <div className="app">
      <h1>🏠 AFTER</h1>

      <p>Створіть або приєднайтесь до кімнати</p>

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          margin: "18px 0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {gameModes.map((mode) => {
          const active = selectedMode === mode.id;

          return (
            <div
  key={mode.id}
  onClick={() => setSelectedMode(mode.id)}
  style={{
    cursor: "pointer",
    padding: "14px 18px",
    borderRadius: 16,
   border: active
  ? "2px solid #7c3aed"
  : "1px solid rgba(255,255,255,.08)",

background: active
  ? "rgba(124,58,237,.18)"
  : "rgba(255,255,255,.05)",
    transition: ".2s",
    minHeight: 72,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start", // <-- головне
  }}
>
  <div
    style={{
      width: "100%",
      fontWeight: 700,
      fontSize: 17,
      lineHeight: 1.2,
      textAlign: "left", // <-- головне
    }}
  >
    {mode.emoji} {mode.title}
  </div>

  <div
    style={{
      width: "100%",
      marginTop: 4,
      opacity: 0.7,
      fontSize: 13,
      lineHeight: 1.3,
      textAlign: "left", // <-- головне
    }}
  >
    {mode.description}
  </div>
</div>
          );
        })}
      </div>

      <button onClick={() => createRoom(selectedMode)}>
        ➕ Створити кімнату
      </button>

      {!showJoin ? (
        <button onClick={() => setShowJoin(true)}>
          🚪 Приєднатися
        </button>
      ) : (
        <>
          <input
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Введіть код кімнати"
          />

          <button onClick={joinRoom}>
            ✅ Увійти
          </button>
        </>
      )}

      {isAdmin && (
        <button
          onClick={openAdmin}
          style={{
            marginTop: 22,
            background: "#7c3aed",
          }}
        >
          👑 Адмінка
        </button>
      )}
    </div>
  );
}

export default Room;