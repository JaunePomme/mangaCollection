import { useEffect } from "react";
import { firestore } from "../firebase";
import { Props } from "./useScansRetrieve";

interface IProps extends Props {
	setInputReview: React.Dispatch<React.SetStateAction<string>>;
}

export const useReviewsRetrieve = (
	title: string,
	idLookedFor: string,
	setInputReview: React.Dispatch<React.SetStateAction<string>>,
	firstCollection: string,
	secondCollection: string
) => {
	useEffect(() => {
		const reviewsRetrieve = ({
			title,
			idLookedFor,
			setInputReview,
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
						const docreview = doc.data();
						if (docreview) {
							setInputReview(docreview.review);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};
		reviewsRetrieve({
			title,
			idLookedFor,
			setInputReview,
			firstCollection,
			secondCollection,
		});
	}, [title, idLookedFor, setInputReview, firstCollection, secondCollection]);
};
