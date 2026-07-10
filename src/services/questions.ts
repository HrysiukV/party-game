import {
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

export async function addTruth(text: string) {
  await addDoc(collection(db, "truths"), {
    text,
  });
}

export async function addDare(text: string) {
  await addDoc(collection(db, "dares"), {
    text,
  });
}

export async function addPenalty(text: string) {
  await addDoc(collection(db, "penalties"), {
    text,
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