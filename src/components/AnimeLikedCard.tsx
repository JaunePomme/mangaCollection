import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAuthentication } from "../contexts/AuthenticationContext";
import "../sass/AnimeLikedCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Collections } from "./FirestoreConstant.json";
import { useStatusRetrieve } from "../hooks/useStatusRetrieve";
import { useEpisodesRetrieve } from "../hooks/useEpisodesRetrieve";
import { useScoresRetrieve } from "../hooks/useScoresRetrieve";
import { useReviewsRetrieve } from "../hooks/useReviewsRetrieve";
import { ModalAnime } from "./ModalAnime";
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
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	button: {},
}));

interface Props {
	item: LikedDataStorage;
	idLookedFor: string;
}

export const AnimeLikedCard: React.FC<Props> = ({ item, idLookedFor }) => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const [inputStatus, setInputStatus] = useState("Plan");
	const { currentUser } = useAuthentication();
	const [inputReview, setInputReview] = useState("?");
	const [inputScoring, setInputScoring] = useState(0);
	const [inputEpisode, setInputEpisode] = useState(0);
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
		inputEpisode,
		setInputEpisode,
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
		Collections.likedAnimes,
		Collections.anime
	);
	useEpisodesRetrieve(
		item.title,
		idLookedFor,
		setInputEpisode,
		Collections.episodes,
		Collections.anime
	);
	useStatusRetrieve(
		item.title,
		idLookedFor,
		setInputStatus,
		Collections.likedAnimes,
		Collections.anime
	);
	useReviewsRetrieve(
		item.title,
		idLookedFor,
		setInputReview,
		Collections.reviews,
		Collections.anime
	);

	const handleSeeMore = (searchDataItem: LikedDataStorage) => {
		console.log(searchDataItem);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	return (
		<div>
			<div>
				<div>
					<ul className={`animeLikedCard-ul ${inputStatus} `}>
						<li>
							<img
								className="anime-img"
								src={item.images.jpg.image_url}
								alt={item.title}
							/>
							<div className="anime-overlay">
								<Link
									to={{
										pathname:
											"/manga-profile/" + item.title + "/" + item.mal_id,
										state: {
											data: item,
											type: "anime",
											review: inputReview,
											inputScoring: inputScoring,
											id: item.mal_id,
										},
									}}
								>
									<button
										className="btn-anime-seemore"
										onClick={() => handleSeeMore(item)}
									>
										See more
									</button>
								</Link>
							</div>
						</li>
						<div className="anime-info">
							<li className="anime-title">
								<strong>{item.title}</strong>
							</li>
							<li className="anime-inputscoring">
								My score:<strong>{inputScoring}/10</strong>
							</li>
							<li className="anime-score">
								{" "}
								MyAnimList score: {item.score}/10
							</li>
							<li className="anime-episodes">
								Watching:{" "}
								<strong>
									{inputEpisode}/{item.episodes}
								</strong>
							</li>
						</div>

						<li className="anime-update">
							{currentUser && currentUser.uid !== idLookedFor ? (
								""
							) : (
								<button
									type="button"
									className="anime-update-btn"
									onClick={handleOpen}
								>
									<FontAwesomeIcon icon={faEdit} />
								</button>
							)}
						</li>
					</ul>
					<ModalAnime {...modalProps} />
				</div>
			</div>
		</div>
	);
};
