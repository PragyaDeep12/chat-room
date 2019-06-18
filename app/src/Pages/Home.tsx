import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Test from "./Test";
import ChatInputLayout from "../Components/ChatInputLayout";
import ChatScreen from "../Components/ChatScreen";

export default function Home() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      render the whole chats
      <ChatScreen />
      <ChatInputLayout />
    </div>
  );
}
