import React from "react";
import { Review } from "./Reviews";
import "../sass/MemberReviewCard.css";
interface Props {
	review: Review;
}

export const MemberReviewCard: React.FC<Props> = ({ review }) => {
	return (
		<div className="reviewList-container">
			<img
				src={review.reviewer.image_url}
				alt={review.reviewer.username}
				style={{ maxHeight: 500 }}
			/>
			<ul>
				<li>{review.content}</li>
				<li>Helpful counter: {review.helpful_count}</li>
				<li>Date: {review.date}</li>
				<li>Animations: {review.reviewer.scores.animations}</li>
				<li>Character: {review.reviewer.scores.character}</li>
				<li>Enjoyment: {review.reviewer.scores.enjoyment}</li>
				<li>Overall: {review.reviewer.scores.overall}</li>
				<li>Story: {review.reviewer.scores.story}</li>
				<li>Username: {review.reviewer.username}</li>
				<li>URL to the reviewer: {review.reviewer.url}</li>
			</ul>
		</div>
	);
};
