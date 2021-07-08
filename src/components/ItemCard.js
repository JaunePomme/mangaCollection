import React, { useEffect, useState } from "react";
import "./ItemCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function ItemCard({
  searchDataItem,
  category,
  retrievedLikedMangas,
  retrievedLikedAnimes,
}) {
  const [flip, setFlip] = useState(false);
  const urlString = "/manga-profile/" + searchDataItem.title;
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const { currentUser } = useAuthentication();
  const [mangaOrNot, setMangaOrNot] = useState(true);

  useEffect(() => {
    if (category === "anime") setMangaOrNot(false);
  }, [category]);

  useEffect(() => {
    if (
      retrievedLikedMangas.includes(searchDataItem.title) ||
      retrievedLikedAnimes.includes(searchDataItem.title)
    ) {
      setLike(true);
    }
  }, []);

  const handleMangaLikeClick = async () => {
    setLike(!like);
    let db = firestore
      .collection("likedMangas")
      .doc(currentUser.uid)
      .collection("manga")
      .doc(searchDataItem.title);

    if (like) {
      let dbe = firestore
        .collection("likedMangas")
        .doc(currentUser.uid)
        .collection("manga")
        .doc(searchDataItem.title);
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
        mal_id: searchDataItem.mal_id,
        title: searchDataItem.title,
        image_url: searchDataItem.image_url,
        synopsis: searchDataItem.synopsis,
        volumes: searchDataItem.volumes,
        chapters: searchDataItem.chapters,
        score: searchDataItem.score,
        personalScore: "",
        status: "",
        members: searchDataItem.members,
        start_date: searchDataItem.start_date,
        end_date: searchDataItem.end_date,
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
      .doc(searchDataItem.title);

    if (like) {
      let dbe = firestore
        .collection("likedAnimes")
        .doc(currentUser.uid)
        .collection("anime")
        .doc(searchDataItem.title);
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
        mal_id: searchDataItem.mal_id,
        title: searchDataItem.title,
        image_url: searchDataItem.image_url,
        synopsis: searchDataItem.synopsis,
        episodes: searchDataItem.episodes,
        type: searchDataItem.type,
        score: searchDataItem.score,
        personalScore: "",
        status: "",
        rated: searchDataItem.rated,
        members: searchDataItem.members,
        start_date: searchDataItem.start_date,
        end_date: searchDataItem.end_date,
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleSeeMore = (searchDataItem) => {
    console.log(searchDataItem);
  };

  return (
    <div className="body-itemcard">
      {currentUser && (
        <button
          className={`btn-likable ${like ? "liked" : ""} `}
          onClick={mangaOrNot ? handleMangaLikeClick : handleAnimeLikeClick}
        >
          <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        </button>
      )}

      <div
        className={`itemcard ${flip ? "flip" : ""} `}
        onClick={() => setFlip(!flip)}
      >
        <div className="front">
          <div>{show ? {} : null}</div>
          <div>{searchDataItem.title}</div>
          <div>
            <img
              src={searchDataItem.image_url}
              alt={searchDataItem.title}
              style={{ maxHeight: 200 }}
            />
          </div>
          Score: {searchDataItem.score}/10
          <div className="manga-volumes">volumes: {searchDataItem.volumes}</div>
          <div className="manga-chapters">
            chapters: {searchDataItem.chapters}
          </div>
        </div>

        <div className="back">
          <div className="manga-synopsis">
            Synopsis: {searchDataItem.synopsis}
          </div>

          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: urlString,
              state: {
                data: searchDataItem,
                like: like,
                type: category,
                id: searchDataItem.mal_id,
              },
            }}
          >
            <button
              className="btn-behind-itemcard"
              onClick={() => handleSeeMore(searchDataItem)}
            >
              See more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
