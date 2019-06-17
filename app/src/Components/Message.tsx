import * as React from "react";
import Message from "../Models/message";
export default function Message(message: Message) {
  return (
    <div className="message-box">
      <span className="userName">{message.userName}</span>
      <span className="message">{message.message}</span>
    </div>
  );
}
