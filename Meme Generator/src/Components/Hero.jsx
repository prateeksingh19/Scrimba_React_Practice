import React from "react";

export default function Hero() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMeme, setAllMeme] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMeme(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeUrl() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url1 = allMeme[randomNumber].url;
    setMeme((prev) => {
      return { ...prev, randomImage: url1 };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <div className="form_div">
          <label className="form_label">Top text</label>
          <input
            type="text"
            placeholder="Shut up"
            className="form_input"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className="form_div">
          <label className="form_label">Bottom text</label>
          <input
            type="text"
            placeholder="and take my money"
            className="form_input"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button className="form_button" onClick={getMemeUrl}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="memeImage" />
        <h2 className="memeText top">{meme.topText}</h2>
        <h2 className="memeText bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
