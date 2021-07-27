import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export default function useRetrieveLikedMangas() {
  const { currentUser } = useAuthentication();
  const [retrievedLikedMangas, setretrievedLikedMangas] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const retrieveLikedMangaList = async (id) => {
        await firestore
          .collection(Collections.likedMangas)
          .doc(id)
          .collection(Collections.manga)
          .get()
          .then((querySnapshot) => {
            const newMangaList = [];
            querySnapshot.forEach((doc) => {
              newMangaList.push(doc.data().title);
            });
            setretrievedLikedMangas(newMangaList);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };

      retrieveLikedMangaList(currentUser.uid);
    }
  }, []);
  return retrievedLikedMangas;
}
