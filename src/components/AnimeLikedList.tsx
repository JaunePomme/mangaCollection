import React from "react";
import { AnimeLikedCard } from "./AnimeLikedCard";
import "../sass/MangaLikedList.css";
import { LikedDataStorage } from "./LikedList";

interface Props {
	likedData: LikedDataStorage[];
	idLookedFor: string;
}

export const AnimeLikedList: React.FC<Props> = ({ likedData, idLookedFor }) => {
	return (
		<div className="likedList">
			{likedData &&
				likedData.map((item) => (
					<AnimeLikedCard
						key={item.mal_id}
						item={item}
						idLookedFor={idLookedFor}
					/>
				))}
		</div>
	);
};
