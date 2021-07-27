import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import List from "./List";
import "../sass/TopMangaAnime.css";
import { Collections, OrderBy, Limits } from "./FirestoreConstant.json";

export default function TopMangaAnime() {
  const [topMangaList, settopMangaList] = useState([]);
  const [topAnimeList, settopAnimeList] = useState([]);
  useEffect(() => {
    firestore
      .collection(Collections.topManga)
      .orderBy(OrderBy.rank)
      .limit(Limits.default)
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
      .collection(Collections.topAnime)
      .orderBy(OrderBy.rank)
      .limit(Limits.default)
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
