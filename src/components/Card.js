import React from "react";

export default function Card({ item }) {
  return (
    <div className="card">
      {item.title}
      <img src={item.image_url} style={{ maxHeight: 500 }} alt={item.title} />
      {/* <div>
                    {item.start_date}
                </div>
                <a
        style={{ display: "table-cell" }}
        href=item.url
        target="_blank"
        rel="noopener noreferrer"
      >
       item.url
      </a>
                 */}
    </div>
  );
}
