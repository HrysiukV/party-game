import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";
import type { GameMode } from "../types/GameMode";

export async function addTruth(
  text: string,
  modes: GameMode[]
) {
  await addDoc(collection(db, "truths"), {
    text,
    modes,
  });
}

export async function addDare(
  text: string,
  modes: GameMode[]
) {
  await addDoc(collection(db, "dares"), {
    text,
    modes,
  });
}

export async function addPenalty(
  text: string,
  modes: GameMode[]
) {
  await addDoc(collection(db, "penalties"), {
    text,
    modes,
  });
}

export async function deleteTruth(id: string) {
  await deleteDoc(doc(db, "truths", id));
}

export async function deleteDare(id: string) {
  await deleteDoc(doc(db, "dares", id));
}

export async function deletePenalty(id: string) {
  await deleteDoc(doc(db, "penalties", id));
}

export async function updateTruth(
  id: string,
  text: string,
  modes: GameMode[]
) {
  await updateDoc(doc(db, "truths", id), {
    text,
    modes,
  });
}

export async function updateDare(
  id: string,
  text: string,
  modes: GameMode[]
) {
  await updateDoc(doc(db, "dares", id), {
    text,
    modes,
  });
}

export async function updatePenalty(
  id: string,
  text: string,
  modes: GameMode[]
) {
  await updateDoc(doc(db, "penalties", id), {
    text,
    modes,
  });
}