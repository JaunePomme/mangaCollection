import React, { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";

export default function useRetrieveLikedMangas() {
  const { currentUser } = useAuthentication();
  const [retrievedLikedMangas, setretrievedLikedMangas] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const retrieveLikedMangaList = async (id) => {
        await firestore
          .collection("likedMangas")
          .doc(id)
          .collection("manga")
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
