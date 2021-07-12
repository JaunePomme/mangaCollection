import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../sass/MangaProfile.css";
import Reviews from "./Reviews";

export default function MangaProfile() {
  let location = useLocation();

  const { data, like, type, review, inputScoring } = location.state;
  const {
    mal_id,
    episodes,
    chapters,
    image_url,
    score,
    title,
    volumes,
    synopsis,
    members,
  } = data;

  return (
    <ul className="manga-profile-ul">
      {like && (
        <div className="profile-liked">
          <strong>This item is in your favorite list.</strong>
          <FontAwesomeIcon icon={"user"}></FontAwesomeIcon>
        </div>
      )}

      <img src={image_url} alt={title} style={{ maxHeight: 500 }} />

      <li>Title: {title}</li>
      <li>ID of the item: {mal_id}</li>

      {type === "manga" ? (
        <li>Chapters: {chapters}</li>
      ) : (
        <li>Episodes: {episodes}</li>
      )}

      <li>MyAnimList Score: {score}</li>
      <li>My personal score: {inputScoring}</li>

      <li>Synopsis: {synopsis}</li>

      <li>Volumes released: {volumes}</li>

      <li>Members on myAnimList: {members}</li>
      <li>My review: {review}</li>

      <Reviews />
    </ul>
  );
}
