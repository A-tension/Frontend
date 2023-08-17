import React, { useState, useEffect } from "react";
import axios from "axios";
import InterceptedAxios from "../../../utils/iAxios";
import "./Emoji.css";
import passImage from "../../../assets/pass.png";
import chooseImage from "../../../assets/choose.png";

const Emoji = (props) => {
  const { display, toggleEmoji, sendEmoji, header, emoji, whoami, id } = props;

  // let emotions = [];
  const [emotions, setEmotions] = useState([]);
  const [items, setItems] = useState([]);

  const onClickEmotion = (emoji) => {
    toggleEmoji();
    sendEmoji(emoji);
  };

  useEffect(() => {
    if (display) {
      if (whoami === "teacher") {
        //선생님이면 모든 리액션
        setEmotions([
          "heart",
          "clap",
          "cry",
          "sweat",
          "laughing",
          "good",
          "fire",
          "100",
          "disappointed",
          "question",
        ]),
          setItems(["choose", "pass"]);
      } else {
        //학생이면 보유리액션
        InterceptedAxios.get(`/items/reaction/${id}`)
          .then(function (response) {
            setEmotions(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }, [display]);

  return (
    <div className="openModal reaction-wrapper">
      <div
        className={
          display
            ? "openModal reaction-modal reaction-setting-container"
            : "modal"
        }
      >
        {emotions.map((e, index) => {
          return (
            <img
              key={index}
              src={"../../public/reactions/" + e + ".gif"}
              onClick={() => {
                onClickEmotion(e);
              }}
            />
          );
        })}

        {items.map((i, index) => {
          return (
            <img
            key={index}
              src={"/src/assets/" + i + ".png"}
              onClick={() => {
                onClickEmotion(i);
              }}
            />
          );
        })}
 
      </div>
    </div>
  );
};

export default Emoji;
