import React, { useState } from "react";
import "../sass/SearchUser.css";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function SearchUser({ userList }) {
  const [filteredData, setFilteredData] = useState([]);
  const [inputWord, setInputWord] = useState("");

  const handleFilter = (e) => {
    setInputWord(e.target.value);
    const newFilter = userList.filter((value) => {
      return value.pseudo.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredData(newFilter);
  };

  const clearInput = () => {
    setFilteredData([]);
    setInputWord("");
  };

  return (
    <div className="searchuser-container">
      <div className="searchuser-bar">
        <label className="searchuser-label">
          Type a username to find his profile:
        </label>
        <input
          className="searchuser-input"
          type="text"
          placeholder="search user.."
          value={inputWord}
          onChange={handleFilter}
        />
        <CloseIcon className="closeicon" onClick={clearInput} />

        {filteredData.length !== 0 && (
          <div className="searchuser-data">
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
                  <button className="searchuser-user" href={value.link}>
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    {value.pseudo}
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
