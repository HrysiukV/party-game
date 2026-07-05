import { useState } from "react";

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
  addTruth: (text: string) => void;
addDare: (text: string) => void;
addPenalty: (text: string) => void;
};

function Players({

  room,
  name,
  setName,
  players,
  addPlayer,
  startGame,
  goBack,
   addTruth,
  addDare,
  addPenalty,
}: Props) {
   const [adminText, setAdminText] = useState("");
  const [adminType, setAdminType] = useState<"truth" | "dare" | "penalty">("truth");
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
     
     <div style={{ marginTop: 30, padding: 10, border: "1px solid #333", borderRadius: 10 }}>
  <h3>🛠 Адмінка</h3>

  <select
  value={adminType}
  onChange={(e) =>
    setAdminType(e.target.value as "truth" | "dare" | "penalty")
  }
>
  <option value="truth">🧠 Truth</option>
  <option value="dare">🔥 Dare</option>
  <option value="penalty">⚠️ Penalty</option>
</select>


  <input
    value={adminText}
    onChange={(e) => setAdminText(e.target.value)}
    placeholder="Введи питання або дію"
  />

  <button
  onClick={() => {
    if (!adminText.trim()) return;

    if (adminType === "truth") {
      addTruth(adminText.trim());
    } else if (adminType === "dare") {
      addDare(adminText.trim());
    } else {
      addPenalty(adminText.trim());
    }

    setAdminText("");
  }}
>
  ➕ Додати
</button>
</div>
     
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
