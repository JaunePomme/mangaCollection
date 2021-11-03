import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { MemberReviewList } from "./MemberReviewList";

export interface Review {
	reviewer: {
		image_url: string;
		username: string;
		url: string;
		scores: {
			animations: number;
			character: number;
			enjoyment: number;
			overall: number;
			story: number;
		};
	};
	content: string;
	helpful_count: number;
	date: Date;
	mal_id: number;
}
interface LocationState {
	type: string;
	id: number;
}

export const Reviews = () => {
	const [reviewList, setReviewList] = useState<Review[]>([]);
	let location = useLocation<LocationState>();
	const { type, id } = location.state;

	useEffect(() => {
		const search = async (type: string, id: number) => {
			try {
				let response: AxiosResponse<{ reviews: Review[] }> = await axios.get(
					`https://api.jikan.moe/v3/${type}/${id}/reviews`
				);
				setReviewList(response.data.reviews);
				return reviewList;
			} catch (error) {
				console.log("Error getting document:", error);
			}
		};
		search(type, id);
	}, [id, type, reviewList]);

	return <MemberReviewList reviewList={reviewList} />;
};
