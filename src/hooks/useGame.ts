import { doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Question } from "../types/Question";
import type { Player } from "../types/Player";

type Props = {
  room: string | null;

  players: Player[];

  currentPlayerId: string | null;

  truths: Question[];
  dares: Question[];
  penalties: Question[];

  mode: string;
};


export function useGame({
  room,
  players,
  currentPlayerId,
  truths,
  dares,
  penalties,
  mode,
}: Props) {


  async function drawCard() {
    if (!room) return;


    let type: "truth" | "dare" | "penalty";


    if (mode === "classic") {
      type =
        Math.random() < 0.5
          ? "truth"
          : "dare";
    }


    else if (mode === "choose") {
      // поки залишаємо як classic
      // пізніше додамо вибір
      type =
        Math.random() < 0.5
          ? "truth"
          : "dare";
    }


    else {
      const random =
        Math.random();

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
      text =
        `🧠 ПРАВДА\n\n${item.text}`;
    }


    if (type === "dare") {
      text =
        `🔥 ДІЯ\n\n${item.text}`;
    }


    if (type === "penalty") {
      text =
        `⚠️ ШТРАФ\n\n${item.text}`;
    }


    await updateDoc(
      doc(db, "rooms", room),
      {
        card:
          type === "penalty"
            ? null
            : text,

        penalty:
          type === "penalty"
            ? text
            : null,
      }
    );
  }



  async function nextTurn() {
    if (!room || !players.length)
      return;


    const index =
      players.findIndex(
        p => p.id === currentPlayerId
      );


    const next =
      index === players.length - 1
        ? 0
        : index + 1;


    await updateDoc(
      doc(db, "rooms", room),
      {
        currentPlayerId:
          players[next].id,

        card: null,
        penalty: null,
      }
    );
  }



  async function refuse() {
    if (!room)
      return;


    const penalty =
      penalties.length
        ? penalties[
            Math.floor(
              Math.random()
              *
              penalties.length
            )
          ].text
        : "Випий 1 ковток 🍺";


    await updateDoc(
      doc(db, "rooms", room),
      {
        penalty:
          "⚠️ ШТРАФ:\n\n"
          +
          penalty,

        card:null,
      }
    );
  }


  return {
    drawCard,
    nextTurn,
    refuse,
  };
}