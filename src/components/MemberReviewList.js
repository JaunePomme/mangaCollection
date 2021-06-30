import React from 'react';
import MemberReviewCard from './MemberReviewCard';


export default function MemberReviewList({ reviewList }) {

    return (
        <div>
            <div>
                {reviewList && reviewList.map(item =>
                    <MemberReviewCard key={item.mal_id} review={item} />

                )}

            </div>
        </div>
    )
}
