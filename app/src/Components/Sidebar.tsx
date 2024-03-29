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
import { width } from "@material-ui/system";
import { stat } from "fs";
import { format } from "util";

export default function Sidebar(props) {
  const {
    state: { loginInfo }
  } = React.useContext(LoginContext);
  const { isMobile } = props;
  const [userName, setUserName] = useState();
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(!isMobile);
  const [typingMap, setTypingMap] = useState<Map<String, boolean>>();
  // var typingMap: Map<String, boolean> = new Map();
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      socket.on("isTyping", data => {
        var username = data.username;
        var isTyping = data.isTyping;
        if (typingMap) {
          var tempMap = typingMap;
        } else {
          var tempMap: Map<String, boolean> = new Map();
        }
        tempMap.set(username, isTyping);
        setTypingMap(tempMap);

        // console.log(typingMap);
      });
      if (loginInfo && loginInfo.user && loginInfo.user.userName) {
        setUserName(loginInfo.user.userName);
      }
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
                if (docs.data()) {
                  var user: User = docs.data() as User;
                  if (loginInfo && loginInfo.user) {
                    if (loginInfo.user.userName != user.userName) {
                      users.push(user);
                    }
                  }
                }
              });
              setOnlineUsers(users);
            });
        }
      });
    }
  }, []);
  return (
    <div>
      <SideNav
        onSelect={selected => {
          // Add your code here
        }}
        disabled={!isMobile}
        expanded={isOpen}
        onToggle={state => {
          // console.log(state);
          setIsOpen(state);
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
                {loginInfo.user ? loginInfo.user.name : "no name"}
              </NavText>
            </NavItem>
            <NavItem>
              <NavText style={{ align: "left" }}>
                {loginInfo.user ? loginInfo.user.email : "no email"}
              </NavText>
            </NavItem>
          </NavItem>
          <NavItem>
            <NavIcon>{/* <img className="online-user user-icon" /> */}</NavIcon>
            <NavText style={{ align: "left" }}>
              <div className="online-user-heading">
                Online Users ({onlineUsers.length})
              </div>
            </NavText>
          </NavItem>
          <div className="line" />
          <div className="online-user-list">
            <SideNav.Nav>
              {onlineUsers.map((user: User, index) => {
                return (
                  <NavItem key={index}>
                    <NavIcon>
                      <img className="online-user user-icon" />
                    </NavIcon>
                    <NavText>
                      {user.userName
                        ? user.userName +
                          (typingMap
                            ? typingMap.get(user.userName)
                              ? typingMap.get(user.userName)
                                ? "( Typing ... )"
                                : ""
                              : ""
                            : "")
                        : user.userName}
                    </NavText>
                  </NavItem>
                );
              })}
            </SideNav.Nav>
          </div>
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}
