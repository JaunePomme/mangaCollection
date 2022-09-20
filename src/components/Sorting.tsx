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
import { Collections, OrderBy } from "./FirestoreConstant.json";
import { LikedDataStorage } from "./LikedList";

interface Props {
	setLikedAnimesData: React.Dispatch<React.SetStateAction<LikedDataStorage[]>>;
	setLikedMangasData: React.Dispatch<React.SetStateAction<LikedDataStorage[]>>;
	idLookedFor: string;
}

export const Sorting: React.FC<Props> = ({
	setLikedAnimesData,
	setLikedMangasData,
	idLookedFor,
}) => {
	const handleSortByScoreDesc = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.score, "desc")
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					if (doc) newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.score, "desc")
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleSortByScore = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.score)
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.score)
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleSortByPersonalScore = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.personalScore)
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.personalScore)
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleSortByPersonalScoreDesc = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.personalScore, "desc")
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.personalScore, "desc")
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleSort = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.title)
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.title)
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleReverseSort = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.title, "desc")
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.title, "desc")
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
				});
				setLikedAnimesData(newAnimeList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
	};

	const handleCompletedStatus = () => {
		firestore
			.collection(Collections.likedMangas)
			.doc(idLookedFor)
			.collection(Collections.manga)
			.orderBy(OrderBy.status)
			.get()
			.then((querySnapshot) => {
				const newMangaList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newMangaList.push(doc.data() as LikedDataStorage);
				});
				setLikedMangasData(newMangaList);
			})
			.catch((error) => {
				console.log("Error getting documents: ", error);
			});
		firestore
			.collection(Collections.likedAnimes)
			.doc(idLookedFor)
			.collection(Collections.anime)
			.orderBy(OrderBy.status)
			.get()
			.then((querySnapshot) => {
				const newAnimeList: LikedDataStorage[] = [];
				querySnapshot.forEach((doc) => {
					newAnimeList.push(doc.data() as LikedDataStorage);
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
};
