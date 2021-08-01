import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import List from "./List";
import "../sass/Seasonal.css";
import Years from "./Years.json";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginLeft: 10,
    color: "#fafafa",
    "&:before": {
      borderColor: "#fafafa",
    },
    "&:after": {
      borderColor: "#fafafa",
    },
  },
  icon: {
    fill: "#fafafa",
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
          <Select
            value={inputSeason}
            onChange={(e) => setInputSeason(e.target.value)}
            className={classes.selectEmpty}
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            <MenuItem value={"summer"}>Summer</MenuItem>
            <MenuItem value={"fall"}>Fall</MenuItem>
            <MenuItem value={"winter"}>Winter</MenuItem>
            <MenuItem value={"spring"}>Spring</MenuItem>
          </Select>
          <FormHelperText className={classes.selectEmpty}>
            Choose the season
          </FormHelperText>
        </FormControl>
        <form className={classes.formControl} noValidate autoComplete="off">
          <Select
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            className={classes.selectEmpty}
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
          >
            {Years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText className={classes.selectEmpty}>
            Choose the year
          </FormHelperText>
        </form>
      </div>

      <List data={seasonalList} />
    </div>
  );
}
