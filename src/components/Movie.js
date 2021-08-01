import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "./List";
import "../sass/Movie.css";
import NextPreviousPage from "./NextPreviousPage";
import useRetrieveLikedMangas from "../hooks/useRetrieveLikedMangas";
import useRetrieveLikedAnimes from "../hooks/useRetrieveLikedAnimes";

export default function Movie() {
  const [movieList, setMovieList] = useState();
  const [page, setPage] = useState(1);
  const retrievedLikedMangas = useRetrieveLikedMangas();
  const retrievedLikedAnimes = useRetrieveLikedAnimes();

  useEffect(() => {
    const search = async (page) => {
      try {
        let seasonalResponse = await axios.get(
          `https://api.jikan.moe/v3/top/anime/${page}/movie`
        );
        setMovieList(seasonalResponse.data.top);
        return movieList;
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    search(page);
  }, [page, movieList]);

  return (
    <div className="movie-global-container">
      <div className="movie-container">
        <NextPreviousPage page={page} setPage={setPage} />
      </div>
      <List
        data={movieList}
        retrievedLikedMangas={retrievedLikedMangas}
        retrievedLikedAnimes={retrievedLikedAnimes}
        movie={true}
        category={"anime"}
      />
    </div>
  );
}
