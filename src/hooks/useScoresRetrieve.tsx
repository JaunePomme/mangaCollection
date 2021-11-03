import { useEffect } from "react";
import { firestore } from "../firebase";
import { Props } from "./useScansRetrieve";

interface IProps extends Props {
	setInputScoring: React.Dispatch<React.SetStateAction<number>>;
}
export const useScoresRetrieve = (
	title: string,
	idLookedFor: string,
	setInputScoring: React.Dispatch<React.SetStateAction<number>>,
	firstCollection: string,
	secondCollection: string
) => {
	useEffect(() => {
		const scoresRetrieve = ({
			title,
			idLookedFor,
			setInputScoring,
			firstCollection,
			secondCollection,
		}: IProps) => {
			let docRef = firestore
				.collection(firstCollection)
				.doc(idLookedFor)
				.collection(secondCollection)
				.doc(title);
			docRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const docscore = doc.data();
						if (docscore) {
							setInputScoring(docscore.personalScore);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};
		scoresRetrieve({
			title,
			idLookedFor,
			setInputScoring,
			firstCollection,
			secondCollection,
		});
	}, [title, idLookedFor, setInputScoring, firstCollection, secondCollection]);
};
