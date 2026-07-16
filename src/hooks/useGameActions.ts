import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Player } from "../types/Player";
import type { Question } from "../types/Question";

type Props = {
  room: string | null;
  players: Player[];
  currentPlayerId: string | null;
  truths: Question[];
  dares: Question[];
  penalties: Question[];
mode: string;
userId: string;

  setCard: React.Dispatch<
 React.SetStateAction<string | null>
>;

setPenalty: React.Dispatch<
 React.SetStateAction<string | null>
>;
};

export function useGameActions({
  room,
  players,
  currentPlayerId,
  truths,
  dares,
  penalties,
  mode,
}: Props) {


  async function startGame() {
    if (!room || players.length === 0) return;

    const random =
      players[Math.floor(Math.random() * players.length)];

    await updateDoc(doc(db, "rooms", room), {
      currentPlayerId: random.id,
      started: true,
    });
  }


  async function nextTurn() {
    if (!room || players.length === 0) return;

    const currentIndex = players.findIndex(
      (player) => player.id === currentPlayerId
    );

    const nextIndex =
      currentIndex === players.length - 1
        ? 0
        : currentIndex + 1;


    await updateDoc(doc(db, "rooms", room), {
      currentPlayerId: players[nextIndex].id,
      card: null,
      penalty: null,
    });
  }


 async function drawCard(
  selectedType?: "truth" | "dare"
) {
  if (!room) return;

  let type: "truth" | "dare" | "penalty";

  if (mode === "classic") {
    type =
      Math.random() < 0.5
        ? "truth"
        : "dare";
  }

  else if (mode === "choose") {
    if (!selectedType) return;
    type = selectedType;
  }

  else {
    const random = Math.random();

    if (random < 0.4)
      type = "truth";
    else if (random < 0.8)
      type = "dare";
    else
      type = "penalty";
  }

  const list =
    type === "truth"
      ? truths
      : type === "dare"
      ? dares
      : penalties;

  if (!list.length) return;

  const item =
    list[
      Math.floor(
        Math.random() * list.length
      )
    ];

  let text = "";

  if (type === "truth") {
    text = `🧠 ПРАВДА\n\n${item.text}`;
  }

  if (type === "dare") {
    text = `🔥 ДІЯ\n\n${item.text}`;
  }

  if (type === "penalty") {
    text = `⚠️ ШТРАФ\n\n${item.text}`;
  }

  await updateDoc(doc(db, "rooms", room), {
    card: type === "penalty" ? null : text,
    penalty: type === "penalty" ? text : null,
  });
}


  async function refuse() {
    if (!room) return;


    const penalty =
      penalties.length
        ? penalties[
            Math.floor(
              Math.random() * penalties.length
            )
          ].text
        : "Випий 1 ковток 🍺";


    await updateDoc(doc(db, "rooms", room), {
      penalty:
        "⚠️ ШТРАФ:\n\n" + penalty,
      card: null,
    });
  }


  async function leaveRoom() {
    if (!room) return;

    // поки залишаємо тут пустим,
    // бо removePlayer вже в service
  }


  return {
    startGame,
    nextTurn,
    drawCard,
    refuse,
    leaveRoom,
  };
}