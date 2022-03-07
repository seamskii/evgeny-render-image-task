import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [appData, setAppData] = useState([]);
  const [appArray, setAppArray] = useState([]);
  const [pictures, setPictures] = useState();
  const [information, setInformation] = useState();

  useEffect(() => {
    fetch("https://j0.wlmediahub.com/App_Themes/api/test/photos.js")
      .then((response) => response.json())
      .then((data) => {
        setAppData(data);
      });
    let arr = [];

    for (let i = 0; i < 5; i++) {
      let check = Math.floor(Math.random() * 500);
      arr.includes(check) ? i-- : (arr[i] = check);
    }
    setAppArray(arr);
  }, []);

  const handlePicturesButton = (index) => {
    setPictures(appData.photo[index].img);
    setInformation(appData.photo[index]);
  };
  const shuffle = () => {
    let arr2 = [];
    for (let i = 0; i < 5; i++) {
      let check = Math.floor(Math.random() * 500);
      appArray.includes(check) ? i-- : (arr2[i] = check);
    }

    setAppArray(arr2);
    setPictures(appData.photo[arr2[0]].img);
  };

  return (
    <div className="main-pictures">
      <div className="container">
        {pictures ? (
          <img className="img" src={pictures} />
        ) : (
          <div class="loader"></div>
        )}
        <div class="middle">
          {information && <div class="text">{information.title}</div>}
          {information && information.description && (
            <div class="text">{information.description}</div>
          )}
        </div>
      </div>
      <div>
        {appArray.map((index, key) => (
          <button
            className="list-button"
            onClick={() => {
              handlePicturesButton(index);
            }}
          >
            {key + 1}
          </button>
        ))}
      </div>
      <button
        className="pictures-button"
        onClick={() => {
          shuffle();
        }}
      >
        Shuffle
      </button>
    </div>
  );
};

export default App;
