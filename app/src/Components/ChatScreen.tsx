import React, { useEffect } from "react";
import { socket } from "../Dao/SocketDAO";
export default function ChatScreen() {
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      console.log("condsole");
      socket.emit("requestAllMessages", { data: "OKO" });
      socket.on("getAllMessages", data => {
        console.log("calles");
        console.log(data);
      });
      socket.on("getNewMessage", data => {
        console.log(data);
      });
    }
  }, []);
  return <div />;
}
