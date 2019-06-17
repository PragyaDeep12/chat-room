export const socket = require("socket.io-client")(
  "https://fast-cove-89498.herokuapp.com/"
);
export const streamVideo = videoStream => {
  console.log("sending video");
  console.log(videoStream);
  if (videoStream) socket.emit("videoUpdate", videoStream);
};
