import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBcp3foKTJXDg-zxijmR1nS3Gwf28LXQHo",
  authDomain: "chatapp-529b9.firebaseapp.com",
  databaseURL: "https://chatapp-529b9.firebaseio.com",
  projectId: "chatapp-529b9",
  storageBucket: "",
  messagingSenderId: "884053658028",
  appId: "1:884053658028:web:01b7a181476a366d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
