import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import MangaLikedList from "./MangaLikedList";
import AnimeLikedList from "./AnimeLikedList";
import Sorting from "./Sorting";
export default function LikedList({ idLookedFor }) {
  const [likedMangasData, setLikedMangasData] = useState([]);
  const [likedAnimesData, setLikedAnimesData] = useState([]);

  useEffect(() => {
    const handleAnimesRetrieve = () => {
      firestore
        .collection("likedAnimes")
        .doc(idLookedFor)
        .collection("anime")
        .get()
        .then((querySnapshot) => {
          const newAnimeList = [];
          querySnapshot.forEach((doc) => {
            newAnimeList.push(doc.data());
          });
          setLikedAnimesData(newAnimeList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    const handleMangasRetrieve = () => {
      firestore
        .collection("likedMangas")
        .doc(idLookedFor)
        .collection("manga")
        .get()
        .then((querySnapshot) => {
          const newMangaList = [];
          querySnapshot.forEach((doc) => {
            newMangaList.push(doc.data());
          });
          setLikedMangasData(newMangaList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    handleMangasRetrieve();
    handleAnimesRetrieve();
  }, [idLookedFor]);

  return (
    <div>
      <Sorting
        likedMangasData={likedMangasData}
        likedAnimesData={likedAnimesData}
        setLikedMangasData={setLikedMangasData}
        setLikedAnimesData={setLikedAnimesData}
      />
      List of Liked Animes:
      <AnimeLikedList likedData={likedAnimesData} idLookedFor={idLookedFor} />
      <div className="item-grid">
        List of Liked Mangas:
        <MangaLikedList likedData={likedMangasData} idLookedFor={idLookedFor} />
      </div>
    </div>
  );
}
