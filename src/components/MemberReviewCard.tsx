import React, { SetStateAction, useEffect, useState } from "react";
import { Review } from "./Reviews";
import "../sass/MemberReviewCard.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { SearchedData } from "./MainSearch";
interface Props {
	review: Review;
	type: string;
}

export const MemberReviewCard: React.FC<Props> = ({ review, type }) => {
	const {
		entry: { images, title, url, mal_id },
		votes,
	} = review;
	const [searchData, setSearchData] = useState<SearchedData[]>([]);
	const urlString = "/manga-profile/" + title + "/" + mal_id;
	const searchItem = async (type: string, mal_id: number) => {
		try {
			let response: AxiosResponse<{
				data: SetStateAction<SearchedData[]>;
				results: SearchedData[];
			}> = await axios.get(`https://api.jikan.moe/v4/${type}/${mal_id}`);
			setSearchData(response.data.data);
			return searchData;
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		searchItem(type, mal_id);
	}, []);
	return (
		<div className="reviewList-container">
			<img src={images.jpg.image_url} alt={title} style={{ maxHeight: 500 }} />
			<Link
				style={{ textDecoration: "none" }}
				to={{
					pathname: urlString,
					state: {
						data: searchData,
						type: type,
						id: mal_id,
					},
				}}
			>
				<Button
					variant="contained"
					color="secondary"
					// className={classes.button}
				>
					See More here
				</Button>
			</Link>
			<ul>
				<li style={{ fontSize: "30px", listStyle: "none" }}>{title}</li>
				<li style={{ fontSize: "20px" }}>ID on myAnimList: {mal_id}</li>
				<li style={{ fontSize: "20px", color: "blanchedalmond" }}>
					URL:
					<a href={url} target="_blank" rel="noopener noreferrer">
						{url}
					</a>
				</li>
				<li style={{ fontSize: "20px" }}>Votes: {votes}</li>
			</ul>
		</div>
	);
};
