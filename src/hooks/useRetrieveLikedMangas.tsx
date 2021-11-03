import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { Collections } from "../components/FirestoreConstant.json";

export const useRetrieveLikedMangas = () => {
	const { currentUser } = useAuthentication();
	const [retrievedLikedMangas, setretrievedLikedMangas] = useState<string[]>(
		[]
	);

	useEffect(() => {
		if (currentUser) {
			const retrieveLikedMangaList = async (id: string) => {
				await firestore
					.collection(Collections.likedMangas)
					.doc(id)
					.collection(Collections.manga)
					.get()
					.then((querySnapshot) => {
						const newMangaList: string[] = [];
						querySnapshot.forEach((doc) => {
							newMangaList.push(doc.data().title);
						});
						setretrievedLikedMangas(newMangaList);
					})
					.catch((error) => {
						console.log("Error getting documents: ", error);
					});
			};

			retrieveLikedMangaList(currentUser.uid);
		}
	}, [currentUser]);
	return retrievedLikedMangas;
};
