import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { List } from "./List";
import "../sass/Seasonal.css";
import Years from "./Years.json";

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

export interface ItemStorage {
	title: string;
	image_url: string;
	rank: number;
	score: number;
	url: string;
	mal_id: number;
}

export const Seasonal = () => {
	const [seasonalList, setSeasonalList] = useState<ItemStorage[]>([]);
	const SEASON_LIST = ["fall", "summer", "winter", "spring"];
	const [inputYear, setInputYear] = useState(2021);
	const [inputSeason, setInputSeason] = useState(SEASON_LIST[0]);
	const classes = useStyles();

	useEffect(() => {
		const search = async (year: number, season: string) => {
			try {
				let seasonalResponse: AxiosResponse<{ anime: ItemStorage[] }> =
					await axios.get(`https://api.jikan.moe/v3/season/${year}/${season}`);
				let newSeasonalList: ItemStorage[] = seasonalResponse.data.anime;
				setSeasonalList(newSeasonalList);
				return newSeasonalList;
			} catch (e) {
				console.log("Error getting document:", e);
			}
		};
		search(inputYear, inputSeason);
	}, [inputYear, inputSeason]);

	return (
		<div>
			<div className="seasonal-container">
				<FormControl className={classes.formControl}>
					<Select
						value={inputSeason}
						onChange={(e) => {
							if (typeof e.target.value === "string")
								setInputSeason(e.target.value);
						}}
						className={classes.selectEmpty}
						inputProps={{
							classes: {
								icon: classes.icon,
							},
						}}
					>
						<MenuItem value={"summer"}>Summer</MenuItem>
						<MenuItem value={"fall"}>Fall</MenuItem>
						<MenuItem value={"winter"}>Winter</MenuItem>
						<MenuItem value={"spring"}>Spring</MenuItem>
					</Select>
					<FormHelperText className={classes.selectEmpty}>
						Choose the season
					</FormHelperText>
				</FormControl>
				<form className={classes.formControl} noValidate autoComplete="off">
					<Select
						value={inputYear}
						onChange={(e) => {
							if (typeof e.target.value === "number")
								setInputYear(e.target.value);
						}}
						className={classes.selectEmpty}
						inputProps={{
							classes: {
								icon: classes.icon,
							},
						}}
					>
						{Years.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</Select>
					<FormHelperText className={classes.selectEmpty}>
						Choose the year
					</FormHelperText>
				</form>
			</div>

			<List
				data={seasonalList}
				type={""}
				retrievedLikedAnimes={[]}
				retrievedLikedMangas={[]}
			/>
		</div>
	);
};
