import * as React from "react";
import firebase from "firebase";
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
            await firebase.auth().signOut();
          }}
        >
          logout
        </button>
      </nav>
    </div>
  );
}
