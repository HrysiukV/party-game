import { useState } from "react";

type Props = {
  addTruth: (text: string) => void;
  addDare: (text: string) => void;
  addPenalty: (text: string) => void;
  goBack: () => void;
};

function Admin({
  addTruth,
  addDare,
  addPenalty,
  goBack,
}: Props) {
  const [text, setText] = useState("");
  const [type, setType] = useState<
    "truth" | "dare" | "penalty"
  >("truth");

  return (
    <div className="app">
      <h1>👑 Адмінка</h1>

      <select
        value={type}
        onChange={(e) =>
          setType(
            e.target.value as
              | "truth"
              | "dare"
              | "penalty"
          )
        }
      >
        <option value="truth">🧠 Правда</option>
        <option value="dare">🔥 Дія</option>
        <option value="penalty">⚠️ Штраф</option>
      </select>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введіть текст..."
      />

      <button
        onClick={() => {
          if (!text.trim()) return;

          if (type === "truth") {
            addTruth(text.trim());
          } else if (type === "dare") {
            addDare(text.trim());
          } else {
            addPenalty(text.trim());
          }

          setText("");
        }}
      >
        ➕ Додати
      </button>

      <button onClick={goBack}>
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;