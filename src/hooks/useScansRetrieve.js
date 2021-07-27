import { useEffect } from "react";
import { firestore } from "../firebase";
export default function useScansRetrieve(
  title,
  idLookedFor,
  setInputChapter,
  firstCollection,
  secondCollection
) {
  useEffect(() => {
    const scansRetrieve = (
      title,
      idLookedFor,
      setInputChapter,
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
            setInputChapter(doc.data().chapter);
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    scansRetrieve(
      title,
      idLookedFor,
      setInputChapter,
      firstCollection,
      secondCollection
    );
  }, [title, idLookedFor, setInputChapter, firstCollection, secondCollection]);
}
