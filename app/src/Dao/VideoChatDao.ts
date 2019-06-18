import { socket } from "./SocketDAO";

export const streamVideo = videoStream => {
  console.log("sending video");
  console.log(videoStream);
  if (videoStream) socket.emit("videoUpdate", videoStream);
};
