import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { MangaLikedList } from "./MangaLikedList";
import { AnimeLikedList } from "./AnimeLikedList";
import { Sorting } from "./Sorting";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../sass/LikedList.css";
import { Collections } from "./FirestoreConstant.json";
import { Genre, Name } from "./MainSearch";

interface Props {
	idLookedFor: string;
}

export interface LikedDataStorage {
	images: { jpg: { image_url: string } };
	title: string;
	mal_id: number;
	image_url: string;
	score: number;
	episodes?: number;
	chapters?: number;
	volumes?: number;
	synopsis?: string;
	desc?: string;
	members?: number;
	rank?: number;
	popularity?: number;
	authors?: Array<Name>;
	title_japanese?: string;
	background?: string;
	genres?: Array<Genre>;
}

interface MangaState {
	checkedA: boolean;
	checkedB: boolean;
}

export const LikedList: React.FC<Props> = ({ idLookedFor }) => {
	const [likedMangasData, setLikedMangasData] = useState<LikedDataStorage[]>(
		[]
	);
	const [likedAnimesData, setLikedAnimesData] = useState<LikedDataStorage[]>(
		[]
	);
	const [state, setState] = useState<MangaState>({
		checkedA: true,
		checkedB: true,
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const a = event.target as HTMLInputElement;
		setState({ ...state, [event.target.name]: a.checked });
	};

	useEffect(() => {
		const animesRetrieve = () => {
			firestore
				.collection(Collections.likedAnimes)
				.doc(idLookedFor)
				.collection(Collections.anime)
				.get()
				.then((querySnapshot) => {
					const newAnimeList: LikedDataStorage[] = [];
					querySnapshot.forEach((doc) =>
						newAnimeList.push(doc.data() as LikedDataStorage)
					);

					setLikedAnimesData(newAnimeList);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				});
		};

		const mangasRetrieve = () => {
			firestore
				.collection(Collections.likedMangas)
				.doc(idLookedFor)
				.collection(Collections.manga)
				.get()
				.then((querySnapshot) => {
					const newMangaList: LikedDataStorage[] = [];
					querySnapshot.forEach((doc) => {
						newMangaList.push(doc.data() as LikedDataStorage);
					});
					setLikedMangasData(newMangaList);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				});
		};

		mangasRetrieve();
		animesRetrieve();
	}, [idLookedFor]);

	return (
		<div>
			<div className="likedlist-btn">
				<Sorting
					idLookedFor={idLookedFor}
					setLikedMangasData={setLikedMangasData}
					setLikedAnimesData={setLikedAnimesData}
				/>

				<FormGroup row>
					<FormControlLabel
						control={
							<Switch
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
							/>
						}
						label="Anime"
						classes={{ label: "anime-toggle" }}
					/>
					<FormControlLabel
						control={
							<Switch
								checked={state.checkedB}
								onChange={handleChange}
								name="checkedB"
								color="primary"
							/>
						}
						label="Manga"
						classes={{ label: "manga-toggle" }}
					/>
				</FormGroup>
			</div>
			<p className="anime-label">Animes:</p>
			{state.checkedA ? (
				<AnimeLikedList likedData={likedAnimesData} idLookedFor={idLookedFor} />
			) : (
				""
			)}

			<p className="manga-label">Mangas:</p>
			{state.checkedB ? (
				<MangaLikedList likedData={likedMangasData} idLookedFor={idLookedFor} />
			) : (
				""
			)}
		</div>
	);
};
