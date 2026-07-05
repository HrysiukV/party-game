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

  updateTruth: (id: string, text: string) => void;
updateDare: (id: string, text: string) => void;
updatePenalty: (id: string, text: string) => void;

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
  updateTruth,
  updateDare,
  updatePenalty,
}: Props) {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"truth" | "dare" | "penalty">("truth");

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function renderItem(
  item: Item,
  onDelete: (id: string) => void,
  onUpdate: (id: string, text: string) => void
) {
  const isEditing = editId === item.id;
console.log("truths:", truths);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        padding: 10,
        border: "1px solid #333",
        borderRadius: 10,
      }}
    >
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ width: "100%" }}
          />
        ) : (
          <span style={{ wordBreak: "break-word" }}>
            {item.text}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 6, marginLeft: 10 }}>
        {isEditing ? (
          <>
            <button
              onClick={() => {
                if (!editText.trim()) return;

                onUpdate(item.id, editText.trim());

                setEditId(null);
                setEditText("");
              }}
            >
              💾
            </button>

            <button onClick={() => setEditId(null)}>
              ❌
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditId(item.id);
                setEditText(item.text);
              }}
            >
              ✏️
            </button>

            <button onClick={() => onDelete(item.id)}>
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}

  return (
    <div className="app">
      <h1>👑 Адмінка</h1>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value as "truth" | "dare" | "penalty")
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

          if (type === "truth") addTruth(text.trim());
          if (type === "dare") addDare(text.trim());
          if (type === "penalty") addPenalty(text.trim());

          setText("");
        }}
      >
        ➕ Додати
      </button>

      <hr />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍 Пошук..."
      />

      <p>
        🧠 {truths.length} | 🔥 {dares.length} | ⚠️ {penalties.length}
      </p>

      <hr />
<div>
  <h2>🧠 Правда</h2>

  {truths.map((item) =>
    renderItem(item, deleteTruth, updateTruth)
  )}

  <hr />

  <h2>🔥 Дія</h2>

  {dares.map((item) =>
    renderItem(item, deleteDare, updateDare)
  )}

  <hr />

  <h2>⚠️ Штраф</h2>

  {penalties.map((item) =>
    renderItem(item, deletePenalty, updatePenalty)
  )}
</div>

      <button onClick={goBack} style={{ marginTop: 20 }}>
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;