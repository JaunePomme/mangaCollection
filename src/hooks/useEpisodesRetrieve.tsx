import { useEffect } from "react";
import { firestore } from "../firebase";
import { Props } from "./useScansRetrieve";

interface IProps extends Props {
	setInputEpisode: React.Dispatch<React.SetStateAction<number>>;
}

export const useEpisodesRetrieve = (
	title: string,
	idLookedFor: string,
	setInputEpisode: React.Dispatch<React.SetStateAction<number>>,
	firstCollection: string,
	secondCollection: string
) => {
	useEffect(() => {
		const episodesRetrieve = ({
			title,
			idLookedFor,
			setInputEpisode,
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
						const docepisode = doc.data();
						if (docepisode) {
							setInputEpisode(docepisode.episode);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};
		episodesRetrieve({
			title,
			idLookedFor,
			setInputEpisode,
			firstCollection,
			secondCollection,
		});
	}, [title, idLookedFor, setInputEpisode, firstCollection, secondCollection]);
};
