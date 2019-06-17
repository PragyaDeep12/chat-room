import React, { useState, useEffect } from "react";
import SignupComponent from "../Components/SignupComponent";
import LoginComponent from "../Components/LoginComponent";
import appIcon from "../icons/app-icon.svg";
export default function LoginSignup(props) {
  return (
    <React.Fragment>
      <img src={appIcon} className="app-icon" />
      {props.page === "signup" ? <SignupComponent /> : <LoginComponent />}
    </React.Fragment>
  );
}
