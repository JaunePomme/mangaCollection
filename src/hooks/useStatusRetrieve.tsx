import { useEffect } from "react";
import { firestore } from "../firebase";
import { Props } from "./useScansRetrieve";

interface IProps extends Props {
	setInputStatus: React.Dispatch<React.SetStateAction<string>>;
}
export const useStatusRetrieve = (
	title: string,
	idLookedFor: string,
	setInputStatus: React.Dispatch<React.SetStateAction<string>>,
	firstCollection: string,
	secondCollection: string
) => {
	useEffect(() => {
		const statusRetrieve = ({
			title,
			idLookedFor,
			setInputStatus,
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
						const docstatus = doc.data();
						if (docstatus) {
							setInputStatus(docstatus.status);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};
		statusRetrieve({
			title,
			idLookedFor,
			setInputStatus,
			firstCollection,
			secondCollection,
		});
	}, [title, idLookedFor, setInputStatus, firstCollection, secondCollection]);
};
