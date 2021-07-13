import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import SearchUser from "./SearchUser";

export default function FirebaseReviews() {
  const [pseudoList, setPseudoList] = useState([]);

  useEffect(() => {
    const handleRetrievePseudo = () => {
      firestore
        .collection("users")
        .get()
        .then((querySnapshot) => {
          const newPseudoList = [];
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            newPseudoList.push(doc.data());
          });
          setPseudoList(newPseudoList);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    handleRetrievePseudo();
  }, []);

  return <SearchUser pseudoList={pseudoList} setPseudoList={setPseudoList} />;
}
