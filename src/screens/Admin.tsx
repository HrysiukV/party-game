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

  deleteTruth: (id: string) => void;
  deleteDare: (id: string) => void;
  deletePenalty: (id: string) => void;

  goBack: () => void;
};

function Admin({
  truths,
  dares,
  penalties,
  addTruth,
  addDare,
  addPenalty,
  deleteTruth,
  deleteDare,
  deletePenalty,
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
  <div
    key={item.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    }}
  >
    <span>{item.text}</span>

    <button
      onClick={() => deleteTruth(item.id)}
    >
      🗑
    </button>
  </div>
))}

<hr />

<h2>🔥 Дія</h2>

{dares.map((item) => (
  <div
    key={item.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    }}
  >
    <span>{item.text}</span>

    <button
      onClick={() => deleteDare(item.id)}
    >
      🗑
    </button>
  </div>
))}

<hr />

<h2>⚠️ Штраф</h2>

{penalties.map((item) => (
  <div
    key={item.id}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    }}
  >
    <span>{item.text}</span>

    <button
      onClick={() => deletePenalty(item.id)}
    >
      🗑
    </button>
  </div>
))}


      <button onClick={goBack}>
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;