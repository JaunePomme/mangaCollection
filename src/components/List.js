import React from "react";
import Card from "./Card";
import '../sass/List.css';

export default function List({ data }) {
  return (
    <div className="list">
      {data && data.map((item) => <Card key={item.mal_id} item={item} />)}
    </div>
  );
}
