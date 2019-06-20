import React, { useContext } from "react";
import Message from "../Models/Message";
import LoginContext from "../Contexts/LoginContext";
import { format } from "date-fns";
export default function MessageBox(message: Message) {
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  const getMessage = async () => {
    console.log("here");
    switch (message.message) {
      case ":)":
        return <img alt=":)" className="happy-emoji" />;
      case ":(":
        return <img alt=":(" className="sad-emoji" />;
      case ":|":
        return <img alt=":|" className="confused-emoji" />;
      case ":?":
        return <img alt=":?" className="angry-emoji" />;
      default:
        return <span>{message.message}</span>;
        break;
    }
  };
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
                  <img alt=":)" className="emoji happy-emoji" />
                </div>
              ) : message.message === ":| " ? (
                <div className="emoji">
                  <img alt=":|" className="emoji confused-emoji" />
                </div>
              ) : message.message === ":( " ? (
                <div className="emoji">
                  <img alt=":(" className="emoji sad-emoji" />
                </div>
              ) : message.message === ":? " ? (
                <div className="emoji">
                  <img alt=":?" className="emoji angry-emoji" />
                </div>
              ) : message.message === ":E " ? (
                <div className="emoji">
                  <img alt=":E " className="emoji scared-emoji" />
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
