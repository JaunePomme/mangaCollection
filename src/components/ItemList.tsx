import React from "react";
import { ItemCard } from "./ItemCard";
import "../sass/ItemList.css";
import { SearchedData } from "./MainSearch";

interface Props {
	searchData: SearchedData[];
	category: string;
	retrievedLikedMangas: string[];
	retrievedLikedAnimes: string[];
}

export const ItemList: React.FC<Props> = ({
	searchData,
	category,
	retrievedLikedMangas,
	retrievedLikedAnimes,
}) => {
	return (
		<div className="manga-grid">
			{searchData.map((searchDataItem) => (
				<ItemCard
					key={searchDataItem.mal_id}
					searchDataItem={searchDataItem}
					category={category}
					retrievedLikedMangas={retrievedLikedMangas}
					retrievedLikedAnimes={retrievedLikedAnimes}
				/>
			))}
		</div>
	);
};
