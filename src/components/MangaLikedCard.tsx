import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthentication } from "../contexts/AuthenticationContext";
import "../sass/MangaLikedCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Collections } from "./FirestoreConstant.json";
import { useStatusRetrieve } from "../hooks/useStatusRetrieve";
import { useScansRetrieve } from "../hooks/useScansRetrieve";
import { useScoresRetrieve } from "../hooks/useScoresRetrieve";
import { useReviewsRetrieve } from "../hooks/useReviewsRetrieve";
import { ModalManga } from "./ModalManga";
import { LikedDataStorage } from "./LikedList";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	button: {},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
interface Props {
	item: LikedDataStorage;
	idLookedFor: string;
}

export const MangaLikedCard: React.FC<Props> = ({ item, idLookedFor }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [inputStatus, setInputStatus] = useState("Plan");
	const { currentUser } = useAuthentication();
	const [inputReview, setInputReview] = useState("?");
	const [inputScoring, setInputScoring] = useState(0);
	const [inputChapter, setInputChapter] = useState(0);
	const [stateAlert, setStateAlert] = useState({
		open: false,
		Transition: Fade,
	});

	const modalProps = {
		open,
		setOpen,
		inputStatus,
		setInputStatus,
		inputReview,
		setInputReview,
		inputScoring,
		setInputScoring,
		inputChapter,
		setInputChapter,
		stateAlert,
		setStateAlert,
		currentUser,
		classes,
		item,
	};

	useScoresRetrieve(
		item.title,
		idLookedFor,
		setInputScoring,
		Collections.likedMangas,
		Collections.manga
	);
	useScansRetrieve(
		item.title,
		idLookedFor,
		setInputChapter,
		Collections.scans,
		Collections.manga
	);
	useStatusRetrieve(
		item.title,
		idLookedFor,
		setInputStatus,
		Collections.likedMangas,
		Collections.manga
	);
	useReviewsRetrieve(
		item.title,
		idLookedFor,
		setInputReview,
		Collections.reviews,
		Collections.manga
	);

	const handleOpen = () => {
		setOpen(true);
		console.log("handle open reached");
	};

	return (
		<div>
			<div className="body-mangacard">
				<div>
					<ul className={`mangaLikedCard-ul ${inputStatus} `}>
						<li>
							<img
								className="manga-img"
								src={item.image_url}
								alt={item.title}
								style={{ height: 150, width: 100 }}
							/>
							<div className="manga-overlay">
								<Link
									to={{
										pathname:
											"/manga-profile/" + item.title + "/" + item.mal_id,
										state: {
											data: item,
											type: "manga",
											review: inputReview,
											inputScoring: inputScoring,
											id: item.mal_id,
										},
									}}
								>
									<button className="btn-manga-seemore">See more</button>
								</Link>
							</div>
						</li>
						<div className="manga-info">
							<li className="manga-title">
								<strong>{item.title}</strong>
							</li>
							<li className="manga-score">MyAnimList score: {item.score}/10</li>
							<li className="manga-inputscoring">
								My score:<strong> {inputScoring}/10</strong>
							</li>
							<li className="manga-chapters">
								Reading:
								<strong>
									{inputChapter}/{item.chapters}
								</strong>
							</li>
						</div>
						<li className="manga-update">
							{currentUser && currentUser.uid !== idLookedFor ? (
								""
							) : (
								<button
									type="button"
									className="manga-update-btn"
									onClick={handleOpen}
								>
									<FontAwesomeIcon icon={faEdit} />
								</button>
							)}
						</li>
					</ul>
					<ModalManga {...modalProps} />
				</div>
			</div>
		</div>
	);
};
