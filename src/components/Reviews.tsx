import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { MemberReviewList } from "./MemberReviewList";

export interface Review {
	url: string;
	entry: any;
	votes: number;
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
				let response: AxiosResponse<{
					data: any;
				}> = await axios.get(
					`https://api.jikan.moe/v4/${type}/${id}/recommendations`
				);
				// const responseList = response.data.data.slice(0, 5);
				const responseList = response.data.data.slice(0, 2);
				setReviewList(responseList);
				return reviewList;
			} catch (error) {
				console.log("Error getting document:", error);
			}
		};
		search(type, id);
	}, []);

	return <MemberReviewList reviewList={reviewList} type={type} />;
};
