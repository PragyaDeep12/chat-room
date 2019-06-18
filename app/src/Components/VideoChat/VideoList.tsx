import React from "react";
import EachVideo from "./EachVideo";

export default function VideoList(props) {
  const videoList: [] = props;
  return (
    <div>
      {videoList.map((video, index) => {
        <EachVideo video={video} key={index} />;
      })}
    </div>
  );
}
