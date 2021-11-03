import React from "react";
import { MemberReviewCard } from "./MemberReviewCard";
import { Review } from "./Reviews";

interface Props {
	reviewList: Review[];
}

export const MemberReviewList: React.FC<Props> = ({ reviewList }) => {
	return (
		<div className="reviewList">
			{reviewList &&
				reviewList.map((item) => (
					<MemberReviewCard key={item.mal_id} review={item} />
				))}
		</div>
	);
};
