import React, { useEffect, useState } from "react";
import { socket } from "../Dao/SocketDAO";
import Message from "../Models/Message";
import MessageBox from "../Components/MessageBox";
export default function ChatScreen() {
  const [messageList, setMessageList]: [Array<Message>, any] = useState([]);
  const [message, setMessage] = useState<Message>();

  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      socket.emit("requestAllMessages", { data: "OK" });
      socket.on("getAllMessages", data => {
        data.forEach(element => {
          setMessage(element);
        });
      });
      socket.on("getNewMessage", data => {
        console.log(data);
        var newMessage: Message = {
          userName: data.userName,
          message: data.message,
          time: data.time
        };
        setMessage(newMessage);
      });
    }
  }, []);
  useEffect(() => {
    setMessageList([...messageList, message]);
  }, [message]);
  return (
    <div>
      {messageList.map((item: Message, index) => {
        if (item)
          return (
            <MessageBox
              message={item.message}
              userName={item.userName}
              time={item.time}
              key={index}
            />
          );
      })}
    </div>
  );
}
