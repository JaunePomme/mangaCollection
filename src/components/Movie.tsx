import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { List } from "./List";
import "../sass/Movie.css";
import { NextPreviousPage } from "./NextPreviousPage";
import { useRetrieveLikedMangas } from "../hooks/useRetrieveLikedMangas";
import { useRetrieveLikedAnimes } from "../hooks/useRetrieveLikedAnimes";
import { ItemStorage } from "./Seasonal";

export const Movie = () => {
	const [movieList, setMovieList] = useState<ItemStorage[]>([]);
	const [page, setPage] = useState(1);
	const retrievedLikedMangas = useRetrieveLikedMangas();
	const retrievedLikedAnimes = useRetrieveLikedAnimes();

	useEffect(() => {
		const search = async (page: number) => {
			try {
				let movieResponse: AxiosResponse<{ top: ItemStorage[] }> =
					await axios.get(`https://api.jikan.moe/v3/top/anime/${page}/movie`);
				const newMovieList: ItemStorage[] = movieResponse.data.top;
				setMovieList(newMovieList);
				return newMovieList;
			} catch (e) {
				console.log("Error getting document:", e);
			}
		};
		search(page);
	}, [page]);

	return (
		<div className="movie-global-container">
			<div className="movie-container">
				<NextPreviousPage page={page} setPage={setPage} />
			</div>
			<List
				data={movieList}
				retrievedLikedMangas={retrievedLikedMangas}
				retrievedLikedAnimes={retrievedLikedAnimes}
				type={"anime"}
			/>
		</div>
	);
};
