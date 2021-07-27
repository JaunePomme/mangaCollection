import React, { useState, useEffect } from "react";
import "../sass/Card.css";

export default function Card({
  item,
  type,
  retrievedLikedAnimes,
  retrievedLikedMangas,
  movie,
  category,
}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (retrievedLikedMangas?.includes(item.title)) setLike(true);
    if (retrievedLikedAnimes?.includes(item.title)) setLike(true);
  }, [retrievedLikedAnimes, retrievedLikedMangas, item.title]);

  return (
    <ul className="card">
      <img
        className="card-img"
        src={item.image_url}
        alt={item.title}
        loading="lazy"
      />
      <div className="card-overlay">
        <h3>{item.title}</h3>
        {item.rank ? <h3>Rank: {item.rank}</h3> : ""}
        <h3>Score: {item.score}</h3>

        <h4>
          {item.url ? (
            <a
              className="card-url"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              More on myAnimeList..
            </a>
          ) : (
            <a
              className="card-no-url"
              href={"https://myanimelist.net/" + type + "/" + item.mal_id}
              target="_blank"
              rel="noopener noreferrer"
            >
              More on myAnimeList..
            </a>
          )}
        </h4>
      </div>
    </ul>
  );
}
