import * as React from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import LoginContext from "../Contexts/LoginContext";
import { socket } from "../Dao/SocketDAO";

export default function Sidebar() {
  const {
    state: { loginInfo }
  } = React.useContext(LoginContext);
  const [userName, setUserName] = React.useState("");
  const [onlineUsers, setOnlineUsers]: [Array<String>, any] = React.useState([
    "User1",
    "User2",
    "User3",
    "User4",
    "User5",
    "User6"
  ]);

  let isMounted = false;
  React.useEffect(() => {
    if (!isMounted) {
      socket.on("getOnlineUsers", data => {
        setOnlineUsers(data);
      });
      let user = localStorage.getItem("user");

      if (user) {
        setUserName(JSON.parse(user).userName);
      }
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

          {onlineUsers.map((user, index) => {
            return (
              <NavItem>
                <NavIcon>
                  <img className="online-user user-icon" />
                </NavIcon>
                <NavText style={{ align: "left" }}>{user}</NavText>
              </NavItem>
            );
          })}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
}
