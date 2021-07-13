import React from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function NextPreviousPage({ page, setPage }) {
  return (
    <div className="btn-search-page">
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
  );
}
