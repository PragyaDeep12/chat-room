import React, { useContext } from "react";
import Message from "../Models/Message";
import LoginContext from "../Contexts/LoginContext";
import { format } from "date-fns";
import HappyEmoji from "../icons/happy.svg";
import SadEmoji from "../icons/sad.svg";
import ConfusedEmoji from "../icons/confused.svg";
import AngryEmoji from "../icons/angry.svg";
import ScaredEmoji from "../icons/scared.svg";
import ThinkingEmoji from "../icons/thinking.svg";

export default function MessageBox(message: Message) {
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  if (loginInfo && loginInfo.user && loginInfo.user.userName) {
    return (
      <div className="message">
        <div
          className={
            message.userName === loginInfo.user.userName
              ? "my-message"
              : "other-message"
          }
        >
          <div className="message-box">
            <div className="user-name">{message.userName}</div>
            <div className="message-text">
              {message.message === ":) " ? (
                <div className="emoji">
                  <img alt=":)" className="emoji" src={HappyEmoji} />
                </div>
              ) : message.message === ":| " ? (
                <div className="emoji">
                  <img alt=":|" className="emoji" src={ConfusedEmoji} />
                </div>
              ) : message.message === ":( " ? (
                <div className="emoji">
                  <img alt=":(" className="emoji" src={SadEmoji} />
                </div>
              ) : message.message === ":? " ? (
                <div className="emoji">
                  <img alt=":?" className="emoji" src={AngryEmoji} />
                </div>
              ) : message.message === ":E " ? (
                <div className="emoji">
                  <img alt=":E " className="emoji" src={ScaredEmoji} />
                </div>
              ) : message.message === ":!" ? (
                <div className="emoji">
                  <img alt=":E " className="emoji" src={ThinkingEmoji} />
                </div>
              ) : (
                message.message
              )}
            </div>
            <div className="time">
              {message.time ? format(message.time, "hh:mm a") : ""}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
