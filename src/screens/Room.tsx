type Props = {
  roomInput: string;
  setRoomInput: (value: string) => void;
  createRoom: () => void;
  joinRoom: () => void;
  showJoin: boolean;
  setShowJoin: (value: boolean) => void;
};

export default function Room({
  roomInput,
  setRoomInput,
  createRoom,
  joinRoom,
  showJoin,
  setShowJoin,
}: Props) {
  return (
    <div className="app">
      <h1>🏠 AFTER</h1>

      <p>Створіть або приєднайтесь до кімнати</p>

      <button onClick={createRoom}>
        Створити кімнату
      </button>

      {!showJoin ? (
        <button onClick={() => setShowJoin(true)}>
          Приєднатися
        </button>
      ) : (
        <>
          <input
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            placeholder="Введіть код кімнати"
          />

          <button onClick={joinRoom}>
            Увійти
          </button>
        </>
      )}
    </div>
  );
}