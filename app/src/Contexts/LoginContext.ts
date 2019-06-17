import React from "react";
import LoginInfo from "../Models/LoginInfo";
export default React.createContext({
  state: {
    loginInfo: {
      user: null,
      isLoggedIn: null,
      idToken: null
    } as LoginInfo
  },
  actions: {}
});
