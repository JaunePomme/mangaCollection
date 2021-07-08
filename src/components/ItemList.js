import React from "react";
import ItemCard from "./ItemCard";
import "./ItemList.css";

export default function ItemList({
  searchData,
  category,
  retrievedLikedMangas,
  retrievedLikedAnimes,
}) {
  return (
    <div className="manga-grid">
      {searchData.map((searchDataItem) => (
        <ItemCard
          key={searchDataItem.mal_id}
          searchDataItem={searchDataItem}
          category={category}
          retrievedLikedMangas={retrievedLikedMangas}
          retrievedLikedAnimes={retrievedLikedAnimes}
        />
      ))}
    </div>
  );
}
