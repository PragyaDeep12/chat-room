import React, { useEffect, useState } from "react";
import firebase from "firebase";
import LoginContext from "./LoginContext";
import LoginInfo from "../Models/LoginInfo";
import { openSnackbar } from "../Components/CustomSnackBar";
import User from "../Models/User";
import { string } from "prop-types";
import { stringify } from "querystring";
import { socket } from "../Dao/SocketDAO";

export default function LoginProvider(props) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    isLoggedIn: null,
    user: null,
    uid: null
  });
  const setLoginDetails = (loginInfo: LoginInfo) => {
    setLoginInfo(loginInfo);
  };
  const login = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        console.log(user);
      })
      .catch(err => {
        openSnackbar({ message: err.message });
      });
  };
  const getDb = () => {
    return firebase.firestore();
  };

  const signUp = async (email, password, userName, name) => {
    var firebaseDoc = await getDb()
      .collection("users")
      .doc(userName)
      .get();
    if (firebaseDoc.exists) {
      openSnackbar({ message: "Username Already Exists" });
      return false;
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async user => {
          if (user.user) {
            var userObj: User = {
              email: email,
              userName: userName,
              uid: user.user.uid,
              status: "online",
              name: name
            };
            await getDb()
              .collection("users")
              .doc(userName)
              .set(userObj);
            await getDb()
              .collection("usernames")
              .doc(user.user.uid)
              .set({ username: userName });
            return true;
          }
        })
        .catch(err => {
          openSnackbar({ message: err.message, timeout: 3000 });

          return false;
        })
        .catch(err => {
          openSnackbar({ message: err.message, timeout: 3000 });

          return false;
        });
    }
  };
  const getUserDetails = uid => {
    getDb()
      .collection("users")
      .where("uid", "==", uid)
      .get()
      .then(res => {
        if (res) {
          var userDetails = res.docs[0].data();
          if (userDetails as User) {
            var user: User = {
              email: userDetails.email,
              name: userDetails.name,
              uid: userDetails.uid,
              status: userDetails.status,
              userName: userDetails.userName
            };
            //now we have got username so we will be psuhing it to server
            socket.emit("change_username", { username: userDetails.userName });
            setLoginInfo({ ...loginInfo, user: user });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <LoginContext.Provider
      value={{
        state: { loginInfo },
        actions: {
          login,
          getUserDetails,
          signUp,
          setLoginDetails
        }
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
