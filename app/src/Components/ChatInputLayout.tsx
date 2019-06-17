import React, { useState, useEffect } from "react";
import { socket } from "../Dao/VideoChatDao";
import { useDebounce } from "./Debouncer";
import Message from "../Models/Message";
export default function ChatInputLayout() {
  const [message, setMessage] = React.useState();
  const [emojiClassName, setEmojiClassName] = useState("emoji confused-emoji");
  const emojiFetch = useDebounce(message, 1000);

  let isMounted = false;
  React.useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      socket.on("toneAnalysed", data => {
        console.log(data);
        console.log(data.document_tone.tones);
        console.log(data.document_tone.tones.length);
        console.log(JSON.stringify(data.document_tone.tones));

        if (data.document_tone.tones.length > 0) {
          var tone_id = data.document_tone.tones[0].tone_id;
          console.log("here");
          if (data.document_tone.tones.length > 1) {
            var mydata = data.document_tone.tones;
            var mydata = mydata.sort(function(a, b) {
              console.log(a.score);

              console.log(b.score);
              return a.score < b.score;
            });
          }
          console.log(mydata);
          tone_id = mydata[0].tone_id;
          console.log(tone_id);
          switch (tone_id) {
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
  useEffect(() => {
    if (emojiFetch) {
      console.log("called");
      if (message.length > 0) getEmoji();
      else {
        setEmojiClassName("emoji confused-emoji");
      }
    }
  }, [emojiFetch]);

  const getEmoji = async () => {
    console.log("getting emoji");
    await socket.emit("getToneAnalysis", message);
  };
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
          }}
        />
        <div className="input-group-append">
          <label className="input-group-text ">
            <img className={emojiClassName} />
          </label>
          <button
            className="input-group-text"
            id="basic-addon2"
            onClick={() => {
              var message: Message = {
                userName: "Pragya",
                message: "firstMessage",
                time: new Date()
              };
              console.log(message);
              socket.emit("newMessage", message);
            }}
          >
            <img className=" emoji send-icon" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
