import React from "react";
import { MemberReviewCard } from "./MemberReviewCard";
import { Review } from "./Reviews";

interface Props {
	reviewList: Review[];
	type: string;
}

export const MemberReviewList: React.FC<Props> = ({ reviewList, type }) => {
	return (
		<div className="reviewList">
			{reviewList &&
				reviewList.map((item) => (
					<MemberReviewCard key={item.entry.mal_id} review={item} type={type} />
				))}
		</div>
	);
};
