import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import SearchUser from "./SearchUser";

export default function FirebaseReviews() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const retrieveUser = () => {
      firestore
        .collection("users")
        .get()
        .then((querySnapshot) => {
          const newUserList = [];
          querySnapshot.forEach((doc) => {
            newUserList.push(doc.data());
          });
          setUserList(newUserList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    retrieveUser();
  }, []);

  return <SearchUser userList={userList} setUserList={setUserList} />;
}
