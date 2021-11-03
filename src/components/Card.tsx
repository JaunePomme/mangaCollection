import React, { useState, useEffect } from "react";
import "../sass/Card.css";
import { ItemStorage } from "./Seasonal";

interface Props {
	item: ItemStorage;
	type?: string;
	retrievedLikedAnimes?: string[];
	retrievedLikedMangas?: string[];
}

export const Card: React.FC<Props> = ({
	item,
	type,
	retrievedLikedAnimes,
	retrievedLikedMangas,
}) => {
	const [like, setLike] = useState(false);

	useEffect(() => {
		if (retrievedLikedMangas?.includes(item.title)) setLike(true);
		if (retrievedLikedAnimes?.includes(item.title)) setLike(true);
	}, [retrievedLikedAnimes, retrievedLikedMangas, item.title]);

	return (
		<ul className="card">
			<img
				className="card-img"
				src={item.image_url}
				alt={item.title}
				loading="lazy"
			/>
			<div className="card-overlay">
				<h4>{item.title}</h4>
				{item.rank ? <h5>Rank: {item.rank}</h5> : ""}
				<h5>Score: {item.score}</h5>

				<h5>
					{item.url ? (
						<a
							className="card-url"
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							More on myAnimeList..
						</a>
					) : (
						<a
							className="card-no-url"
							href={"https://myanimelist.net/" + type + "/" + item.mal_id}
							target="_blank"
							rel="noopener noreferrer"
						>
							More on myAnimeList..
						</a>
					)}
				</h5>
			</div>
		</ul>
	);
};
