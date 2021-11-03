import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { List } from "./List";
import "../sass/Genre.css";
import MangaGenre from "./MangaGenre.json";
import AnimeGenre from "./AnimeGenre.json";

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {
		marginLeft: 10,
		color: "#fafafa",
		"&:before": {
			borderColor: "#fafafa",
		},
		"&:after": {
			borderColor: "#fafafa",
		},
	},
	icon: {
		fill: "#fafafa",
	},
}));

interface GenreStorage {
	value: number;
	label: string;
}

export const Genre = () => {
	const classes = useStyles();
	const [mangaListGenre, setMangaListGenre] = useState<GenreStorage[]>([]);
	const [animeListGenre, setAnimeListGenre] = useState<GenreStorage[]>([]);
	const CATEGORY_LIST = ["manga", "anime"];
	const [category, setCategory] = useState(CATEGORY_LIST[0]);
	const [genre, setGenre] = useState(1);
	const [dataList, setDataList] = useState([]);

	useEffect(() => {
		setMangaListGenre(MangaGenre);
		setAnimeListGenre(AnimeGenre);
	}, []);

	useEffect(() => {
		const search = async (category: string, genre: number) => {
			try {
				let response: AxiosResponse<{ results: [] }> = await axios.get(
					`https://api.jikan.moe/v3/search/${category}?genre=${genre}`
				);
				const newDataList = response.data.results;
				setDataList(newDataList);
				return newDataList;
			} catch (e) {
				console.log("Error getting document:", e);
			}
		};
		search(category, genre);
	}, [category, genre]);

	return (
		<div>
			<div className="genre-container">
				<FormControl className={classes.formControl}>
					<Select
						value={category}
						onChange={(e) => {
							if (typeof e.target.value === "string")
								setCategory(e.target.value);
						}}
						className={classes.selectEmpty}
						inputProps={{
							classes: {
								icon: classes.icon,
							},
						}}
					>
						<MenuItem value={"anime"}>Anime</MenuItem>
						<MenuItem value={"manga"}>Manga</MenuItem>
					</Select>
					<FormHelperText className={classes.selectEmpty}>
						Choose Anime or Manga
					</FormHelperText>
				</FormControl>
				{category === "manga" ? (
					<form className={classes.formControl} noValidate autoComplete="off">
						<Select
							value={genre}
							onChange={(e) => {
								if (typeof e.target.value === "number")
									setGenre(e.target.value);
							}}
							className={classes.selectEmpty}
							inputProps={{
								classes: {
									icon: classes.icon,
								},
							}}
						>
							{mangaListGenre.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
						<FormHelperText className={classes.selectEmpty}>
							Choose the genre
						</FormHelperText>
					</form>
				) : (
					<form noValidate autoComplete="off">
						<Select
							value={genre}
							onChange={(e) => {
								if (typeof e.target.value === "number")
									setGenre(e.target.value);
							}}
							className={classes.selectEmpty}
							inputProps={{
								classes: {
									icon: classes.icon,
								},
							}}
						>
							{animeListGenre.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
						<FormHelperText className={classes.selectEmpty}>
							Choose the genre
						</FormHelperText>
					</form>
				)}
			</div>
			<List data={dataList} />
		</div>
	);
};
