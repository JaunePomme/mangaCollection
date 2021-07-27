import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export default function useRetrieveLikedAnimes() {
  const { currentUser } = useAuthentication();
  const [retrievedLikedAnimes, setretrievedLikedAnimes] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const retrieveLikedAnimeList = async (id) => {
        await firestore
          .collection(Collections.likedAnimes)
          .doc(id)
          .collection(Collections.anime)
          .get()
          .then((querySnapshot) => {
            const newAnimeList = [];
            querySnapshot.forEach((doc) => {
              newAnimeList.push(doc.data().title);
            });
            setretrievedLikedAnimes(newAnimeList);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };
      retrieveLikedAnimeList(currentUser.uid);
    }
  }, []);
  return retrievedLikedAnimes;
}
