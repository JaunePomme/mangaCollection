import React, { useState, useEffect } from "react";
import "../sass/Card.css";
import { firestore } from "../firebase";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function Card({ item, type }) {
  const [like, setLike] = useState(false);
  const { currentUser } = useAuthentication();

  // useEffect(() => {
  //   if (
  //     retrievedLikedMangas.includes(item.title) ||
  //     retrievedLikedAnimes.includes(item.title)
  //   ) {
  //     setLike(true);
  //   }
  // }, []);

  const handleMangaLikeClick = async () => {
    setLike(!like);
    let db = firestore
      .collection("likedMangas")
      .doc(currentUser.uid)
      .collection("manga")
      .doc(item.title);

    if (like) {
      let dbe = firestore
        .collection("likedMangas")
        .doc(currentUser.uid)
        .collection("manga")
        .doc(item.title);
      return dbe
        .delete()
        .then(() => {
          console.log("Document removed!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }

    return db
      .set({
        mal_id: item.mal_id,
        title: item.title,
        image_url: item.image_url,
        synopsis: item.synopsis,
        volumes: item.volumes,
        chapters: item.chapters,
        score: item.score,
        personalScore: "",
        status: "Plan",
        members: item.members,
        start_date: item.start_date,
        end_date: item.end_date,
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleAnimeLikeClick = async () => {
    console.log("dans la fonction");
    setLike(!like);
    let db = firestore
      .collection("likedAnimes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title);

    if (like) {
      let dbe = firestore
        .collection("likedAnimes")
        .doc(currentUser.uid)
        .collection("anime")
        .doc(item.title);
      return dbe
        .delete()
        .then(() => {
          console.log("Document removed!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    }

    return db
      .set({
        mal_id: item.mal_id,
        title: item.title,
        image_url: item.image_url,
        synopsis: item.synopsis,
        episodes: item.episodes,
        type: item.type,
        score: item.score,
        personalScore: "",
        status: "Plan",
        rated: item.rated,
        members: item.members,
        start_date: item.start_date,
        end_date: item.end_date,
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <ul className="card">
      <img
        className="card-img"
        src={item.image_url}
        style={{ minHeight: 400, maxHeight: 400 }}
        alt={item.title}
        loading="lazy"
      />
      <div className="card-overlay">
        <h2>{item.title}</h2>
        {item.rank ? <h2>Rank: {item.rank}</h2> : ""}
        <h3>Score: {item.score}</h3>

        <h4>
          {item.url ? (
            <a
              style={{ display: "table-cell", textDecoration: "none" }}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              More on myAnimeList..
            </a>
          ) : (
            <a
              style={{
                display: "table-cell",
                textDecoration: "none",
                color: "pink",
              }}
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
