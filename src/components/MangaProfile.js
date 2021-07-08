import React from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MangaProfile.css";
import Reviews from "./Reviews";

export default function MangaProfile() {
  let location = useLocation();

  const { data, like } = location.state;
  const {
    mal_id,
    episodes,
    chapters,
    image_url,
    score,
    title,
    url,
    volumes,
    synopsis,
    members,
  } = data;

  return (
    <ul className="container">
      {like && (
        <div className="profile-liked">
          <strong>This item is in your favorite list.</strong>
          <FontAwesomeIcon icon={"user"}></FontAwesomeIcon>
        </div>
      )}

      <img src={image_url} alt={title} style={{ maxHeight: 500 }} />

      <li>Title: {title}</li>
      <li>ID of the item: {mal_id}</li>

      <li>Chapters: {chapters}</li>
      <li>Episodes: {episodes}</li>

      <li>Score: {score}</li>

      <li>Synopsis: {synopsis}</li>

      <li>Volumes released: {volumes}</li>

      <li>url to myAnimList: {url}</li>

      <li>Members on myAnimList: {members}</li>

      <Reviews />
    </ul>
  );
}
