import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../services/firebase";
import type { Question } from "../types/Question";

export function useQuestions() {
  const [truths, setTruths] = useState<Question[]>([]);
  const [dares, setDares] = useState<Question[]>([]);
  const [penalties, setPenalties] = useState<Question[]>([]);

  useEffect(() => {
    const unsubTruths = onSnapshot(collection(db, "truths"), (snapshot) => {
      setTruths(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text || "",
        }))
      );
    });

    const unsubDares = onSnapshot(collection(db, "dares"), (snapshot) => {
      setDares(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text || "",
        }))
      );
    });

    const unsubPenalties = onSnapshot(collection(db, "penalties"), (snapshot) => {
      setPenalties(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text || "",
        }))
      );
    });

    return () => {
      unsubTruths();
      unsubDares();
      unsubPenalties();
    };
  }, []);

  return {
    truths,
    dares,
    penalties,
  };
}