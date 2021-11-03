import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export const useRetrieveLikedAnimes = () => {
	const { currentUser } = useAuthentication();
	const [retrievedLikedAnimes, setretrievedLikedAnimes] = useState<string[]>(
		[]
	);

	useEffect(() => {
		if (currentUser) {
			const retrieveLikedAnimeList = async (id: string) => {
				await firestore
					.collection(Collections.likedAnimes)
					.doc(id)
					.collection(Collections.anime)
					.get()
					.then((querySnapshot) => {
						const newAnimeList: string[] = [];
						querySnapshot.forEach((doc) => {
							newAnimeList.push(doc.data().title);
						});
						setretrievedLikedAnimes(newAnimeList);
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			};
			retrieveLikedAnimeList(currentUser.uid);
		}
	}, [currentUser]);
	return retrievedLikedAnimes;
};
