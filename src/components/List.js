import React from "react";
import Card from "./Card";
import "../sass/List.css";

export default function List({
  data,
  type,
  retrievedLikedAnimes,
  retrievedLikedMangas,
  movie,
}) {
  return (
    <div className="list">
      {data &&
        data.map((item) => (
          <Card
            key={item.mal_id}
            item={item}
            type={type}
            retrievedLikedAnimes={retrievedLikedAnimes}
            retrievedLikedMangas={retrievedLikedMangas}
            movie={movie}
            category={"anime"}
          />
        ))}
    </div>
  );
}
