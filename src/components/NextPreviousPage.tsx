import React from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../sass/NextPreviousPage.css";

interface Props {
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const NextPreviousPage: React.FC<Props> = ({ page, setPage }) => {
	return (
		<div className="btn-page">
			{page > 1 && (
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setPage((page: number) => page - 1);
					}}
				>
					<FontAwesomeIcon style={{ marginRight: 5 }} icon={faArrowLeft} />
					Previous Page
				</Button>
			)}
			<div className="btn-next-page">
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setPage((page: number) => page + 1);
					}}
				>
					Next Page
					<FontAwesomeIcon style={{ marginLeft: 5 }} icon={faArrowRight} />
				</Button>
			</div>
		</div>
	);
};
