import React, { useState } from "react";
import "../sass/SearchUser.css";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchUser({ pseudoList }) {
  const [filteredData, setFilteredData] = useState([]);
  const [inputWord, setInputWord] = useState("");

  const handleFilter = (e) => {
    setInputWord(e.target.value);
    const newFilter = pseudoList.filter((value) => {
      return value.pseudo.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData([]);
    setInputWord("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="search"
          value={inputWord}
          onChange={handleFilter}
        />

        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>

      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            return (
              <Link
                key={key}
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "profile/" + value.pseudo,
                  state: { id: value.userId },
                }}
              >
                <button className="dataItem" key={key} href={value.link}>
                  <FontAwesomeIcon icon={"user"}></FontAwesomeIcon>
                  <p>{value.pseudo} </p>
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
