import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LikedList } from "../components/LikedList";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import "../sass/Profile.css";
import { Collections } from "../components/FirestoreConstant.json";

interface Iparam {
	username: string;
}
export const Profile = () => {
	let { username } = useParams<Iparam>();
	const [idLookedFor, setIdLookedFor] = useState("");
	const [emailLookedFor, setEmailLookedFor] = useState("");
	const { currentUser } = useAuthentication();
	console.log("user uid: " + currentUser.uid);
	console.log("id: " + idLookedFor);
	useEffect(() => {
		const idRetrieve = async () => {
			let docRef = firestore.collection(Collections.users).doc(username);
			docRef
				.get()
				.then((doc) => {
					if (doc.exists) {
						const dataIdMail = doc.data();
						if (dataIdMail) {
							setIdLookedFor(dataIdMail.userId);
							setEmailLookedFor(dataIdMail.email);
						}
					} else {
						console.log("No such document");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		};

		idRetrieve();
	}, []);

	return (
		<div>
			<ul className="profile-container">
				<li>Profile of: {username}</li>
				<li>Email: {emailLookedFor}</li>
				{currentUser.uid === idLookedFor ? (
					<li>
						<Link to="/update-profile"> Update your profile</Link>
					</li>
				) : (
					""
				)}
			</ul>

			{idLookedFor && <LikedList idLookedFor={idLookedFor} />}
		</div>
	);
};
