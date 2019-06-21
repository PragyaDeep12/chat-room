import React, { useState, useEffect, useContext } from "react";
import { useDebounce } from "./Debouncer";
import Message from "../Models/Message";
import { socket } from "../Dao/SocketDAO";
import LoginContext from "../Contexts/LoginContext";
export default function ChatInputLayout(props) {
  const [messageText, setMessageText] = React.useState();
  const [emojiClassName, setEmojiClassName] = useState("emoji confused-emoji");
  const emojiFetch = useDebounce(messageText, 1000);
  // const [isOpen,setIsOpen]
  const { isMobile } = props;
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  let isMounted = false;
  useEffect(() => {
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
          var mydata = data.document_tone.tones;
          if (data.document_tone.tones.length > 1) {
            mydata = mydata.sort(function(a, b) {
              console.log(a.score);

              console.log(b.score);
              return b.score - a.score;
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
    console.log(isMobile);
  }, [isMobile]);
  useEffect(() => {
    if (emojiFetch) {
      if (messageText.length > 0) getEmoji();
      else {
        setEmojiClassName("emoji confused-emoji");
      }
    }
  }, [emojiFetch]);
  //send messages using username
  const sendMessage = body => {
    if (loginInfo.user && body.length > 0) {
      var message: Message = {
        userName: loginInfo.user.userName,
        message: body,
        time: new Date().getTime()
      };
      socket.emit("newMessage", message);
      setMessageText("");
    }
  };
  const sendEmoji = async () => {
    console.log("sending");

    switch (emojiClassName) {
      case "emoji confused-emoji":
        {
          console.log("here");
          await sendMessage(":| ");
        }
        break;
      case "emoji happy-emoji":
        {
          await sendMessage(":) ");
        }
        break;
      case "emoji sad-emoji":
        {
          await sendMessage(":( ");
        }
        break;
      case "emoji scared-emoji":
        {
          await sendMessage(":E ");
        }
        break;
      case "emoji angry-emoji": {
        await sendMessage(":? ");
      }
    }
  };
  const getEmoji = async () => {
    console.log("getting emoji");
    await socket.emit("getToneAnalysis", messageText);
  };
  return (
    <div
      className={
        isMobile ? "chat-input-layout-mobile" : "chat-input-layout-desktop"
      }
    >
      <div className="input-group">
        <textarea
          className="form-control chat-input-field"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name="message"
          value={messageText}
          onChange={async e => {
            setMessageText(e.target.value);
          }}
        />
        <div className="input-group-append">
          <label className="input-group-text ">
            <img
              className={emojiClassName}
              id="emoji"
              onClick={async () => {
                alert("clock");
                await sendEmoji();
              }}
            />
          </label>
          <button
            className="input-group-text"
            id="basic-addon2"
            onClick={() => {
              sendMessage(messageText);
            }}
          >
            <img className=" emoji send-icon" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
