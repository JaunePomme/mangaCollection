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
import "../sass/MangaLikedCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

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

export default function MangaLikedCard({ item, idLookedFor }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [inputStatus, setInputStatus] = useState("Plan");
  const { currentUser } = useAuthentication();
  const [inputReview, setInputReview] = useState("?");
  const [inputScoring, setInputScoring] = useState("?");
  const [inputChapter, setInputChapter] = useState(0);

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
      .collection("likedMangas")
      .doc(currentUser.uid)
      .collection("manga")
      .doc(item.title);
    batch.update(statusRef, { status: inputStatus });

    let scansRef = firestore
      .collection("scans")
      .doc(currentUser.uid)
      .collection("manga")
      .doc(item.title);
    if (inputChapter != null) batch.set(scansRef, { chapter: inputChapter });
    if (inputStatus === "Completed") {
      setInputChapter(item.chapters);
      batch.set(scansRef, { chapter: item.chapters });
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
      .collection("manga")
      .doc(item.title);
    batch.set(reviewsRef, { review: inputReview });

    let scoresRef = firestore
      .collection("likedMangas")
      .doc(currentUser.uid)
      .collection("manga")
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
        .collection("manga")
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
      let scoreRef = firestore
        .collection("likedMangas")
        .doc(idLookedFor)
        .collection("manga")
        .doc(item.title);
      scoreRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputScoring(doc.data().personalScore);
          } else {
            // console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    const handleScansRetrieve = () => {
      let docRef = firestore
        .collection("scans")
        .doc(idLookedFor)
        .collection("manga")
        .doc(item.title);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setInputChapter(doc.data().chapter);
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
        .collection("likedMangas")
        .doc(idLookedFor)
        .collection("manga")
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
    handleScansRetrieve();
    handleReviewsRetrieve();
    handleScoresRetrieve();
  }, [item.title, idLookedFor]);

  

  return (
    <div>
      <div className="body-mangacard">
        <div>
          <ul className=  {`mangaLikedCard-ul ${inputStatus} `}>
            <li>
              <img
                className="manga-img"
                src={item.image_url}
                alt={item.title}
                style={{ height: 150, width: 100 }}
              />
              <div className="manga-overlay">
                <Link
                  to={{
                    pathname: "/manga-profile/" + item.title,
                    state: {
                      data: item,
                      like: true,
                      type: "manga",
                      review: inputReview,
                      inputScoring: inputScoring,
                      id:item.mal_id
                    },
                  }}
                >
                  <button
                    className="btn-manga-seemore"
                    onClick={() => handleSeeMore(item)}
                  >
                    See more
                  </button>
                </Link>
              </div>
            </li>
            <div className="manga-info">
              <li className="manga-title">
                <strong>{item.title}</strong>
              </li>
              <li className="manga-score">MyAnimList score: {item.score}/10</li>
              <li className="manga-inputscoring">
                My score:<strong> {inputScoring}/10</strong>
              </li>
              <li className="manga-chapters">
                Reading:
                <strong>
                  {inputChapter}/{item.chapters}
                </strong>
              </li>
            </div>
            <li className="manga-update">
              {currentUser.uid !== idLookedFor ? (
                ""
              ) : (
                <button
                  type="button"
                  className="manga-update-btn"
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
                      <InputLabel htmlFor="manga-status">Status</InputLabel>
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
                        
                        <option value={"Plan"}>Plan to read</option>
                        <option value={"Ongoing"}>OnGoing</option>
                        <option value={"Completed"}>Completed</option>
                      </Select>
                    </FormControl>
                    <div>
                      Chapters read:{" "}
                      {inputStatus === "Completed" ? (
                        item.chapters
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={inputChapter}
                          onChange={(e) => setInputChapter(e.target.value)}
                          placeholder={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSave();
                            }
                          }}
                        ></input>
                      )}
                      /{item.chapters}
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
                    {valuesForScoring.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <h3 id="transition-modal-title">Write your review:</h3>
                  <p id="transition-modal-description">
                    <TextareaAutosize
                      aria-label="minimum height"
                      rowsMin={3}
                      rowsMax={5}
                      onChange={(e) => setInputReview(e.target.value)}
                      value={inputReview}
                      placeholder="Write here..."
                    />

                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          handleReviewAndScore();
                          handleSave();
                        }}
                      >
                        Save modifications
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
  );
}
