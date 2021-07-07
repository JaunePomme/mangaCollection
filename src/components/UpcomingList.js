import React from 'react'
import UpcomingCard from './UpcomingCard'

export default function UpcomingList({upcomingList}) {
    

    return (
        <div>
            <div>
                {upcomingList && upcomingList.map(item =>
                    <UpcomingCard key={item.mal_id} item={item} />
                )}
            </div>
        </div>
    )
}
