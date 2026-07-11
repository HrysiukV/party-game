import type { RoomMode } from "../types/Room";

export const gameModes: {
  id: RoomMode;
  emoji: string;
  title: string;
  description: string;
}[] = [
  {
    id: "classic",
    emoji: "🎲",
    title: "Класика",
    description: "Правда або дія",
  },
  {
    id: "choose",
    emoji: "🤔",
    title: "Вибір",
    description: "Обирай завдання",
  },
  {
    id: "party",
    emoji: "🔥",
    title: "Party",
    description: "Для компанії",
  },
];