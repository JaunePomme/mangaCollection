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
import { valuesForScoring } from "./const.js";

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
  const [openbis, setOpenbis] = useState(false);
  const classes = useStyles();
  const [inputStatus, setInputStatus] = useState("");
  const { currentUser } = useAuthentication();
  const [inputReview, setInputReview] = useState("");
  const [inputScoring, setInputScoring] = useState("");
  const [inputEpisode, setInputEpisode] = useState();

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

  const handleOpenbis = () => {
    setOpenbis(true);
    console.log("handle open reached");
  };

  const handleClosebis = () => {
    setOpenbis(false);
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
    handleClosebis();
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

  return (
    <div>
      <div key={item.mal_id}>
        <div className="body-mangacard">
          <div>
            <div className="front">
              <div>{item.title}</div>
              <div>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{ maxHeight: 200 }}
                />
                {inputReview}
                <div>
                  <strong>{inputScoring}</strong>
                </div>
              </div>
              <div>{inputStatus}</div>
              <div>{item.rated}</div>
              Score: {item.score}/10
              <div className="anime-episodes">
                episodes I watched: {inputEpisode}/{item.episodes}
              </div>
            </div>

            <div className="back">
              <div className="anime-synopsis">Synopsis: {item.synopsis}</div>

              <Link
                to={{
                  pathname: "/manga-profile/" + item.title,
                  state: { data: item, like: true, type: "anime" },
                }}
              >
                <button
                  className="btn-behind-mangacard"
                  onClick={() => handleSeeMore(item)}
                >
                  See more
                </button>
              </Link>
              {currentUser.uid !== idLookedFor ? (
                ""
              ) : (
                <div>
                  <button
                    type="button"
                    className="btn-behind-mangacard"
                    onClick={() => handleOpenbis()}
                  >
                    Give review and a score
                  </button>

                  <button
                    type="button"
                    className="btn-behind-mangacard"
                    onClick={handleOpen}
                  >
                    Update {item.title}
                  </button>
                </div>
              )}
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
                          <option aria-label="None" value="" />
                          <option value={"OnGoing"}>OnGoing</option>
                          <option value={"Completed"}>Completed</option>
                          <option value={"Plan to watch"}>Plan to watch</option>
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
                      <div>
                        <button type="button" onClick={() => handleSave()}>
                          Save modifications
                        </button>
                      </div>
                    </p>
                  </div>
                </Fade>
              </Modal>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openbis}
                onClose={handleClosebis}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openbis}>
                  <div className={classes.paper}>
                    <h2 id="transition-modal-title">
                      Write your review about: {item.title}
                    </h2>
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
                        <TextField
                          id="outlined-select-scoring"
                          select
                          label="Select"
                          value={inputScoring}
                          onChange={(e) => setInputScoring(e.target.value)}
                          helperText="Please select your scoring"
                          letiant="outlined"
                        >
                          {valuesForScoring.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => handleReviewAndScore()}
                        >
                          Save the modifications
                        </button>
                      </div>
                    </p>
                  </div>
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
