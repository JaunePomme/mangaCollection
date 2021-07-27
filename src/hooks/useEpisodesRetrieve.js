import { useEffect } from "react";
import { firestore } from "../firebase";

export default function useEpisodesRetrieve(
  title,
  idLookedFor,
  setInputEpisode,
  firstCollection,
  secondCollection
) {
  useEffect(() => {
    const episodesRetrieve = (
      title,
      idLookedFor,
      setInputEpisode,
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
            setInputEpisode(doc.data().episode);
          } else {
            console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    episodesRetrieve(
      title,
      idLookedFor,
      setInputEpisode,
      firstCollection,
      secondCollection
    );
  }, [title, idLookedFor, setInputEpisode, firstCollection, secondCollection]);
}
