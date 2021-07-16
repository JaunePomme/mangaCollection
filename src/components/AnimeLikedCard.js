import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/NativeSelect";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ValuesForScoring from "./ValuesForScoring.json";
import "../sass/AnimeLikedCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function AnimeLikedCard({ item, idLookedFor }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [inputStatus, setInputStatus] = useState("Plan");
  const { currentUser } = useAuthentication();
  const [inputReview, setInputReview] = useState("?");
  const [inputScoring, setInputScoring] = useState("?");
  const [inputEpisode, setInputEpisode] = useState(0);
  const [stateAlert, setStateAlert] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClickAlert = (Transition) => () => {
    setStateAlert({
      open: true,
      Transition,
    });
    dislike();
  };

  const handleCloseAlert = () => {
    setStateAlert({
      ...stateAlert,
      open: false,
    });
  };

  const handleSeeMore = (searchDataItem) => {
    console.log(searchDataItem);
  };

  const handleOpen = () => {
    setOpen(true);
    console.log("handle open reached");
  };

  const handleClose = () => {
    setOpen(false);
    console.log("handle close");
  };

  const handleSave = () => {
    let batch = firestore.batch();

    let statusRef = firestore
      .collection("likedAnimes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title);
    batch.update(statusRef, { status: inputStatus });

    if (inputStatus === "Completed") setInputEpisode(item.episodes);

    let episodesRef = firestore
      .collection("episodes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title);
    if (inputEpisode != null) batch.set(episodesRef, { episode: inputEpisode });
    if (inputStatus === "Completed") {
      setInputEpisode(item.episodes);
      batch.set(episodesRef, { episode: item.episodes });
    }
    batch
      .commit()
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    handleClose();
  };

  const handleReviewAndScore = () => {
    console.log("dans handleReview");
    let batch = firestore.batch();

    let reviewsRef = firestore
      .collection("reviews")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title);
    batch.set(reviewsRef, { review: inputReview });

    let scoresRef = firestore
      .collection("likedAnimes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title);
    batch.update(scoresRef, { personalScore: inputScoring });

    batch
      .commit()
      .then(() => {
        console.log("Document added!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  useEffect(() => {
    const handleReviewsRetrieve = () => {
      let docRef = firestore
        .collection("reviews")
        .doc(idLookedFor)
        .collection("anime")
        .doc(item.title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputReview(doc.data().review);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    const handleScoresRetrieve = () => {
      let docRef = firestore
        .collection("likedAnimes")
        .doc(idLookedFor)
        .collection("anime")
        .doc(item.title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputScoring(doc.data().personalScore);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    const handleEpisodesRetrieve = () => {
      let docRef = firestore
        .collection("episodes")
        .doc(idLookedFor)
        .collection("anime")
        .doc(item.title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputEpisode(doc.data().episode);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    const handleStatusRetrieve = () => {
      let docRef = firestore
        .collection("likedAnimes")
        .doc(idLookedFor)
        .collection("anime")
        .doc(item.title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputStatus(doc.data().status);
          } else {
            // console.log("No such document");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };

    handleStatusRetrieve();
    handleEpisodesRetrieve();
    handleReviewsRetrieve();
    handleScoresRetrieve();
  }, [item.title, idLookedFor]);

  const dislike = async () => {
    await firestore
      .collection("likedAnimes")
      .doc(currentUser.uid)
      .collection("anime")
      .doc(item.title)
      .delete()
      .then(() => {
        console.log("Document removed!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  return (
    <div>
      <div>
        <div>
          <ul className={`animeLikedCard-ul ${inputStatus} `}>
            <li>
              <img
                className="anime-img"
                src={item.image_url}
                alt={item.title}
                style={{ height: 150, width: 100 }}
              />
              <div className="anime-overlay">
                <Link
                  to={{
                    pathname: "/manga-profile/" + item.title,
                    state: {
                      data: item,
                      like: true,
                      type: "anime",
                      review: inputReview,
                      inputScoring: inputScoring,
                      id: item.mal_id,
                    },
                  }}
                >
                  <button
                    className="btn-anime-seemore"
                    onClick={() => handleSeeMore(item)}
                  >
                    See more
                  </button>
                </Link>
              </div>
            </li>
            <div className="anime-info">
              <li className="anime-title">
                <strong>{item.title}</strong>
              </li>
              <li clasName="anime-inputscoring">
                My score:<strong>{inputScoring}/10</strong>
              </li>
              <li className="anime-score">
                {" "}
                MyAnimList score: {item.score}/10
              </li>
              <li className="anime-episodes">
                Watching:{" "}
                <strong>
                  {inputEpisode}/{item.episodes}
                </strong>
              </li>
            </div>

            <li className="anime-update">
              {currentUser.uid !== idLookedFor ? (
                ""
              ) : (
                <button
                  type="button"
                  className="anime-update-btn"
                  onClick={handleOpen}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
            </li>
          </ul>

          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <h2 id="transition-modal-title">Update: {item.title}</h2>
                  <p id="transition-modal-description">
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="anime-status">Status</InputLabel>
                      <Select
                        native
                        value={inputStatus}
                        onChange={(event) => {
                          setInputStatus(event.target.value);
                        }}
                        inputProps={{
                          name: "status",
                        }}
                      >
                        <option value={"Plan"}>Plan to watch</option>
                        <option value={"Ongoing"}>OnGoing</option>
                        <option value={"Completed"}>Completed</option>
                      </Select>
                    </FormControl>
                    <div>
                      Episode watched:{" "}
                      {inputStatus === "Completed" ? (
                        item.episodes
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={inputEpisode}
                          onChange={(e) => setInputEpisode(e.target.value)}
                          placeholder={0}
                        ></input>
                      )}
                      /{item.episodes}
                    </div>
                  </p>

                  <TextField
                    id="outlined-select-scoring"
                    select
                    label="Select"
                    value={inputScoring}
                    onChange={(e) => setInputScoring(e.target.value)}
                    helperText="Please select your scoring"
                    letiant="outlined"
                  >
                    {ValuesForScoring.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <h3 id="transition-modal-title">Write your review:</h3>
                  <p id="transition-modal-description">
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={6}
                      rowsMax={10}
                      onChange={(e) => setInputReview(e.target.value)}
                      value={inputReview}
                      placeholder="Write here..."
                    />
                    <div>
                      <Button
                        type="button"
                        onClick={() => {
                          handleReviewAndScore();
                          handleSave();
                        }}
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                      >
                        Save modifications
                      </Button>

                      <Button
                        type="button"
                        onClick={handleClickAlert(SlideTransition)}
                        className={classes.button}
                        variant="outlined"
                        color="secondary"
                      >
                        Dislike
                      </Button>
                      <Snackbar
                        open={stateAlert.open}
                        onClose={handleCloseAlert}
                        TransitionComponent={stateAlert.Transition}
                        message={
                          item.title +
                          " will be removed from your favorite list."
                        }
                        key={stateAlert.Transition.name}
                      />
                    </div>
                  </p>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
