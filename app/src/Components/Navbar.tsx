import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
import { openSnackbar } from "./CustomSnackBar";
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
            // socket.disconnect();
            // await firebase.auth().signOut();
            openSnackbar({ message: "Demo Message", timeout: 3000 });
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
}
