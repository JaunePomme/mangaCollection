import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import "./MainContent.css";

export default function MainContent() {
  const [upcomingList, setUpcomingList] = useState("");
  const [topAnimeList, setTopAnimeList] = useState();
  const [topMangaList, setTopMangaList] = useState();

  useEffect(() => {
    const search = async () => {
      try {
        let response = await axios.get(
          `https://api.jikan.moe/v3/search/anime?status=upcoming&limit=50`
        );

        setUpcomingList(response.data.results);

        return upcomingList;
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    search();
  }, []);

  return (
    <div>
      <List data={upcomingList} />
    </div>
  );
}
