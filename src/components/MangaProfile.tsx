import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../sass/MangaProfile.css";
import { Reviews } from "./Reviews";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { firestore } from "../firebase";
import { useRetrieveLikedAnimes } from "../hooks/useRetrieveLikedAnimes";
import { useRetrieveLikedMangas } from "../hooks/useRetrieveLikedMangas";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import { Fade } from "@material-ui/core";
import { Collections } from "./FirestoreConstant.json";
import { LikedDataStorage } from "./LikedList";
import { blue } from "@material-ui/core/colors";

const SlideTransition = (props: JSX.IntrinsicAttributes & SlideProps) => {
	return <Slide {...props} direction="up" />;
};

interface LocationState {
	data: LikedDataStorage;
	type: string;
	review: string;
	inputScoring: number;
}

export const MangaProfile = () => {
	let location = useLocation<LocationState>();
	const { currentUser } = useAuthentication();
	const { data, type, review, inputScoring } = location.state;
	const retrievedLikedAnimes: string[] = useRetrieveLikedAnimes();
	const retrievedLikedMangas: string[] = useRetrieveLikedMangas();
	const [like, setLike] = useState<boolean>(false);
	const image_url = data.images.jpg.image_url;
	const {
		mal_id,
		episodes,
		chapters,
		score,
		title,
		volumes,
		synopsis,
		members,
		rank,
		popularity,
		authors,
		title_japanese,
		background,
		genres,
	} = data;

	const [stateAlert, setStateAlert] = useState({
		open: false,
		Transition: Fade,
	});

	const handleClickAlert =
		(
			Transition: (props: JSX.IntrinsicAttributes & SlideProps) => JSX.Element
		) =>
		() => {
			setStateAlert({
				open: true,
				Transition,
			});
			if (type === "anime") handleAnimeLikeClick();
			if (type === "manga") handleMangaLikeClick();
		};

	const handleCloseAlert = () => {
		setStateAlert({
			...stateAlert,
			open: false,
		});
	};
	useEffect(() => {
		if (retrievedLikedMangas?.includes(title)) setLike(true);
		if (retrievedLikedAnimes?.includes(title)) setLike(true);
	}, [retrievedLikedAnimes, retrievedLikedMangas, title]);

	const handleMangaLikeClick = async () => {
		setLike(!like);
		if (currentUser) {
			let db = firestore
				.collection(Collections.likedMangas)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(title);

			if (like) {
				let dbe = firestore
					.collection(Collections.likedMangas)
					.doc(currentUser.uid)
					.collection(Collections.manga)
					.doc(title);
				return dbe
					.delete()
					.then(() => {
						console.log("Document removed!");
					})
					.catch((error) => {
						console.error("Error updating document: ", error);
					});
			}

			return db
				.set({
					...data,
					personalScore: "",
					status: "Plan",
				})
				.then(() => {
					console.log("Document added!");
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
		}
	};

	const handleAnimeLikeClick = async () => {
		setLike(!like);
		if (currentUser) {
			let db = firestore
				.collection(Collections.likedAnimes)
				.doc(currentUser.uid)
				.collection(Collections.anime)
				.doc(title);

			if (like) {
				let dbe = firestore
					.collection(Collections.likedAnimes)
					.doc(currentUser.uid)
					.collection(Collections.anime)
					.doc(title);
				return dbe
					.delete()
					.then(() => {
						console.log("Document removed!");
					})
					.catch((error) => {
						console.error("Error updating document: ", error);
					});
			}

			return db
				.set({
					...data,
					personalScore: "",
					status: "Plan",
				})
				.then(() => {
					console.log("Document added!");
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
		}
	};

	return (
		<ul className="mangaprofile-ul">
			{like && (
				<div className="profile-liked">
					<strong>This item is in the favorite list.</strong>
				</div>
			)}
			<div style={{ display: "flex", width: "800px" }}>
				<img src={image_url} alt={title} style={{ maxHeight: 500 }} />
				<article style={{ fontSize: "30px", marginLeft: "5px" }}>
					{title}

					<li
						style={{
							fontSize: "20px",
							color: "blanchedalmond",
							marginLeft: "5px",
						}}
					>
						{authors && authors[0] && authors[0].name}
					</li>
					<li>
						{currentUser ? (
							<Button
								type="button"
								onClick={handleClickAlert(SlideTransition)}
								variant="outlined"
								color="secondary"
							>
								{like ? "Unlike: " : "Like: "}
								{title}
							</Button>
						) : (
							""
						)}
					</li>
					<li style={{ fontSize: "20px", marginLeft: "5px" }}>
						MyAnimList Score: {score}
					</li>
					<li style={{ fontSize: "20px", marginLeft: "5px" }}>Rank: {rank}</li>
					<li style={{ fontSize: "20px", marginLeft: "5px" }}>
						Popularity : {popularity}
					</li>
					<li style={{ fontSize: "20px", marginLeft: "5px" }}>
						Genre:
						{genres &&
							genres.map((genre) => <ol key={genre.name}>{genre.name}</ol>)}
					</li>
					{type === "manga" ? (
						<li style={{ fontSize: "20px", marginLeft: "5px" }}>
							Chapters: {chapters} Volumes released: {volumes}
						</li>
					) : (
						<li style={{ fontSize: "20px", marginLeft: "5px" }}>
							Episodes: {episodes}
						</li>
					)}
					{/* <li style={{ fontSize: "20px", marginLeft: "5px" }}>
						{members} followers
					</li> */}
					{inputScoring ? (
						<li style={{ fontSize: "30px" }}>
							My personal score: {inputScoring}
						</li>
					) : (
						""
					)}
				</article>
			</div>
			<li
				style={{
					fontSize: "15px",
					margin: "5px",
					width: "800px",
					// borderWidth: " 1px",
					// borderColor: "white",
					// borderStyle: "solid",
				}}
			>
				{synopsis}
			</li>
			<li style={{ fontSize: "15px", margin: "5px", width: "800px" }}>
				Background : {background}
			</li>
			{review ? (
				<li
					className="mangaprofile-myreview"
					style={{ fontSize: "20px", margin: "5px", width: "800px" }}
				>
					My review: {review}
				</li>
			) : (
				""
			)}
			<li style={{ fontSize: "20px" }}>Japanese title: {title_japanese}</li>
			{like ? (
				<Snackbar
					open={stateAlert.open}
					onClose={handleCloseAlert}
					TransitionComponent={stateAlert.Transition}
					message={" will be added to your favorite list."}
					key={stateAlert.Transition.name}
				/>
			) : (
				<Snackbar
					open={stateAlert.open}
					onClose={handleCloseAlert}
					TransitionComponent={stateAlert.Transition}
					message={" will be removed from your favorite list."}
					key={stateAlert.Transition.name}
				/>
			)}
			Recommendations: <Reviews />
		</ul>
	);
};
