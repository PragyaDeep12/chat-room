import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./Styles/stylesheet.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Styles/bootstrap.css";

import firebase from "firebase";
import VideoChat from "./Pages/VideoChat";
import Test from "./Pages/Test";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import LoginContext from "./Contexts/LoginContext";
import LoginProvider from "./Contexts/LoginProvider";
import CustomSnackbar from "./Components/CustomSnackBar";

import { Redirect } from "react-router-dom";
import Loading from "./Pages/Loading";

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <CustomSnackbar />
        <Router>
          <Switch>
            <Route
              path="/"
              exact={true}
              render={props => <LoginWrapper page="signup" />}
            />
            <Route
              path="/login"
              exact={true}
              render={props => <LoginWrapper page="login" />}
            />
            {/* <Route path="/loading" exact={true} component={Loading} /> */}
            <PrivateRoute path="/Chat" component={Home} />
          </Switch>
        </Router>
      </LoginProvider>

      {/* <Home /> */}
    </div>
  );
}

export default App;
function LoginWrapper(props) {
  const {
    state: { loginInfo },
    actions: { setLoginDetails, getUserDetails }
  } = useContext(LoginContext);
  let isMounted = false;
  useEffect(() => {
    if (!isMounted) {
      isMounted = true;
      firebase.auth().onAuthStateChanged(
        user => {
          if (user) {
            setLoginDetails({
              isLoggedIn: true,
              uid: user.uid,
              user: { email: user.email, status: "online", uid: user.uid }
            });
          } else {
            setLoginDetails({ isLoggedIn: false, uid: null, user: null });
          }
        },
        error => {}
      );
    }
  }, []);
  if (
    loginInfo &&
    loginInfo.isLoggedIn === true &&
    loginInfo.uid != null &&
    loginInfo.user != null
  ) {
    console.log("here");
    return <Redirect to="/Chat" />;
  } else {
    console.log(loginInfo);
    if (loginInfo.isLoggedIn === null) {
      return <Loading />;
    }
    return <LoginSignup page={props.page} />;
  }
}
function PrivateRoute({ component: Component, ...rest }) {
  const {
    state: { loginInfo }
  } = useContext(LoginContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (
          loginInfo &&
          loginInfo.isLoggedIn === true &&
          loginInfo.uid != null &&
          loginInfo.user != null
        ) {
          return <Component {...props} />;
        } else if (loginInfo.isLoggedIn === true) {
          console.log("here");
          return <Redirect to="/loading" />;
        }
        console.log(loginInfo);
        return <Redirect to="/login" />;
      }}
    />
  );
}
