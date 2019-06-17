import React, { useEffect } from "react";
import { socket } from "../Dao/VideoChatDao";
export default function ChatScreen() {
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      console.log("condsole");
      socket.emit("requestAllMessages", "nodata");

      socket.on("getAllMessages", data => {
        console.log("calles");
        console.log(data);
      });
      socket.on("getNewMessage", data => {
        console.log(data);
      });
      isMounted = true;
    }
  });
  return <div />;
}
