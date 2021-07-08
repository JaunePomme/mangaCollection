import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";

export default function About() {
  return (
    <div>
      <div>
        <strong>
          <p>
            I used HTML, CSS, JS(ES6, REACT) in order to make this website. For
            the database, I used Firebase (Authentication, Firestore, Hosting).
          </p>
          <p>
            Here is the link to my github if you want to check out the code.
          </p>
          <p>Best regards, Alex.</p>
        </strong>
      </div>
      <a
        style={{ display: "table-cell" }}
        href="https://github.com/JaunePomme/mangaCollection"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} />
        Github repository
      </a>

      <p>
        You can contact me <FontAwesomeIcon icon={faAt} /> alexredon75@gmail.com
      </p>
    </div>
  );
}
