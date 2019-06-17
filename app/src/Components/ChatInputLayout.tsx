import React, { useState, useEffect } from "react";
import { socket } from "../Dao/VideoChatDao";
export default function ChatInputLayout() {
  const [message, setMessage] = React.useState();
  const [emojiClassName, setEmojiClassName] = useState("emoji confused-emoji");
  const [emotion, setEmotion] = useState("happy");
  let isMounted = false;
  React.useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      socket.on("toneAnalysed", data => {
        console.log(data.document_tone.tones);
        console.log(data.document_tone.tones.length);
        console.log(JSON.stringify(data.document_tone.tones));
        if (data.document_tone.tones.length > 0) {
          switch (data.document_tone.tones[0].tone_id) {
            case "sadness":
              setEmojiClassName("emoji sad-emoji");
              break;

            case "joy":
              setEmojiClassName("emoji happy-emoji");
              break;
            case "anger":
              setEmojiClassName("emoji angry-emoji");
              break;
            case "fear":
              setEmojiClassName("emoji scared-emoji");
              break;
            default:
              setEmojiClassName("emoji confused-emoji");
              break;
          }
        } else {
          setEmojiClassName("emoji confused-emoji");
        }
      });
    }
  }, []);
  //   const getEmotion = async () => {
  //     const value = socket.emit("getToneAnalysis", message);

  //     console.log(value);
  //     return "happy";
  //    };
  const getEmoji = async () => {
    await socket.emit("getToneAnalysis", message);

    // console.log(emotion);
    // switch (emotion) {
    //   case "sad":
    //     setEmojiClassName("emoji sad-emoji");
    //     break;

    //   case "happy":
    //     setEmojiClassName("emoji happy-emoji");
    //     break;
    //   case "angry":
    //     setEmojiClassName("emoji angry-emoji");
    //     break;
    //   default:
    //     setEmojiClassName("emoji confused-emoji");
    //     break;
  };
  //     return <img className="emoji sad-emoji" />;
  //   };
  return (
    <div className="chat-input-layout">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="message"
          onChange={async e => {
            setMessage(e.target.value);
            getEmoji();
          }}
        />
        <div className="input-group-append">
          <label className="input-group-text ">
            <img className={emojiClassName} />
          </label>
          <button className="input-group-text" id="basic-addon2">
            <img className=" emoji send-icon" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
