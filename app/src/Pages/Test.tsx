import React, { useState, useEffect } from "react";
import VideoChat from "./VideoChat";
import { socket } from "../Dao/SocketDAO";

export default function Test() {
  const [testText, setTestText] = useState<string>();
  const [result, setResult] = useState<any>();
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      socket.on("toneAnalysed", data => {
        console.log(data.document_tone.tones);
        setResult(data.document_tone.tones);
      });
    }
  }, []);

  return (
    <div>
      <h1>This Page is just to test functionality</h1>
      <input
        type="text"
        onChange={e => {
          setTestText(e.currentTarget.value);
          socket.emit("getToneAnalysis", testText);
        }}
      />
      <button
        onClick={() => {
          socket.emit("getToneAnalysis", testText);
        }}
      >
        Analyse Text
      </button>
      <div>{result ? JSON.stringify(result) : "Hello"}</div>
      <VideoChat />
    </div>
  );
}
