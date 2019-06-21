import { socket } from "./Dao/SocketDAO";
import { array } from "prop-types";

export function showVideo(video, canvas) {
  var vendorURL = window.URL || window.webkitURL;
  navigator.getMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  navigator.getMedia(
    { video: true, audio: false },
    stream => {
      video.src = vendorURL.createObjectURL(stream);
      video.play();
    },
    error => {
      console.log("error" + error);
    }
  );
}
export function clickPicture(video, canvas) {
  var ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    var data = canvas.toDataURL("image/png");
    socket.emit("videoUpdate", data);
  }
}

export function sort(users) {
  users.sort(GetSortOrder("score"));
  console.log(users);
}
function GetSortOrder(prop) {
  return function(a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}
