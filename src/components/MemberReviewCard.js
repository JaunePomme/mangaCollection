import React from "react";

export default function MemberReviewCard({ review }) {
  return (
    <div>
      <img
        src={review.reviewer.image_url}
        alt={review.reviewer.username}
        style={{ maxHeight: 500 }}
      />
      <ul className='reviewList-container'>
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
}
