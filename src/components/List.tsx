import React from "react";
import { Card } from "./Card";
import "../sass/List.css";
import { ItemStorage } from "./Seasonal";

interface Props {
	data: ItemStorage[];
	type?: string;
	retrievedLikedAnimes?: string[];
	retrievedLikedMangas?: string[];
}

export const List: React.FC<Props> = ({
	data,
	type,
	retrievedLikedAnimes,
	retrievedLikedMangas,
}) => {
	return (
		<div className="list">
			{data &&
				data.map((item) => (
					<Card
						key={item.mal_id}
						item={item}
						type={type}
						retrievedLikedAnimes={retrievedLikedAnimes}
						retrievedLikedMangas={retrievedLikedMangas}
					/>
				))}
		</div>
	);
};
