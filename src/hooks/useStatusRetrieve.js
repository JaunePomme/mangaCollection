import { useEffect } from "react";
import { firestore } from "../firebase";

export default function useStatusRetrieve(
  title,
  idLookedFor,
  setInputStatus,
  firstCollection,
  secondCollection
) {
  useEffect(() => {
    const statusRetrieve = (
      title,
      idLookedFor,
      setInputStatus,
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
            setInputStatus(doc.data().status);
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    statusRetrieve(
      title,
      idLookedFor,
      setInputStatus,
      firstCollection,
      secondCollection
    );
  }, [title, idLookedFor, setInputStatus, firstCollection, secondCollection]);
}
