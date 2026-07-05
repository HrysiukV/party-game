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
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"truth" | "dare" | "penalty">("truth");

  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function renderItem(
    item: Item,
    onDelete: (id: string) => void,
    onSave: (text: string) => void
  ) {
    const isEditing = editId === item.id;

    return (
      <div
        key={item.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
          padding: 6,
          border: "1px solid #333",
          borderRadius: 8,
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
            <span>{item.text}</span>
          )}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  if (!editText.trim()) return;

                  onDelete(item.id);
                  onSave(editText.trim());

                  setEditId(null);
                  setEditText("");
                }}
              >
                💾
              </button>

              <button
                onClick={() => {
                  setEditId(null);
                  setEditText("");
                }}
              >
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

      <h2>🧠 Правда</h2>
      {truths
        .filter((i) =>
          i.text.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deleteTruth, addTruth)
        )}

      <hr />

      <h2>🔥 Дія</h2>
      {dares
        .filter((i) =>
          i.text.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deleteDare, addDare)
        )}

      <hr />

      <h2>⚠️ Штраф</h2>
      {penalties
        .filter((i) =>
          i.text.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deletePenalty, addPenalty)
        )}

      <button onClick={goBack} style={{ marginTop: 20 }}>
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;