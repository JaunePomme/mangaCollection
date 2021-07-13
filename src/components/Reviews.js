import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MemberReviewList from "./MemberReviewList";

export default function Reviews() {
  const [reviewList, setReviewList] = useState("");
  let location = useLocation();
  const type = location.state.type;
  const id = location.state.id;

  useEffect(() => {
    const search = async (type, id) => {
      try {
        let response = await axios.get(
          `https://api.jikan.moe/v3/${type}/${id}/reviews`
        );
        setReviewList(response.data.reviews);
        return reviewList;
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };
    search(type, id);
  }, [id, type, reviewList]);

  return <MemberReviewList reviewList={reviewList} />;
}
