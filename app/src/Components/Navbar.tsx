import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { socket } from "../Dao/SocketDAO";
import { openSnackbar } from "./CustomSnackBar";
export default function Navbar() {
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
            socket.disconnect();
            await firebase.auth().signOut();
          }}
        >
          LOGOUT
        </button>
      </nav>
    </div>
  );
}
