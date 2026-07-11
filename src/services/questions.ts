import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addTruth(
  text: string,
  mode: string
) {
  await addDoc(collection(db, "truths"), {
    text,
    mode,
  });
}

export async function addDare(
  text: string,
  mode: string
) {
  await addDoc(collection(db, "dares"), {
    text,
    mode,
  });
}

export async function addPenalty(
  text: string,
  mode: string
) {
  await addDoc(collection(db, "penalties"), {
    text,
    mode,
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

import { updateDoc } from "firebase/firestore";
export async function updateTruth(
  id: string,
  text: string,
  mode: string
) {
  await updateDoc(doc(db, "truths", id), {
    text,
    mode,
  });
}

export async function updateDare(
  id: string,
  text: string,
  mode: string
) {
  await updateDoc(doc(db, "dares", id), {
    text,
    mode,
  });
}

export async function updatePenalty(
  id: string,
  text: string,
  mode: string
) {
  await updateDoc(doc(db, "penalties", id), {
    text,
    mode,
  });
}