import React from 'react'

export default function MemberReviewCard({ review }) {

    return (
        <div>
            <div>

                <div>
                    <img src={review.reviewer.image_url}
                        alt={'hi'}
                        style={{ maxHeight: 500 }} />
                </div>
                <div>
                    {review.content}
                </div>
                <div>
                    Helpful counter: {review.helpful_count}
                </div>
                <div>
                    Date: {review.date}
                </div>
                <div>
                    Animations: {review.reviewer.scores.animations}
                </div>
                <div>
                    Character: {review.reviewer.scores.character}
                </div>
                <div>
                    Enjoyment: {review.reviewer.scores.enjoyment}
                </div>
                <div>
                    Overall: {review.reviewer.scores.overall}
                </div>
                <div>
                    Sound: {review.reviewer.scores.Sound}
                </div>
                <div>
                    Story: {review.reviewer.scores.story}
                </div>
                <div>
                    Username: {review.reviewer.username}
                </div>
                <div>
                    URL to the reviewer: {review.reviewer.url}
                </div>


            </div>

        </div>
    )
}
