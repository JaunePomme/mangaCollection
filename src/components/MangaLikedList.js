import React from "react";
import MangaLikedCard from "./MangaLikedCard";
import '../sass/MangaLikedList.css';

export default function MangaLikedList({ likedData, idLookedFor }) {
  return (
    <div className='likedList'>
      {likedData &&
        likedData.map((item) => (
          <MangaLikedCard
            key={item.mal_id}
            item={item}
            idLookedFor={idLookedFor}
          />
        ))}
    </div>
  );
}
