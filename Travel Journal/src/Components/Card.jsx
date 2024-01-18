import React from "react";

export default function Card(props) {
  return (
    <div className="card">
      <img src={props.coverImg} className="card_img" />
      <div className="card_content">
        <div className="card_stats">
          <img
            src="/src/assets/marker.png"
            alt="Marker Logo"
            className="card_marker"
          />
          <span className="card_location">{props.location}</span>
          <span className="gray">View on Google Maps</span>
        </div>
        <p className="card_title">{props.title}</p>
        <p className="card_date">{props.date}</p>
        <p className="card_description">{props.description}</p>
      </div>
    </div>
  );
}
