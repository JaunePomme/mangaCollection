import React from "react";
import { FadeProps, Modal } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/NativeSelect";
import { firestore } from "../firebase";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ValuesForScoring from "./ValuesForScoring.json";
import "../sass/AnimeLikedCard.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Slide, { SlideProps } from "@material-ui/core/Slide";
import { Collections } from "./FirestoreConstant.json";
import { ClassNameMap } from "@material-ui/styles";
import { LikedDataStorage } from "./LikedList";
import firebase from "firebase";

const SlideTransition = (props: JSX.IntrinsicAttributes & SlideProps) => {
	return <Slide {...props} direction="up" />;
};
interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	inputStatus: string;
	setInputStatus: React.Dispatch<React.SetStateAction<string>>;
	inputReview: string;
	setInputReview: React.Dispatch<React.SetStateAction<string>>;
	inputScoring: number;
	setInputScoring: React.Dispatch<React.SetStateAction<number>>;
	stateAlert: { open: boolean; Transition: (props: FadeProps) => JSX.Element };
	setStateAlert: React.Dispatch<
		React.SetStateAction<{
			open: boolean;
			Transition: (props: FadeProps) => JSX.Element;
		}>
	>;
	currentUser: firebase.User | null;
	classes: ClassNameMap<
		"modal" | "paper" | "formControl" | "selectEmpty" | "button"
	>;
	item: LikedDataStorage;
	inputChapter: number;
	setInputChapter: React.Dispatch<React.SetStateAction<number>>;
}
export const ModalManga: React.FC<Props> = ({
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
}) => {
	const handleClickAlert =
		(
			Transition: (props: JSX.IntrinsicAttributes & SlideProps) => JSX.Element
		) =>
		() => {
			setStateAlert({
				open: true,
				Transition,
			});
			dislike();
		};

	const handleCloseAlert = () => {
		setStateAlert({
			...stateAlert,
			open: false,
		});
	};

	const handleClose = () => {
		setOpen(false);
		console.log("handle close");
	};

	const handleSave = () => {
		if (currentUser) {
			let batch = firestore.batch();

			let statusRef = firestore
				.collection(Collections.likedMangas)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(item.title);
			batch.update(statusRef, { status: inputStatus });

			let scansRef = firestore
				.collection(Collections.scans)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(item.title);
			if (inputChapter != null) batch.set(scansRef, { chapter: inputChapter });
			if (inputStatus === "Completed") {
				if (item.chapters != null) {
					setInputChapter(item.chapters);
					batch.set(scansRef, { chapter: item.chapters });
				}
			}

			batch
				.commit()
				.then(() => {
					console.log("Document added!");
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
			handleClose();
		}
	};

	const handleReviewAndScore = () => {
		console.log("dans handleReview");
		if (currentUser) {
			let batch = firestore.batch();

			let reviewsRef = firestore
				.collection(Collections.reviews)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(item.title);
			batch.set(reviewsRef, { review: inputReview });

			let scoresRef = firestore
				.collection(Collections.likedMangas)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(item.title);
			batch.update(scoresRef, { personalScore: inputScoring });

			batch
				.commit()
				.then(() => {
					console.log("Document added!");
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
		}
	};

	const dislike = async () => {
		if (currentUser) {
			await firestore
				.collection(Collections.likedMangas)
				.doc(currentUser.uid)
				.collection(Collections.manga)
				.doc(item.title)
				.delete()
				.then(() => {
					console.log("Document removed!");
				})
				.catch((error) => {
					console.error("Error updating document: ", error);
				});
		}
	};

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id="transition-modal-title">Update: {item.title}</h2>
						<p id="transition-modal-description">
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor="manga-status">Status</InputLabel>
								<Select
									value={inputStatus}
									onChange={(event) => {
										setInputStatus(event.target.value);
									}}
									inputProps={{
										name: "status",
									}}
								>
									<option value={"Plan"}>Plan to read</option>
									<option value={"Ongoing"}>OnGoing</option>
									<option value={"Completed"}>Completed</option>
								</Select>
							</FormControl>
							<div>
								Chapters read:{" "}
								{inputStatus === "Completed" ? (
									item.chapters
								) : (
									<input
										type="number"
										min="0"
										step="1"
										value={inputChapter}
										onChange={(e) => {
											if (typeof parseInt(e.target.value) === "number")
												setInputChapter(parseInt(e.target.value));
										}}
										placeholder={"0"}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												handleSave();
											}
										}}
									></input>
								)}
								/{item.chapters}
							</div>
						</p>

						<TextField
							id="outlined-select-scoring"
							select
							label="Select"
							value={inputScoring}
							onChange={(e) => {
								if (typeof e.target.value === "number")
									setInputScoring(e.target.value);
							}}
							helperText="Please select your scoring"
						>
							{ValuesForScoring.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<h3 id="transition-modal-title">Write your review:</h3>
						<p id="transition-modal-description">
							<TextareaAutosize
								aria-label="minimum height"
								rowsMin={6}
								rowsMax={10}
								onChange={(e) => setInputReview(e.target.value)}
								value={inputReview}
								placeholder="Write here..."
							/>

							<div>
								<Button
									type="button"
									onClick={() => {
										handleReviewAndScore();
										handleSave();
									}}
									className={classes.button}
									variant="outlined"
									color="primary"
								>
									Save modifications
								</Button>

								<Button
									type="button"
									onClick={handleClickAlert(SlideTransition)}
									className={classes.button}
									variant="outlined"
									color="secondary"
								>
									Unlike
								</Button>
								<Snackbar
									open={stateAlert.open}
									onClose={handleCloseAlert}
									TransitionComponent={stateAlert.Transition}
									message={
										item.title + " will be removed from your favorite list."
									}
									key={stateAlert.Transition.name}
								/>
							</div>
						</p>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};
