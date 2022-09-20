import { useState, useEffect, SetStateAction } from "react";
import { ItemList } from "./ItemList";
import axios, { AxiosResponse } from "axios";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { NextPreviousPage } from "./NextPreviousPage";
import { TopMangaAnime } from "./TopMangaAnime";
import "../sass/MainSearch.css";
import { useRetrieveLikedMangas } from "../hooks/useRetrieveLikedMangas";
import { useRetrieveLikedAnimes } from "../hooks/useRetrieveLikedAnimes";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
	button: {
		marginLeft: 10,
	},
}));
export interface Name {
	name: string;
}
export interface Genre {
	name: string;
}
export interface SearchedData {
	genres: Array<Genre>;
	authors: Array<Name>;
	rank: number;
	images: { jpg: any };
	mal_id: string;
	title: string;
	image_url: string;
	score: number;
	volumes: number;
	chapters: number;
	episodes: number;
	synopsis: string;
}

export const MainSearch = () => {
	const CATEGORY_LIST = ["manga", "anime"];
	const [category, setCategory] = useState(CATEGORY_LIST[0]);
	const [inputValue, setInputValue] = useState("");
	const classes = useStyles();
	const [searchData, setSearchData] = useState<SearchedData[]>([]);
	const [page, setPage] = useState(1);
	const [firstTime, setFirstTime] = useState(true);
	const retrievedLikedMangas = useRetrieveLikedMangas();
	const retrievedLikedAnimes = useRetrieveLikedAnimes();

	const searchItem = async (
		category: string,
		keyword: string | number
		// page: number
	) => {
		try {
			let response: AxiosResponse<{
				data: SetStateAction<SearchedData[]>;
				results: SearchedData[];
			}> = await axios.get(
				// `https://api.jikan.moe/v3/search/${category}?q=${keyword}&page=${page}`
				// `https://api.jikan.moe/v3/search/${category}?q=${keyword}`
				`https://api.jikan.moe/v4/${category}?q=${keyword}`
			);
			// console.log("data : ", response.data);
			// setSearchData(response.data.results);
			setSearchData(response.data.data);
			return searchData;
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (firstTime) {
			setFirstTime(false);
			return;
		}
		// searchItem(category, inputValue, page);
		searchItem(category, inputValue);
	}, [category]);

	const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
		setInputValue(e.target.value);
	};
	return (
		<div className="mainsearch-container">
			<div className="search-bar">
				<form className="form">
					<input
						className="search-input"
						type="text"
						onChange={handleChange}
						placeholder="search 3 letters at least.."
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								// searchItem(category, inputValue, page);
								searchItem(category, inputValue);
							}
						}}
					/>

					<FormControl className="form-control-search">
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
							Choose Anime or Manga{" "}
						</FormHelperText>
					</FormControl>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							// searchItem(category, inputValue, page);
							searchItem(category, inputValue);
						}}
						className={classes.button}
					>
						<FontAwesomeIcon icon={faSearch} />
						Search
					</Button>
				</form>
			</div>

			<ItemList
				searchData={searchData}
				category={category}
				retrievedLikedMangas={retrievedLikedMangas}
				retrievedLikedAnimes={retrievedLikedAnimes}
			/>
			{/* {searchData.length > 1 && (
				<NextPreviousPage page={page} setPage={setPage} />
			)} */}
			<TopMangaAnime />
		</div>
	);
};
