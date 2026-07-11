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
          margin: "25px 0",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {gameModes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => setSelectedMode(mode.id)}
            style={{
              cursor: "pointer",
              padding: "16px",
              borderRadius: 18,
              border:
                selectedMode === mode.id
                  ? "2px solid #7c3aed"
                  : "1px solid rgba(255,255,255,.08)",
              background:
                selectedMode === mode.id
                  ? "rgba(124,58,237,.18)"
                  : "rgba(255,255,255,.05)",
              transition: ".2s",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              {mode.emoji} {mode.title}
            </div>

            <div
              style={{
                marginTop: 5,
                opacity: 0.7,
                fontSize: 14,
              }}
            >
              {mode.description}
            </div>
          </div>
        ))}
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
            marginTop: 30,
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