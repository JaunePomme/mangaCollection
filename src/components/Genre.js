import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import List from "./List";
import "../sass/Genre.css";
import MangaGenre from "./MangaGenre.json";
import AnimeGenre from "./AnimeGenre.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginLeft: 10,
    color: "#fafafa",
  },
}));

export default function Genre() {
  const classes = useStyles();
  const [mangaListGenre, setMangaListGenre] = useState([]);
  const [animeListGenre, setAnimeListGenre] = useState([]);
  const CATEGORY_LIST = ["manga", "anime"];
  const [category, setCategory] = useState(CATEGORY_LIST[0]);
  const [genre, setGenre] = useState(1);
  const [dataList, setDataList] = useState();

  useEffect(() => {
    setMangaListGenre(MangaGenre);
    setAnimeListGenre(AnimeGenre);
  }, []);

  useEffect(() => {
    const search = async (category, genre) => {
      try {
        let response = await axios.get(
          `https://api.jikan.moe/v3/search/${category}?genre=${genre}`
        );
        setDataList(response.data.results);
        return dataList;
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    search(category, genre);
  }, [category, genre, dataList]);

  return (
    <div>
      <div className="genre-container">
        <FormControl className={classes.formControl}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value={"anime"}>Anime</MenuItem>
            <MenuItem value={"manga"}>Manga</MenuItem>
          </Select>
          <FormHelperText className={classes.selectEmpty}>
            Choose Anime or Manga
          </FormHelperText>
        </FormControl>

        {category === "manga" ? (
          <form className={classes.formControl} noValidate autoComplete="off">
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className={classes.selectEmpty}
            >
              {mangaListGenre.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.selectEmpty}>
              Choose the genre
            </FormHelperText>
          </form>
        ) : (
          <form className={classes.root} noValidate autoComplete="off">
            <Select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className={classes.selectEmpty}
            >
              {animeListGenre.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={classes.selectEmpty}>
              Choose the genre
            </FormHelperText>
          </form>
        )}
      </div>

      <List data={dataList} />
    </div>
  );
}
