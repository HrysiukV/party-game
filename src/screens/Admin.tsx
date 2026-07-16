import { useState } from "react";
import type { RoomMode } from "../types/Room";
import type { GameMode } from "../types/GameMode";
import type { Question } from "../types/Question";

type Props = {
  truths: Question[];
  dares: Question[];
  penalties: Question[];

  addTruth: (
    text: string,
    modes: GameMode[]
  ) => Promise<void>;

  addDare: (
    text: string,
    modes: GameMode[]
  ) => Promise<void>;

  addPenalty: (
    text: string,
    modes: GameMode[]
  ) => Promise<void>;

  deleteTruth: (id: string) => Promise<void>;
  deleteDare: (id: string) => Promise<void>;
  deletePenalty: (id: string) => Promise<void>;

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
  const [selectedModes, setSelectedModes] = useState<RoomMode[]>([
  "classic",
]);

  function renderItem(
  item: Question,
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
  style={{
    width: "100%",
    padding: "14px",
    fontSize: 17,
    borderRadius: 12,
    marginBottom: 12,
  }}
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

<h3>Режими</h3>

<div
  style={{
    display: "grid",
    gap: 12,
    marginBottom: 20,
  }}
>
  {[
    {
      id: "classic",
      emoji: "🎲",
      title: "Classic",
      description: "Звичайна гра",
    },
    {
      id: "choose",
      emoji: "👉",
      title: "Choose",
      description: "Обери гравця",
    },
    {
      id: "party",
      emoji: "🥳",
      title: "Party",
      description: "Для великої компанії",
    },
  ].map((m) => {
    const active = selectedModes.includes(
      m.id as RoomMode
    );

    return (
      <div
        key={m.id}
        onClick={() => {
          if (active) {
            setSelectedModes(
              selectedModes.filter(
                (x) => x !== m.id
              )
            );
          } else {
            setSelectedModes([
              ...selectedModes,
              m.id as RoomMode,
            ]);
          }
        }}
        style={{
          cursor: "pointer",
          padding: 16,
          borderRadius: 18,
          border: active
            ? "2px solid #7c3aed"
            : "1px solid rgba(255,255,255,.08)",
          background: active
            ? "rgba(124,58,237,.18)"
            : "rgba(255,255,255,.05)",
          transition: ".2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {m.emoji} {m.title}
            </div>

            <div
              style={{
                marginTop: 4,
                opacity: 0.7,
                fontSize: 14,
              }}
            >
              {m.description}
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
            }}
          >
            {active ? "✅" : "⬜"}
          </div>
        </div>
      </div>
    );
  })}
</div>

      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        placeholder="Нове завдання..."
      />

      <button
  onClick={async () => {
    if (!text.trim()) return;

if (!selectedModes.length) {
  alert("Оберіть хоча б один режим");
  return;
}

if (type === "truth") {
  await addTruth(text.trim(), selectedModes);
}

if (type === "dare") {
  await addDare(text.trim(), selectedModes);
}

if (type === "penalty") {
  await addPenalty(text.trim(), selectedModes);
}

setText("");
  }}
>
  ➕ Додати
</button>

      <div style={{ height: 20 }} />

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
    gap: 8,
    marginTop: 12,
    marginBottom: 20,
    flexWrap: "wrap",
  }}
>
  <button
    onClick={() => setView("truth")}
   style={{
  minWidth: 95,
  height: 42,
  padding: "0 12px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 10,
  background: view === "truth" ? "#7c3aed" : "#333",
  color: "white",
  border: "none",
  cursor: "pointer",
}}
  >
    🧠 Правда
  </button>

  <button
    onClick={() => setView("dare")}
   style={{
  minWidth: 95,
  height: 42,
  padding: "0 12px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 10,
  background: view === "dare" ? "#7c3aed" : "#333",
  color: "white",
  border: "none",
  cursor: "pointer",
}}
  >
    🔥 Дія
  </button>

  <button
    onClick={() => setView("penalty")}
    style={{
  minWidth: 95,
  height: 42,
  padding: "0 12px",
  fontSize: 13,
  fontWeight: 600,
  borderRadius: 10,
  background: view === "penalty" ? "#7c3aed" : "#333",
  color: "white",
  border: "none",
  cursor: "pointer",
}}
  >
    ⚠️ Штраф
  </button>
</div>
      <div style={{ height: 20 }} />

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