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
                padding: "12px 16px",
                borderRadius: 14,

                border: active
                  ? "2px solid #7c3aed"
                  : "1px solid rgba(255,255,255,.08)",

                background: active
                  ? "rgba(124,58,237,.18)"
                  : "rgba(255,255,255,.05)",

                transition: "all .2s ease",

                transform: active
                  ? "scale(1.02)"
                  : "scale(1)",

                boxShadow: active
                  ? "0 0 18px rgba(124,58,237,.28)"
                  : "none",

                minHeight: 66,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    width: 28,
                    textAlign: "center",
                  }}
                >
                  {mode.emoji}
                </span>

                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {mode.title}
                </span>
              </div>

              <div
                style={{
                  marginTop: 4,
                  marginLeft: 38,
                  opacity: 0.65,
                  fontSize: 12,
                  lineHeight: 1.3,
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