import React, { useState, useEffect } from "react";
import { socket } from "../Dao/SocketDAO";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value) {
      console.log("started typing");
      socket.emit("isTyping", true);
      const handler = setTimeout(() => {
        console.log("stopped typing");
        socket.emit("isTyping", false);
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [value]);

  return debouncedValue;
}
