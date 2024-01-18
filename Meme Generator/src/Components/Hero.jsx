import React from "react";

export default function Hero() {
  return (
    <main>
      <form className="form">
        <div className="form_div">
          <label className="form_label">Top text</label>
          <input type="text" placeholder="Shut up" className="form_input" />
        </div>
        <div className="form_div">
          <label className="form_label">Bottom text</label>
          <input
            type="text"
            placeholder="and take my money"
            className="form_input"
          />
        </div>
        <button className="form_button">Get a new meme image 🖼</button>
      </form>
    </main>
  );
}
