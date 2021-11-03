import { useEffect } from "react";
import { firestore } from "../firebase";

export interface Props {
	title: string;
	idLookedFor: string;
	firstCollection: string;
	secondCollection: string;
}

export const useScansRetrieve = (
	title: string,
	idLookedFor: string,
	setInputChapter: React.Dispatch<React.SetStateAction<number>>,
	firstCollection: string,
	secondCollection: string
) => {
	useEffect(() => {
		const scansRetrieve = (
			title: string,
			idLookedFor: string,
			setInputChapter: React.Dispatch<React.SetStateAction<number>>,
			firstCollection: string,
			secondCollection: string
		) => {
			let docRef = firestore
				.collection(firstCollection)
				.doc(idLookedFor)
				.collection(secondCollection)
				.doc(title);
			docRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const docchapter = doc.data();
						if (docchapter) {
							setInputChapter(docchapter.chapter);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};
		scansRetrieve(
			title,
			idLookedFor,
			setInputChapter,
			firstCollection,
			secondCollection
		);
	}, [title, idLookedFor, setInputChapter, firstCollection, secondCollection]);
};
