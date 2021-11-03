import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { List } from "./List";
import "../sass/TopMangaAnime.css";
import { Collections, OrderBy, Limits } from "./FirestoreConstant.json";
import { ItemStorage } from "./Seasonal";

export const TopMangaAnime = () => {
	const [topMangaList, settopMangaList] = useState<ItemStorage[]>([]);
	const [topAnimeList, settopAnimeList] = useState<ItemStorage[]>([]);
	useEffect(() => {
		firestore
			.collection(Collections.topManga)
			.orderBy(OrderBy.rank)
			.limit(Limits.default)
			.get()
			.then((querySnapshot) => {
				const newMangaList: ItemStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as ItemStorage);
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
				const newAnimeList: ItemStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as ItemStorage);
				});
				settopAnimeList(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	}, []);

	return (
		<div>
			<p className="anime-label-top">Top 20 Animes from MyAnimList:</p>
			<List data={topAnimeList} type={"anime"} />

			<p className="manga-label-top">Top 20 Mangas from MyAnimList:</p>
			<List data={topMangaList} type={"manga"} />
		</div>
	);
};
