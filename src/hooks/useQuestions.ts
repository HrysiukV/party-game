import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../services/firebase";
import type { Question } from "../types/Question";

export function useQuestions(mode: string) {
  const [truths, setTruths] = useState<Question[]>([]);
  const [dares, setDares] = useState<Question[]>([]);
  const [penalties, setPenalties] = useState<Question[]>([]);

  useEffect(() => {

    const unsubTruths = onSnapshot(
      query(
        collection(db, "truths"),
        where("mode", "==", mode)
      ),
      (snapshot) => {
        setTruths(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            mode: doc.data().mode || "",
          }))
        );
      }
    );


    const unsubDares = onSnapshot(
      query(
        collection(db, "dares"),
        where("mode", "==", mode)
      ),
      (snapshot) => {
        setDares(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            mode: doc.data().mode || "",
          }))
        );
      }
    );


    const unsubPenalties = onSnapshot(
      query(
        collection(db, "penalties"),
        where("mode", "==", mode)
      ),
      (snapshot) => {
        setPenalties(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text || "",
            mode: doc.data().mode || "",
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