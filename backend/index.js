const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors")({ origin: true });
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
var messageList = [];
app.use(cors);
app.use(bodyParser.json());

//sockets for video chat
const io = require("socket.io")();
io.origins("*:*");
io.on("connection", socket => {
  console.log("connected");

  //connected
  socket.username = "Anonymous";

  //when username changes from clint
  socket.on("change_username", data => {
    socket.username = data.username;
  });

  //called when disconnected
  socket.on("disconnect", data => {
    console.log(data);
  });
  //get Online users
  socket.on("getOnlineUsers", data => {
    console.log(data);
  });

  //get whenever there is a video update
  socket.on("videoUpdate", data => {
    console.log("video Avail");
    console.log(data);
    io.sockets.emit("newOthersVideoUpdates", {
      username: socket.username,
      video: data
    });
  });

  //get Tone Analysis from WATSON SDK
  socket.on("getToneAnalysis", data => {
    var analyseText = data;
    getToneAnalysis(analyseText).then(result => {
      console.log("Tone resolved: ");
      console.log("result");
      socket.emit("toneAnalysed", result);
    });

    //called when newMessage Comes from user
    socket.on("newMessage", data => {
      console.log(data);
      try {
        // messageList.push(data);
        io.sockets.emit("getNewMessage", data);
      } catch (err) {
        console.log("Error= " + err);
      }
    });

    //request for all messages
    socket.on("requestAllMessages", data => {
      console.log("here got the data" + data);
      try {
        // socket.emit("getAllMessages", messageList);
        socket.emit("getAllMessages", { status: "OK" });
      } catch (err) {
        console.log("Error= " + err);
      }
    });
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
