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

const [view, setView] = useState<
  "truth" | "dare" | "penalty"
>("truth");

  const [type, setType] = useState<
    "truth" | "dare" | "penalty"
  >("truth");

  function renderItem(
  item: Item,
  onDelete: (id: string) => void
) {
  return (
    <div
      key={item.id}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
        padding: 12,
        border: "1px solid #444",
        borderRadius: 10,
      }}
    >
      <div
        style={{
          flex: 1,
          color: "#fff",
          fontSize: 16,
          lineHeight: 1.4,
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
      >
        {item.text}
      </div>

      <button
        onClick={() => onDelete(item.id)}
        style={{
          width: 32,
          height: 32,
          minWidth: 32,
          flexShrink: 0,
          padding: 0,
          fontSize: 16,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </div>
  );
}

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
        <option value="truth">
          🧠 Правда
        </option>

        <option value="dare">
          🔥 Дія
        </option>

        <option value="penalty">
          ⚠️ Штраф
        </option>
      </select>

      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Нове завдання..."
      />

      <button
        onClick={() => {
          if (!text.trim()) return;

          if (type === "truth")
            addTruth(text.trim());

          if (type === "dare")
            addDare(text.trim());

          if (type === "penalty")
            addPenalty(text.trim());

          setText("");
        }}
      >
        ➕ Додати
      </button>

      <hr />

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="🔍 Пошук..."
      />

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => setView("truth")}
    style={{
  minWidth: 70,
  padding: "6px 10px",
  fontSize: 12,
  background: view === "truth" ? "#7c3aed" : "#333",
}}
  >
    🧠 Правда
  </button>

  <button
    onClick={() => setView("dare")}
   style={{
  minWidth: 70,
  padding: "6px 10px",
  fontSize: 12,
  background: view === "dare" ? "#7c3aed" : "#333",
}}
  >
    🔥 Дія
  </button>

  <button
    onClick={() => setView("penalty")}
    style={{
  minWidth: 70,
  padding: "6px 10px",
  fontSize: 12,
  background: view === "penalty" ? "#7c3aed" : "#333",
}}
  >
    ⚠️ Штраф
  </button>
</div>
      <hr />

      {view === "truth" &&
  truths
    .filter((item) =>
      item.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((item) =>
      renderItem(item, deleteTruth)
    )}

{view === "dare" &&
  dares
    .filter((item) =>
      item.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((item) =>
      renderItem(item, deleteDare)
    )}

{view === "penalty" &&
  penalties
    .filter((item) =>
      item.text
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((item) =>
      renderItem(item, deletePenalty)
    )}

      <button
        onClick={goBack}
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        ⬅ Назад
      </button>
    </div>
  );
}

export default Admin;