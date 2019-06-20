import React, { useEffect, useState } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import LoginContext from "../Contexts/LoginContext";
import { socket } from "../Dao/SocketDAO";

import firebase from "firebase";
import User from "../Models/User";

export default function Sidebar() {
  const {
    state: { loginInfo }
  } = React.useContext(LoginContext);
  const [userName, setUserName] = React.useState("");
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  useEffect(() => {
    console.log(onlineUsers);
  }, [onlineUsers]);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      socket.on("latestOnlineUsersArrived", data => {
        if (data === "check") {
          firebase
            .firestore()
            .collection("users")
            .where("status", "==", "online")
            .get()
            .then(docsSnapshot => {
              var users: User[] = [];
              docsSnapshot.docs.forEach(docs => {
                // console.log(docs.data());
                if (docs.data()) {
                  var user: User = docs.data() as User;
                  // setOnlineUsers([...onlineUsers, user]);
                  users.push(user);
                }
              });
              setOnlineUsers(users);
            });
        }
      });
    }
  });
  return (
    <div>
      <SideNav
        onSelect={selected => {
          // Add your code here
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav selected="home">
          <NavItem eventKey="home">
            <NavIcon className="increased-height">
              <img className="user-icon" style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>
              <h4>{userName}</h4>
            </NavText>
            <NavItem>
              <NavText style={{ align: "left" }}>
                pragya.deep19@gmail.com
              </NavText>
            </NavItem>
          </NavItem>

          {onlineUsers.map((user: User, index) => {
            return (
              <NavItem key={index}>
                <NavIcon>
                  <img className="online-user user-icon" />
                </NavIcon>
                <NavText style={{ align: "left" }}>{user.name}</NavText>
              </NavItem>
            );
          })}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}
