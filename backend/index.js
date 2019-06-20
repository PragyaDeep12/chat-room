const express = require("express");
const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");
const WATSON_API_URL =
  "https://gateway-lon.watsonplatform.net/tone-analyzer/api";
const WATSON_API_KEY = "PokY8B7Ncv-_tQDxwC2J4FHHH0KoHR0nvZcv3Mj0Y-sJ";
// const OWN_API_URL = "https://fast-cove-89498.herokuapp.com/"
/*****
 *PLEASE NOTE :-
 * Please Run These Commands after Cloning from github for pushing code to Heroku :-
 * 1) Delete all  items from backend
 * 2) Clone using GitDesktop To /backend these URL :- https://git.heroku.com/fast-cove-89498.git
 * 3) heroku login
 * 4) git remote add heroku git@heroku.com:fast-cove-89498.git
 * 5) git commit -m "Backend Update ..."
 * 6) git push heroku master
 *
 * ****/
const firebase = require("firebase");
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
firebase.initializeApp(firebaseConfig);
var messageList = [];
var onlineUsers = [];

//sockets for video chat
const io = require("socket.io")();
io.set("origins", "*:*");
io.on("connection", socket => {
  console.log("connected");

  //connected
  socket.username = "Anonymous";

  //when username changes from clint
  socket.on("change_username", data => {
    socket.username = data.username;
    //when user has a username he is online so add to online users here
    try {
      setUserOnline(socket.username);
    } catch (err) {
      console.error(err);
    }
  });
  //called when clients disconnected
  socket.on("disconnect", data => {
    try {
      setUserOffline(socket.username);
    } catch (err) {
      console.error(err);
    }
  });

  //get whenever there is a video update
  socket.on("videoUpdate", data => {
    console.log("video Avail");
    try {
      console.log(data);
      io.sockets.emit("newOthersVideoUpdates", {
        username: socket.username,
        video: data
      });
    } catch (err) {
      console.error(err);
    }
  });

  //get Tone Analysis from WATSON SDK
  socket.on("getToneAnalysis", data => {
    var analyseText = data;
    try {
      getToneAnalysis(analyseText).then(result => {
        console.log("Tone resolved: ");
        console.log("result");
        socket.emit("toneAnalysed", result);
      });
    } catch (err) {
      console.error(err);
    }
  });
  //called when newMessage Comes from user
  socket.on("newMessage", message => {
    try {
      pushMessageToDb(message);
    } catch (err) {
      console.error("Error= " + err);
    }
  });

  //request for all messages
  socket.on("requestAllMessages", data => {
    try {
      getAllMessagesFromDB()
        .then(
          messages => {
            socket.emit("getAllMessages", messages);
          },
          error => {
            console.log(error);
          }
        )
        .catch(err => {
          console.error(err);
        });
    } catch (err) {
      console.error("Error= " + err);
    }
  });
});

io.listen(process.env.PORT || 4000);
const getToneAnalysis = text => {
  var promise = new Promise(async (resolve, reject) => {
    try {
      const toneAnalyzer = new ToneAnalyzerV3({
        version: "2017-09-21",
        iam_apikey: WATSON_API_KEY,
        url: WATSON_API_URL
      });
      //adding toneparams
      const toneParams = {
        tone_input: { text: text },
        content_type: "application/json",
        sentences: false
      };

      //initiating Analysis using watson sdk
      await toneAnalyzer
        .tone(toneParams)
        .then(toneAnalysis => {
          //successfull detection -> toneAnalysis
          // handleSuccess(resolve, "Fetch Success", toneAnalysis);
          resolve(toneAnalysis);
        })
        .catch(err => {
          //detectionFailed
          reject(err);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
  return promise;
};
const setUserOnline = username => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(username)
      .update({ status: "online" })
      .then(res => {
        io.sockets.emit("latestOnlineUsersArrived", "check");
      });
  } catch (err) {
    console.error(err);
  }
};
const setUserOffline = username => {
  try {
    firebase
      .firestore()
      .collection("users")
      .doc(username)
      .update({ status: "offline" })
      .then(res => {
        io.sockets.emit("latestOnlineUsersArrived", "check");
      });
  } catch (err) {
    console.error(err);
  }
};
const pushMessageToDb = message => {
  try {
    if (message.time) {
      firebase
        .firestore()
        .collection("messages")
        .doc(message.time.toString())
        .set(message)
        .then(res => {
          io.sockets.emit("getNewMessage", message);
        })
        .catch(err => {
          console.error(err);
        });
    }
  } catch (err) {
    console.error(err);
  }
};
const getAllMessagesFromDB = () => {
  var promise = new Promise((resolve, reject) => {
    try {
      firebase
        .firestore()
        .collection("messages")
        .get()
        .then(querySnapshot => {
          if (querySnapshot) {
            var messages = [];
            querySnapshot.docs.forEach(messageDoc => {
              if (messageDoc) {
                messages.push(messageDoc.data());
              }
            });
            resolve(messages);
          }
        })
        .catch(err => {
          reject(err);
          console.error(err);
        });
    } catch (err) {
      reject(err);
      console.error(err);
    }
  });
  return promise;
};
