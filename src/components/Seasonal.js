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
import "../sass/Seasonal.css";
import Years from "./Years.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "snow",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      backgroundColor: "snow",
    },
  },
  button: {
    margin: theme.spacing(3),
  },
}));

export default function Seasonal() {
  const [seasonalList, setSeasonalList] = useState();
  const SEASON_LIST = ["fall", "summer", "winter", "spring"];
  const [inputYear, setInputYear] = useState(2021);
  const [inputSeason, setInputSeason] = useState(SEASON_LIST[0]);
  const classes = useStyles();

  useEffect(() => {
    const search = async (year, season) => {
      try {
        let seasonalResponse = await axios.get(
          `https://api.jikan.moe/v3/season/${year}/${season}`
        );
        setSeasonalList(seasonalResponse.data.anime);
        return seasonalList;
      } catch (e) {
        console.log("Error getting document:", e);
      }
    };
    search(inputYear, inputSeason);
  }, [inputYear, inputSeason, seasonalList]);

  return (
    <div>
      <div className="seasonal-container">
        <FormControl className={classes.formControl}>
          <InputLabel shrink>Season</InputLabel>
          <Select
            value={inputSeason}
            onChange={(e) => setInputSeason(e.target.value)}
            className={classes.selectEmpty}
          >
            <MenuItem value={"summer"}>Summer</MenuItem>
            <MenuItem value={"fall"}>Fall</MenuItem>
            <MenuItem value={"winter"}>Winter</MenuItem>
            <MenuItem value={"spring"}>Spring</MenuItem>
          </Select>
          <FormHelperText>Choose the season</FormHelperText>
        </FormControl>

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            select
            label="Select"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            helperText="Please select the year"
          >
            {Years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </div>

      <List data={seasonalList} />
    </div>
  );
}
