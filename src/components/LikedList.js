import React from "react";
import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import MangaLikedList from "./MangaLikedList";
import AnimeLikedList from "./AnimeLikedList";
import Sorting from "./Sorting";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../sass/LikedList.css";

export default function LikedList({ idLookedFor }) {
  const [likedMangasData, setLikedMangasData] = useState([]);
  const [likedAnimesData, setLikedAnimesData] = useState([]);
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const handleAnimesRetrieve = () => {
      firestore
        .collection("likedAnimes")
        .doc(idLookedFor)
        .collection("anime")
        .get()
        .then((querySnapshot) => {
          const newAnimeList = [];
          querySnapshot.forEach((doc) => {
            newAnimeList.push(doc.data());
          });
          setLikedAnimesData(newAnimeList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    const handleMangasRetrieve = () => {
      firestore
        .collection("likedMangas")
        .doc(idLookedFor)
        .collection("manga")
        .get()
        .then((querySnapshot) => {
          const newMangaList = [];
          querySnapshot.forEach((doc) => {
            newMangaList.push(doc.data());
          });
          setLikedMangasData(newMangaList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    handleMangasRetrieve();
    handleAnimesRetrieve();
  }, [idLookedFor]);

  return (
    <div>
      <div className="likedlist-btn">
        <Sorting
          idLookedFor={idLookedFor}
          likedMangasData={likedMangasData}
          likedAnimesData={likedAnimesData}
          setLikedMangasData={setLikedMangasData}
          setLikedAnimesData={setLikedAnimesData}
        />

        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            }
            label="Anime"
            classes={{ label: "anime-toggle" }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="Manga"
            classes={{ label: "manga-toggle" }}
          />
        </FormGroup>
      </div>
      <p className="anime-label">Animes:</p>
      {state.checkedA ? (
        <AnimeLikedList likedData={likedAnimesData} idLookedFor={idLookedFor} />
      ) : (
        ""
      )}

      <p className="manga-label">Mangas:</p>
      {state.checkedB ? (
        <MangaLikedList likedData={likedMangasData} idLookedFor={idLookedFor} />
      ) : (
        ""
      )}
    </div>
  );
}
