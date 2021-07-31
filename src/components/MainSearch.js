import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import NextPreviousPage from "./NextPreviousPage";
import TopMangaAnime from "./TopMangaAnime";
import "../sass/MainSearch.css";
import useRetrieveLikedMangas from "../hooks/useRetrieveLikedMangas";
import useRetrieveLikedAnimes from "../hooks/useRetrieveLikedAnimes";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginLeft: 10,
    color: "#fafafa",
  },
  button: {
    marginLeft: 10,
  },
}));

export default function MainSearch() {
  const CATEGORY_LIST = ["manga", "anime"];
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [firstTime, setFirstTime] = useState(true);
  const retrievedLikedMangas = useRetrieveLikedMangas();
  const retrievedLikedAnimes = useRetrieveLikedAnimes();

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
    if (firstTime) {
      setFirstTime(false);
      return;
    }
    searchItem(category, inputValue, page);
  }, [page, category]);

  return (
    <div className="mainsearch-container">
      <div className="search-bar">
        <form className="form">
          <input
            className="search-input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="search 3 letters at least.."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchItem(category, inputValue, page);
              }
            }}
          />

          <FormControl className="form-control-search">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={classes.selectEmpty}
            >
              <MenuItem value={"anime"}>Anime</MenuItem>
              <MenuItem value={"manga"}>Manga</MenuItem>
            </Select>
            <FormHelperText className={classes.selectEmpty}>
              Choose Anime or Manga{" "}
            </FormHelperText>
          </FormControl>
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
      {searchData.length > 1 && (
        <NextPreviousPage page={page} setPage={setPage} />
      )}
      <TopMangaAnime />
    </div>
  );
}
