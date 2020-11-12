import React, { useState, useEffect } from "react";
import "../Styles/Select.css";
import MemePreview from "../Components/MemePreview";
import Generator from "../Screens/Generator";

function Select() {
  const [memes, setMemes] = useState();
  const [template, setTemplate] = useState();

  const loadMemes = () => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        setMemes(response.data.memes);
      });
  };

  useEffect(() => {
    loadMemes();
  }, []);

  return (
    <>
      <h1 className="title" id="top">
        Meme Machine
      </h1>
      {template ? (
        <Generator
          className="generator"
          meme={template}
          changeMeme={setTemplate}
        />
      ) : null}
      <section className="selectScreen">
        {memes ? (
          memes.map((element, index) => (
            <a
              key={index}
              href="#top"
              onClick={() => {
                setTemplate(element);
              }}
            >
              <MemePreview element={element} />
            </a>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
}

export default Select;
