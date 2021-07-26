import React, { useState, useEffect } from "react";
import "../sass/Card.css";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { firestore } from "../firebase";
import axios from "axios";

export default function Card({
  item,
  type,
  retrievedLikedAnimes,
  retrievedLikedMangas,
  movie,
  category,
}) {
  const [like, setLike] = useState(false);
  const { currentUser } = useAuthentication();
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    if (retrievedLikedMangas?.includes(item.title)) setLike(true);
    if (retrievedLikedAnimes?.includes(item.title)) setLike(true);
  }, [retrievedLikedAnimes, retrievedLikedMangas, item.title]);

  // const handleAnimeLikeClick = async () => {
  // try {
  //   let response = await axios.get(
  //     `https://api.jikan.moe/v3/${type}/${item.mal_id}`
  //   );
  //   setSearchData(response.data);
  //   return searchData;
  // } catch (e) {
  //   console.log(e);
  // }

  //   setLike(!like);
  //   let db = firestore
  //     .collection("likedAnimes")
  //     .doc(currentUser.uid)
  //     .collection("anime")
  //     .doc(item.title);
  //   if (like) {
  //     let dbe = firestore
  //       .collection("likedAnimes")
  //       .doc(currentUser.uid)
  //       .collection("anime")
  //       .doc(item.title);
  //     return dbe
  //       .delete()
  //       .then(() => {
  //         console.log("Document removed!");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating document: ", error);
  //       });
  //   }

  //   return db
  //     .set({
  //       mal_id: item.mal_id,
  //       title: item.title,
  //       image_url: item.image_url,
  //       episodes: item.episodes,
  //       type: item.type,
  //       score: item.score,
  //       personalScore: "",
  //       status: "Plan",
  //       members: item.members,
  //       start_date: item.start_date,
  //       end_date: item.end_date,
  //     })
  //     .then(() => {
  //       console.log("Document added!");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating document: ", error);
  //     });
  // };

  // const handleMangaLikeClick = async () => {
  //   setLike(!like);
  //   let db = firestore
  //     .collection("likedMangas")
  //     .doc(currentUser.uid)
  //     .collection("manga")
  //     .doc(item.title);

  //   if (like) {
  //     let dbe = firestore
  //       .collection("likedMangas")
  //       .doc(currentUser.uid)
  //       .collection("manga")
  //       .doc(item.title);
  //     return dbe
  //       .delete()
  //       .then(() => {
  //         console.log("Document removed!");
  //       })
  //       .catch((error) => {
  //         console.error("Error updating document: ", error);
  //       });
  //   }

  //   return db
  //     .set({
  //       mal_id: item.mal_id,
  //       title: item.title,
  //       image_url: item.image_url,
  //       synopsis: item.synopsis,
  //       volumes: item.volumes,
  //       chapters: item.chapters,
  //       score: item.score,
  //       personalScore: "",
  //       status: "Plan",
  //       members: item.members,
  //       start_date: item.start_date,
  //       end_date: item.end_date,
  //     })
  //     .then(() => {
  //       console.log("Document added!");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating document: ", error);
  //     });
  // };

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
        <h3>{item.title}</h3>
        {item.rank ? <h3>Rank: {item.rank}</h3> : ""}
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
        {/* <button
          className={`btn-likable ${like ? "liked" : ""} `}
          onClick={
            category === "anime"
              ? () => handleAnimeLikeClick()
              : () => handleMangaLikeClick()
          }
        >
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        </button> */}
      </div>
    </ul>
  );
}
