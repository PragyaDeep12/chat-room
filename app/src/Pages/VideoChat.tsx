import React, { useState, useEffect } from "react";
import VideoList from "../Components/VideoChat/VideoList";
import { setMaxListeners } from "cluster";
import { showVideo, clickPicture } from "../Uitls";
import { socket } from "../Dao/SocketDAO";

export default function VideoChat() {
  const [videoList, setVideoList] = useState<any[]>([]);
  const [myVideo, setMyVideo] = useState<any>();
  const [otherVideo, setOtherVideo] = useState<any>();
  const [capturedImage, setCapturedImage] = useState<any>();

  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      // var canvas2 = document.getElementById("other_img") as HTMLCanvasElement;
      // var ctx = canvas2.getContext("2d");
      socket.on("newOthersVideoUpdates", data => {
        // console.log(data);
        // if (ctx) {
        setOtherVideo(data.video);
        // ctx.drawImage(data.video, 0, 0, canvas2.width, canvas2.height);
        // }/
      });
    }
  }, []);
  const sendPhotoAtInterval = () => {
    var video = document.getElementById("player1");
    setInterval(() => {
      var canvas = document.getElementById("cap_img") as HTMLCanvasElement;
      clickPicture(video, canvas);
    }, 100);
  };
  return (
    <div>
      {/* <VideoList videoList={videoList} /> */}
      <input
        type="button"
        value="getVideo"
        onClick={() => {
          var video = document.getElementById("player1");
          showVideo(video, null);
          sendPhotoAtInterval();
        }}
      />
      <br />
      <video id="player1" className="myVideo" />
      <h5>My Video</h5>
      <canvas id="cap_img" className="captured_image" />
      <h5>Video From Server</h5>
      <img src={otherVideo} className="captured_image" />
    </div>
  );
}
