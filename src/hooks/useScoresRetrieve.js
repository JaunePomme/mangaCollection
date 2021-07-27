import { useEffect } from "react";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export default function useScoresRetrieve(
  title,
  idLookedFor,
  setInputScoring,
  firstCollection,
  secondCollection
) {
  useEffect(() => {
    const scoresRetrieve = (
      title,
      idLookedFor,
      setInputScoring,
      firstCollection,
      secondCollection
    ) => {
      let docRef = firestore
        .collection(firstCollection)
        .doc(idLookedFor)
        .collection(secondCollection)
        .doc(title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputScoring(doc.data().personalScore);
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    scoresRetrieve(
      title,
      idLookedFor,
      setInputScoring,
      firstCollection,
      secondCollection
    );
  }, [title, idLookedFor, setInputScoring, firstCollection, secondCollection]);
}
