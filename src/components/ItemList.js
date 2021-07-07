import React from 'react'
import ItemCard from './ItemCard'
import './ItemList.css'

export default function ItemList({ searchData, category, likedMangasRetrieved, likedAnimesRetrieved }) {
    // console.log(searchData)

    return (
        <div className='manga-grid'>
            {searchData.map(searchDataItem => (
                <ItemCard
                    key={searchDataItem.mal_id}
                    searchDataItem={searchDataItem}
                    category={category}
                    likedMangasRetrieved={likedMangasRetrieved}
                    likedAnimesRetrieved={likedAnimesRetrieved} />
            ))}
        </div>
    )
}
