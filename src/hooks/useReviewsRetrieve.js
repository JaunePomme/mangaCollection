import { useEffect } from "react";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export default function useReviewsRetrieve(
  title,
  idLookedFor,
  setInputReview,
  firstCollection,
  secondCollection
) {
  useEffect(() => {
    const reviewsRetrieve = (
      title,
      idLookedFor,
      setInputReview,
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
            setInputReview(doc.data().review);
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    reviewsRetrieve(
      title,
      idLookedFor,
      setInputReview,
      firstCollection,
      secondCollection
    );
  }, [title, idLookedFor, setInputReview, firstCollection, secondCollection]);
}
