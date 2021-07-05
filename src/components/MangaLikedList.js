import React from 'react'
import MangaLikedCard from './MangaLikedCard'
import What from './What'
export default function MangaLikedList({ likedData, liste }) {

    // console.log(liste)

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
