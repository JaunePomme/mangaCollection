import React from "react";
import AnimeLikedCard from "./AnimeLikedCard";

export default function AnimeLikedList({ likedData, idLookedFor }) {
  return (
    <div>
      <div>
        {likedData &&
          likedData.map((item) => (
            <AnimeLikedCard
              key={item.mal_id}
              item={item}
              idLookedFor={idLookedFor}
            />
          ))}
      </div>
    </div>
  );
}
