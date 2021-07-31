import { faGithub } from "@fortawesome/free-brands-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../sass/About.css";

export default function About() {
  return (
    <div className="about-center">
      <div className="about-container">
        <span className="about-txt">
          <p>
            I used HTML, CSS(SASS), JS(ES6, REACT) in order to make this
            website. For the database, I used Firebase (Authentication,
            Firestore, Hosting).
          </p>
        </span>
        <p className="about-sign">Best regards, Alex.</p>

        <p className="about-github">
          Here is the link to my github if you want to check out the code.
          <a
            className="about-link"
            href="https://github.com/JaunePomme/mangaCollection"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
            Github repository
          </a>
        </p>

        <p className="about-contact">alexredon75@gmail.com</p>
      </div>
    </div>
  );
}
