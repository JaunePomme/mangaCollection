import React from "react";
import { MangaLikedCard } from "./MangaLikedCard";
import "../sass/MangaLikedList.css";
import { LikedDataStorage } from "./LikedList";

interface Props {
	likedData: LikedDataStorage[];
	idLookedFor: string;
}

export const MangaLikedList: React.FC<Props> = ({ likedData, idLookedFor }) => {
	return (
		<div className="likedList">
			{likedData &&
				likedData.map((item) => (
					<MangaLikedCard
						key={item.mal_id}
						item={item}
						idLookedFor={idLookedFor}
					/>
				))}
		</div>
	);
};
