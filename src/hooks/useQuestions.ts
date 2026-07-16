import { useEffect, useState } from "react";
import type { GameMode } from "../types/GameMode";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";
import type { Question } from "../types/Question";

export function useQuestions(mode: GameMode) {
  const [truths, setTruths] = useState<Question[]>([]);
  const [dares, setDares] = useState<Question[]>([]);
  const [penalties, setPenalties] = useState<Question[]>([]);

  useEffect(() => {

    const unsubTruths = onSnapshot(
      query(
        collection(db, "truths"),
        where("modes", "array-contains", mode)
      ),
      (snapshot) => {
        setTruths(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
           modes: doc.data().modes || [],
          }))
        );
      }
    );


    const unsubDares = onSnapshot(
      query(
        collection(db, "dares"),
         where("modes", "array-contains", mode)
      ),
      (snapshot) => {
        setDares(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            modes: doc.data().modes || [],
          }))
        );
      }
    );


    const unsubPenalties = onSnapshot(
      query(
        collection(db, "penalties"),
         where("modes", "array-contains", mode)
      ),
      (snapshot) => {
        setPenalties(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            modes: doc.data().modes || [],
          }))
        );
      }
    );


    return () => {
      unsubTruths();
      unsubDares();
      unsubPenalties();
    };

  }, [mode]);


  return {
    truths,
    dares,
    penalties,
  };
}