import React from 'react'
import MangaLikedCard from './MangaLikedCard'

export default function MangaLikedList({ likedData }) {

    return (
        <div>
            <div>

                {likedData && likedData.map(item =>
                    
                    <MangaLikedCard key={item.mal_id} item={item} />

                )}

            </div>
        </div>
    )
}
