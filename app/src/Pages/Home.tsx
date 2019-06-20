import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Test from "./Test";
import ChatInputLayout from "../Components/ChatInputLayout";
import ChatScreen from "../Components/ChatScreen";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let isMounted = false;
  window.addEventListener("resize", listner => {
    if (window.innerWidth <= 700) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      if (window.innerWidth <= 700) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, []);
  useEffect(() => {
    // console.log(isMobile);
    if (!isMobile) {
      document.getElementsByClassName(
        "sidenav---sidenav-toggle---1KRjR"
      )[0].className = "vanish";
    } else {
      document.getElementsByClassName("vanish")[0].className =
        "sidenav---sidenav-toggle---1KRjR";
    }
  }, [isMobile]);
  return (
    <React.Fragment>
      <Sidebar isMobile={isMobile} />
      <main className={isMobile ? "chat-body-mobile" : "chat-body-desktop"}>
        <Navbar />
        <ChatScreen />
      </main>
      <ChatInputLayout isMobile={isMobile} />
    </React.Fragment>
  );
}
