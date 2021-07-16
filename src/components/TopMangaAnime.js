import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import List from "./List";
import "../sass/TopMangaAnime.css";

export default function TopMangaAnime() {
  const [topMangaList, settopMangaList] = useState([]);
  const [topAnimeList, settopAnimeList] = useState([]);
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
        settopMangaList(newMangaList);
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
        settopAnimeList(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <div>
      <p className="anime-label-top">Top 20 Animes:</p>
      <List data={topAnimeList} type={"anime"} />

      <p className="manga-label-top">Top 20 Mangas:</p>
      <List data={topMangaList} type={"manga"} />
    </div>
  );
}
