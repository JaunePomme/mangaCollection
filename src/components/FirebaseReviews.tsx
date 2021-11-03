import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { SearchUser, User } from "./SearchUser";
import { Collections } from "./FirestoreConstant.json";

export const FirebaseReviews = () => {
	const [userList, setUserList] = useState<User[]>([]);

	useEffect(() => {
		const retrieveUser = async (): Promise<void> => {
			firestore
				.collection(Collections.users)
				.get()
				.then((querySnapshot) => {
					const newUserList: User[] = [];
					querySnapshot.forEach((doc) => {
						newUserList.push(doc.data() as User);
					});
					setUserList(newUserList);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
				});
		};

		retrieveUser();
	}, []);

	return <SearchUser userList={userList} />;
};
