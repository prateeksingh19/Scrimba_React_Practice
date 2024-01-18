import React from "react";

export default function Hero() {
  return (
    <section>
      <img
        src="/src/assets/photo-grid.png"
        alt="AirBnB Photo Grid"
        className="hero_img"
      />
      <h1 className="hero_heading">Online Experiences</h1>
      <p className="hero_text">
        Join unique interactive activities led by one-of-a-kind hosts—all
        without leaving home.
      </p>
    </section>
  );
}
