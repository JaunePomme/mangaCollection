import React from "react";
import '../sass/Card.css'

export default function Card({ item }) {
  return (
    <ul className="card">
      <img
      className='card-img'
        src={item.image_url}
        style={{ minHeight:400, maxHeight: 400 }}
        alt={item.title}
        loading="lazy"
      />
      <div className="card-overlay">
        <li>{item.title}</li>
        <li>
          <a
            style={{ display: "table-cell", textDecoration: "none" }}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            More on MyAnimList
          </a>
        </li>
      </div>
    </ul>
  );
}
