import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import List from "./List";
import "../sass/TopMangaAnime.css";

export default function TopMangaAnime() {
  const [likedMangasData, setLikedMangasData] = useState([]);
  const [likedAnimesData, setLikedAnimesData] = useState([]);
  useEffect(() => {
    firestore
      .collection("topManga")
      .orderBy("rank")
      .limit(20)
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
    firestore
      .collection("topAnime")
      .orderBy("rank")
      .limit(20)
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
  }, []);

  return (
    <div>
      <p className="anime-label-top">Top 20 Animes:</p>
      <List data={likedAnimesData} />

      <p className="manga-label-top">Top 20 Mangas:</p>
      <List data={likedMangasData} />
    </div>
  );
}
