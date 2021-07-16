import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../sass/MangaProfile.css";
import Reviews from "./Reviews";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import useRetrieveLikedAnimes from "../hooks/useRetrieveLikedAnimes";
import useRetrieveLikedMangas from "../hooks/useRetrieveLikedMangas";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Fade } from "@material-ui/core";
function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function MangaProfile() {
  let location = useLocation();
  const { currentUser } = useAuthentication();
  const { data, type, review, inputScoring } = location.state;
  const retrievedLikedAnimes = useRetrieveLikedAnimes();
  const retrievedLikedMangas = useRetrieveLikedMangas();

  const [like, setLike] = useState();
  const {
    mal_id,
    episodes,
    chapters,
    image_url,
    score,
    title,
    volumes,
    synopsis,
    members,
  } = data;

  const [stateAlert, setStateAlert] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClickAlert = (Transition) => () => {
    setStateAlert({
      open: true,
      Transition,
    });
    if (type === "anime") handleAnimeLikeClick();
    if (type === "manga") handleMangaLikeClick();
  };

  const handleCloseAlert = () => {
    setStateAlert({
      ...stateAlert,
      open: false,
    });
  };

  useEffect(() => {
    if (retrievedLikedMangas?.includes(title)) setLike(true);
    if (retrievedLikedAnimes?.includes(title)) setLike(true);
  }, [retrievedLikedAnimes, retrievedLikedMangas, title]);

  const handleMangaLikeClick = async () => {
    setLike(!like);
    let db = firestore
      .collection("likedMangas")
      .doc(currentUser.uid)
      .collection("manga")
      .doc(title);

    if (like) {
      let dbe = firestore
        .collection("likedMangas")
        .doc(currentUser.uid)
        .collection("manga")
        .doc(title);
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
        mal_id: mal_id,
        title: title,
        image_url: image_url,
        synopsis: synopsis,
        volumes: volumes,
        chapters: chapters,
        score: score,
        personalScore: "",
        status: "Plan",
        members: members,
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleAnimeLikeClick = async () => {
    setLike(!like);
    let db = firestore
      .collection("likedAnimes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(title);

    if (like) {
      let dbe = firestore
        .collection("likedAnimes")
        .doc(currentUser.uid)
        .collection("anime")
        .doc(title);
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
        mal_id: mal_id,
        title: title,
        image_url: image_url,
        synopsis: synopsis,
        episodes: episodes,
        type: type,
        score: score,
        personalScore: "",
        status: "Plan",
        members: members,
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <ul className="mangaprofile-ul">
      {like && (
        <div className="profile-liked">
          <strong>This item is in the favorite list.</strong>
          <FontAwesomeIcon icon={"user"}></FontAwesomeIcon>
        </div>
      )}
      <img src={image_url} alt={title} style={{ maxHeight: 500 }} />
      <li>Title: {title}</li>
      <li>ID of the item: {mal_id}</li>
      {type === "manga" ? (
        <li>Chapters: {chapters}</li>
      ) : (
        <li>Episodes: {episodes}</li>
      )}
      <li>MyAnimList Score: {score}</li>
      {inputScoring ? <li>My personal score: {inputScoring}</li> : ""}
      <li>Synopsis: {synopsis}</li>
      <li>Volumes released: {volumes}</li>
      <li>Members on myAnimList: {members}</li>
      {review ? (
        <li className="mangaprofile-myreview">My review: {review}</li>
      ) : (
        ""
      )}
      <Button
        type="button"
        onClick={handleClickAlert(SlideTransition)}
        variant="outlined"
        color="secondary"
      >
        {like ? "Unlike: " : "Like: "}
        {title}
      </Button>
      {like ? (
        <Snackbar
          open={stateAlert.open}
          onClose={handleCloseAlert}
          TransitionComponent={stateAlert.Transition}
          message={" will be added to your favorite list."}
          key={stateAlert.Transition.name}
        />
      ) : (
        <Snackbar
          open={stateAlert.open}
          onClose={handleCloseAlert}
          TransitionComponent={stateAlert.Transition}
          message={" will be removed from your favorite list."}
          key={stateAlert.Transition.name}
        />
      )}
      MyAnimList reviews: <Reviews />
    </ul>
  );
}
