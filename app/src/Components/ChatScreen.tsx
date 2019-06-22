import React, { useEffect, useState } from "react";
import { socket } from "../Dao/SocketDAO";
import Message from "../Models/Message";
import MessageBox from "../Components/MessageBox";
import { getDateFromMilis } from "../Uitls";
export default function ChatScreen() {
  const [messageList, setMessageList]: [Array<Message>, any] = useState([]);
  const [message, setMessage] = useState<Message>();
  const [chatRef, setChatRef] = useState<HTMLDivElement>();
  // const [previousDate]
  var previousDate, currentDate;
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      if (!socket.connected) {
        socket.connect();
      }
      isMounted = true;
      socket.emit("requestAllMessages", { data: "OK" });
      socket.on("getAllMessages", data => {
        data.forEach(element => {
          setMessage(element);
        });
      });

      socket.on("getNewMessage", data => {
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
  useEffect(() => {
    if (chatRef) {
      chatRef.scrollIntoView({ behavior: "auto" });
    }
  }, [messageList]);
  // var previousDate = "date";
  return (
    <div className="chats">
      {messageList.map((item: Message, index) => {
        // if ()
        if (item) {
          // console.log(item.time);
          if (index === 0) {
            currentDate = getDateFromMilis(item.time);
            previousDate = getDateFromMilis(item.time);
          } else {
            currentDate = getDateFromMilis(item.time);
            if (currentDate != previousDate) {
              previousDate = currentDate;
              return (
                <div key={index}>
                  <span className="date-divider">
                    <span>{previousDate}</span>
                    <hr />
                  </span>

                  <MessageBox
                    message={item.message}
                    userName={item.userName}
                    time={item.time}
                  />
                </div>
              );
            }
          }
          return (
            <MessageBox
              message={item.message}
              userName={item.userName}
              time={item.time}
              key={index}
            />
          );
        }
      })}

      <div
        className="chat"
        ref={el => {
          if (el) setChatRef(el);
        }}
      />
    </div>
  );
}
