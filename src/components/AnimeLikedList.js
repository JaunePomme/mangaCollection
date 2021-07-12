import React from "react";
import AnimeLikedCard from "./AnimeLikedCard";
import '../sass/MangaLikedList.css';

export default function AnimeLikedList({ likedData, idLookedFor }) {
  return (
    <div className='likedList'>
        {likedData &&
          likedData.map((item) => (
            <AnimeLikedCard
              key={item.mal_id}
              item={item}
              idLookedFor={idLookedFor}
            />
          ))}
    </div>
  );
}
