import React, { useContext } from "react";
import Message from "../Models/Message";
import LoginContext from "../Contexts/LoginContext";
import { format } from "date-fns";
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
            <div className="message-text">{message.message}</div>
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
