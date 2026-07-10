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
          justifyContent: "space-between",
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
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {item.text}
        </div>

        <button
          onClick={() => onDelete(item.id)}
        >
          🗑
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

      <p>
        🧠 {truths.length} |
        🔥 {dares.length} |
        ⚠️ {penalties.length}
      </p>

      <hr />

      <h2>🧠 Правда</h2>

      {truths
        .filter((item) =>
          item.text
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deleteTruth)
        )}

      <hr />

      <h2>🔥 Дія</h2>

      {dares
        .filter((item) =>
          item.text
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deleteDare)
        )}
              <hr />

      <h2>⚠️ Штраф</h2>

      {penalties
        .filter((item) =>
          item.text
            .toLowerCase()
            .includes(search.toLowerCase())
        )
        .map((item) =>
          renderItem(item, deletePenalty)
        )}

      <hr />

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