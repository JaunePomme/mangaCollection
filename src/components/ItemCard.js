import React, { useEffect, useState } from "react";
import "../sass/ItemCard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { Fade } from "@material-ui/core";
import { Collections } from "./FirestoreConstant.json";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export default function ItemCard({
  searchDataItem,
  category,
  retrievedLikedMangas,
  retrievedLikedAnimes,
}) {
  const [flip, setFlip] = useState(false);
  const urlString =
    "/manga-profile/" + searchDataItem.title + "/" + searchDataItem.mal_id;
  const [like, setLike] = useState(false);
  const { currentUser } = useAuthentication();
  const classes = useStyles();
  const [mangaOrNot, setMangaOrNot] = useState(true);
  const [stateAlert, setStateAlert] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClickAlert = (Transition) => () => {
    setStateAlert({
      open: true,
      Transition,
    });
    if (mangaOrNot) return handleMangaLikeClick();
    handleAnimeLikeClick();
  };

  const handleCloseAlert = () => {
    setStateAlert({
      ...stateAlert,
      open: false,
    });
  };

  useEffect(() => {
    if (category === "anime") setMangaOrNot(false);
  }, [category]);

  useEffect(() => {
    if (
      (category === "manga") &
      retrievedLikedMangas.includes(searchDataItem.title)
    )
      setLike(true);
    if (
      (category === "anime") &
      retrievedLikedAnimes.includes(searchDataItem.title)
    )
      setLike(true);
  }, [category]);

  const handleMangaLikeClick = async () => {
    setLike(!like);
    let db = firestore
      .collection(Collections.likedMangas)
      .doc(currentUser.uid)
      .collection(Collections.manga)
      .doc(searchDataItem.title);

    if (like) {
      let dbe = firestore
        .collection(Collections.likedMangas)
        .doc(currentUser.uid)
        .collection(Collections.manga)
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
        ...searchDataItem,
        personalScore: "",
        status: "Plan",
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
      .collection(Collections.likedAnimes)
      .doc(currentUser.uid)
      .collection(Collections.anime)
      .doc(searchDataItem.title);

    if (like) {
      let dbe = firestore
        .collection(Collections.likedAnimes)
        .doc(currentUser.uid)
        .collection(Collections.anime)
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
        ...searchDataItem,
        personalScore: "",
        status: "Plan",
      })
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div className="body-itemcard">
      {currentUser && (
        <div>
          <button
            className={`btn-likable ${like ? "liked" : ""} `}
            onClick={handleClickAlert(SlideTransition)}
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </button>
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
        </div>
      )}

      <div
        className={`itemcard ${flip ? "flip" : ""} `}
        onClick={() => setFlip(!flip)}
      >
        {mangaOrNot ? (
          <ul className="front">
            <li className="item-title">{searchDataItem.title}</li>
            <li className="item-img">
              <img
                src={searchDataItem.image_url}
                alt={searchDataItem.title}
                style={{ height: 200, width: 150 }}
                loading="lazy"
              />
            </li>

            <li className="item-score">Score: {searchDataItem.score}/10</li>
            {searchDataItem.volumes !== 0 ? (
              <li className="item-volumes">
                Volumes: {searchDataItem.volumes}
              </li>
            ) : (
              <li>Volumes: ?</li>
            )}

            {searchDataItem.chapters !== 0 ? (
              <li className="item-chapters">
                Chapters: {searchDataItem.chapters}
              </li>
            ) : (
              <li>Chapters: ?</li>
            )}
          </ul>
        ) : (
          <ul className="front">
            <li className="item-title">{searchDataItem.title}</li>
            <li className="item-img">
              <img
                src={searchDataItem.image_url}
                alt={searchDataItem.title}
                style={{ height: 200, width: 150 }}
                loading="lazy"
              />
            </li>

            <li className="item-score">Score: {searchDataItem.score}/10</li>
            {searchDataItem.episodes !== 0 ? (
              <li className="item-episodes">
                Episodes: {searchDataItem.episodes}
              </li>
            ) : (
              <li>Episodes: ?</li>
            )}
          </ul>
        )}

        <div className="back">
          {searchDataItem.synopsis ? (
            <div className="manga-synopsis">{searchDataItem.synopsis}</div>
          ) : (
            <h4>Synopsis: No data.</h4>
          )}

          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: urlString,
              state: {
                data: searchDataItem,
                type: category,
                id: searchDataItem.mal_id,
              },
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              See More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
