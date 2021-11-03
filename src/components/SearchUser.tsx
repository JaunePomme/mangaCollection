import React, { useState } from "react";
import "../sass/SearchUser.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
	userList: User[];
}

export interface User {
	pseudo: string;
	userId: number;
	link: string;
}

export const SearchUser: React.FC<Props> = ({ userList }) => {
	const [filteredData, setFilteredData] = useState<User[]>([]);
	const [inputWord, setInputWord] = useState("");

	const handleFilter = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setInputWord(e.target.value);
		const newFilter = userList.filter((value) => {
			if (typeof e.target.value === "string")
				return value.pseudo
					.toLowerCase()
					.includes(e.target.value.toLowerCase());
			return "";
		});
		setFilteredData(newFilter);
	};

	return (
		<div className="searchuser-container">
			<div className="searchuser-bar">
				<label className="searchuser-label">
					Type a username to find his profile:
				</label>
				<input
					className="searchuser-input"
					type="text"
					placeholder="username.."
					value={inputWord}
					onChange={handleFilter}
				/>

				{filteredData.length !== 0 && (
					<div className="searchuser-data">
						{filteredData.map((value, key) => {
							return (
								<Link
									key={key}
									style={{ textDecoration: "none" }}
									to={{
										pathname: "profile/" + value.pseudo,
										state: { id: value.userId },
									}}
								>
									<button className="searchuser-user" ref={value.link}>
										<p className="searchuser-icon">
											<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
										</p>
										<p className="searchuser-username">{value.pseudo}</p>
									</button>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
