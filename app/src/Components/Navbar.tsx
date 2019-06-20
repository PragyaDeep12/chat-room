import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
export default function Navbar() {
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      // socket.on("latestOnlineUsers", onlineUsers => {
      //   // console.log(onlineUsers);
      // });
    }
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a href="#" className="navbar-brand">
          <img className="chat-icon" />
          Chat Room
        </a>
        <button
          type="button"
          className="navbar-logout"
          onClick={async () => {
            await firebase.auth().signOut();
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
}
