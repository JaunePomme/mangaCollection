import React, { useState, useEffect } from "react";
import ItemList from "./components/ItemList";
import "./App.css";
import axios from "axios";
import MainContent from "./components/MainContent";
import { firestore } from "./firebase";
import { useAuthentication } from "./contexts/AuthenticationContext";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3),
  },
}));

export default function Content() {
  const CATEGORY_LIST = ["manga", "anime"];
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const { currentUser } = useAuthentication();
  const [inputValue, setInputValue] = useState("");
  const [retrievedLikedMangas, setretrievedLikedMangas] = useState([]);
  const [retrievedLikedAnimes, setretrievedLikedAnimes] = useState([]);
  const classes = useStyles();
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [firstTime, setFirstTime] = useState(true);

  const searchItem = async (category, keyword, page) => {
    try {
      let response = await axios.get(
        `https://api.jikan.moe/v3/search/${category}?q=${keyword}&page=${page}`
      );
      setSearchData(response.data.results);
      return searchData;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (currentUser) {
      const retrieveLikedMangaList = async () => {
        firestore
          .collection("likedMangas")
          .doc(currentUser.uid)
          .collection("manga")
          .get()
          .then((querySnapshot) => {
            const newMangaList = [];
            querySnapshot.forEach((doc) => {
              newMangaList.push(doc.data().title);
            });
            setretrievedLikedMangas(newMangaList);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };
      const retrieveLikedAnimeList = async () => {
        firestore
          .collection("likedAnimes")
          .doc(currentUser.uid)
          .collection("anime")
          .get()
          .then((querySnapshot) => {
            const newAnimeList = [];
            querySnapshot.forEach((doc) => {
              newAnimeList.push(doc.data().title);
            });
            setretrievedLikedAnimes(newAnimeList);
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      };
      retrieveLikedMangaList();
      retrieveLikedAnimeList();
    }
  }, []);

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    searchItem(category, inputValue, page);
  }, [page]);

  return (
    <div>
      <div className="container-data">
        <div className="search-bar">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="search 3 letters at least.."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchItem(category, inputValue, page);
              }
            }}
          />

          <form className="form">
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_LIST.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                searchItem(category, inputValue, page);
              }}
              className={classes.button}
            >
              <FontAwesomeIcon icon={faSearch} />
              Search
            </Button>
          </form>
        </div>

        <ItemList
          searchData={searchData}
          category={category}
          retrievedLikedMangas={retrievedLikedMangas}
          retrievedLikedAnimes={retrievedLikedAnimes}
        />
      </div>

      <MainContent />

      {searchData.length > 1 && (
        <div>
          {page > 1 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setPage((page) => page - 1);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Previous Page
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setPage((page) => page + 1);
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
}
