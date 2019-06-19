import * as React from "react";
import Message from "../Models/Message";
import LoginContext from "../Contexts/LoginContext";
import { format } from "date-fns";
export default function MessageBox(message: Message) {
  var user = localStorage.getItem("user");
  if (user) {
  }

  console.log(message.userName);
  if (user) {
    if (message.userName === JSON.parse(user).userName) {
      return (
        <div className="my-message">
          <div className="message-box">
            <div className="user-name">{message.userName}</div>
            <label className="message">{message.message}</label>
            <span className="time">
              {message.time ? format(message.time, "hh:mm a") : ""}
            </span>
          </div>
        </div>
      );
    }
  }
  return (
    <div className="other-message">
      <div className="message-box">
        <div className="user-name">{message.userName}</div>
        <label className="message">{message.message}</label>
        <span className="time">
          {" "}
          {message.time ? format(message.time, "hh:mm a") : ""}
        </span>
      </div>
    </div>
  );
}
