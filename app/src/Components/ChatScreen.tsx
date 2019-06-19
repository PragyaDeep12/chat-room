import React, { useEffect } from "react";
import { socket } from "../Dao/SocketDAO";
export default function ChatScreen() {
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      socket.emit("requestAllMessages", { data: "OK" });
      socket.on("getAllMessages", data => {
        console.log(data);
      });
      socket.on("getNewMessage", data => {
        console.log(data);
      });
    }
  }, []);
  return <div />;
}
