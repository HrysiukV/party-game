import { useState } from "react";

type Item = {
  id: string;
  text: string;
};

type Props = {
  truths: Item[];
  dares: Item[];
  penalties: Item[];

  addTruth: (text: string) => void;
  addDare: (text: string) => void;
  addPenalty: (text: string) => void;

  goBack: () => void;
};

function Admin({
  truths,
  dares,
  penalties,
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
<hr />

<h2>🧠 Правда</h2>

{truths.map((item) => (
  <p key={item.id}>{item.text}</p>
))}

<hr />

<h2>🔥 Дія</h2>

{dares.map((item) => (
  <p key={item.id}>{item.text}</p>
))}

<hr />

<h2>⚠️ Штраф</h2>

{penalties.map((item) => (
  <p key={item.id}>{item.text}</p>
))}
      <button onClick={goBack}>
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;