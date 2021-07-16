import React from "react";
import { firestore } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDownAlt,
  faSortNumericUpAlt,
} from "@fortawesome/free-solid-svg-icons";
import "../sass/Sorting.css";

export default function Sorting({
  setLikedAnimesData,
  setLikedMangasData,
  idLookedFor,
}) {
  const handleSortByScoreDesc = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("score", "desc")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("score", "desc")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleSortByScore = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("score")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("score")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleSortByPersonalScore = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      // .where("score", "==", 15)
      .orderBy("personalScore")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("personalScore")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleSortByPersonalScoreDesc = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("personalScore", "desc")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("personalScore", "desc")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleSort = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("title")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("title")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleReverseSort = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("title", "desc")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("title", "desc")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const handleCompletedStatus = () => {
    firestore
      .collection("likedMangas")
      .doc(idLookedFor)
      .collection("manga")
      .orderBy("status")
      .get()
      .then((querySnapshot) => {
        const newMangaList = [];
        querySnapshot.forEach((doc) => {
          newMangaList.push(doc.data());
        });
        setLikedMangasData(newMangaList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    firestore
      .collection("likedAnimes")
      .doc(idLookedFor)
      .collection("anime")
      .orderBy("status")
      .get()
      .then((querySnapshot) => {
        const newAnimeList = [];
        querySnapshot.forEach((doc) => {
          newAnimeList.push(doc.data());
        });
        setLikedAnimesData(newAnimeList);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <div className="sorting-container">
      <button type="button" onClick={handleSortByScoreDesc}>
        MyAnimList score
        <FontAwesomeIcon icon={faSortNumericDownAlt} />
      </button>
      <button type="button" onClick={handleSortByScore}>
        MyAnimeList score
        <FontAwesomeIcon icon={faSortNumericUpAlt} />
      </button>
      <button type="button" onClick={handleSortByPersonalScoreDesc}>
        My score
        <FontAwesomeIcon icon={faSortNumericDownAlt} />
      </button>
      <button type="button" onClick={handleSortByPersonalScore}>
        My score
        <FontAwesomeIcon icon={faSortNumericUpAlt} />
      </button>
      <button type="button" onClick={handleSort}>
        <FontAwesomeIcon icon={faSortAlphaDown} />
      </button>
      <button type="button" onClick={handleReverseSort}>
        <FontAwesomeIcon icon={faSortAlphaUp} />
      </button>
      <button type="button" onClick={handleCompletedStatus}>
        Completed
        <FontAwesomeIcon icon={faCheckSquare} />
      </button>
    </div>
  );
}
