import React, { useEffect, useState } from "react";
import firebase from "firebase";
import LoginContext from "./LoginContext";
import LoginInfo from "../Models/LoginInfo";
import { openSnackbar } from "../Components/CustomSnackBar";
import User from "../Models/User";
import { string } from "prop-types";
import { stringify } from "querystring";

export default function LoginProvider(props) {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    isLoggedIn: null,
    user: null,
    uid: null
  });
  var observe: () => void;

  const saveUser = async user => {
    var db = firebase.firestore();
  };
  const getUser = async uid => {
    var db = firebase.firestore();
    await db
      .collection("users")
      .doc(uid)
      .get()
      .then(user => {
        console.log(user);
      });
    return true;
  };
  const setLoginDetails = (loginInfo: LoginInfo) => {
    setLoginInfo(loginInfo);
  };
  const login = async (email, password) => {
    let uid;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        if (user && user.user && user.user.uid) {
          console.log(user.user.uid);
          uid = user.user.uid;
          var username = await getDb()
            .collection("usernames")
            .doc(user.user.uid)
            .onSnapshot(async snapshot => {
              var data = snapshot.data();
              if (data) {
                var username = data.username;
                await getDb()
                  .collection("users")
                  .doc(username)
                  .onSnapshot(async user => {
                    var userData = user.data();
                    if (userData) {
                      var userDetails: User = {
                        userName: userData.userName,
                        status: "online",
                        email: userData.email,
                        uid: uid,
                        name: userData.name
                      };
                      // if (userDetails.userName) {
                      //   localStorage.setItem(
                      //     "user",
                      //     userDetails.userName.toString()
                      //   );
                      // }
                      localStorage.setItem("user", JSON.stringify(userDetails));
                      await setLoginInfo({
                        ...loginInfo,
                        isLoggedIn: true,
                        user: userDetails,
                        uid: uid
                      });
                      // console.log(userDetails);
                    }
                  });
              }
            });
        }
      })
      .catch(err => {
        //console.log(err.message);
        openSnackbar({ message: err.message });
      });
  };
  const getDb = () => {
    return firebase.firestore();
  };
  const checkUserName = async userName => {
    console.log("here");
    getDb()
      .collection("usernames")
      .doc("username")
      .get()
      .then(userNames => {
        console.log(userNames);
        return true;
      });
    return false;
  };

  const signUp = async (email, password, userName, name) => {
    //var val = await checkUserName(userName);

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
            console.log(user.user.uid);
            var createUser = await getDb()
              .collection("users")
              .doc(userName)
              .set(userObj);
            var setLoginDetaills = await getDb()
              .collection("usernames")
              .doc(user.user.uid)
              .set({ username: userName });

            await setLoginInfo({
              ...loginInfo,
              isLoggedIn: true,
              user: userObj,
              uid: user.user.uid
            });
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

    //firebase.auth().createUserWithEmailAndPassword;
    // getAuth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(firebaseUser => {
    //     let color = getRandomColor();
    //     let user = firebaseUser.user;
    //     console.log(color);
    //     console.log(user);
    //     if (user) {
    //       getDb()
    //         .collection("usernames")
    //         .doc(username)
    //         .set({ email: email })
    //         .then(value => {
    //           console.log("created username");
    //           if (user)
    //             getDb()
    //               .collection("users")
    //               .doc(user.uid)
    //               .set({
    //                 email: email,
    //                 username: username,
    //                 state: "online",
    //                 last_changed: 1558097573186,
    //                 color: color,
    //                 goOffline: false
    //               })
    //               .then(res => {
    //                 console.log("created user details");
    //               })
    //               .catch(err => {
    //                 console.error(err);
    //               });
    //         })
    //         .catch(err => {
    //           console.error(err);
    //         });
    //     }
    //   })
    //   .catch(err => {
    //     if (err.code == "auth/email-already-in-use") {
    //       openSnackbar({
    //         message: SIGNUP_EMAIL_ALREADY_FOUND,
    //         timeout: SNACKBAR_TIMEOUT
    //       });
    //     }
    //   });
  };
  const getUserDetails = uid => {
    // getConnectionStatus(uid);
    // if (uid)
    //   observe = getDb()
    //     .collection("users")
    //     .doc(uid)
    //     .onSnapshot(
    //       docSnap => {
    //         if (docSnap.exists) {
    //           var data = docSnap.data();
    //           if (data) {
    //             var username = data.username;
    //             var email = data.email;
    //             var last_changed = data.last_changed;
    //             var state = data.state;
    //             var color = data.color;
    //             var goOffline = data.goOffline;
    //             setLoginInfo({
    //               ...loginInfo,
    //               isLoggedIn: true,
    //               uid: uid,
    //               userDetails: {
    //                 username: username,
    //                 email: email,
    //                 last_changed: last_changed,
    //                 state: state,
    //                 color: color,
    //                 goOffline: goOffline
    //               }
    //             });
    //           } else {
    //             setLoginInfo({
    //               ...loginInfo,
    //               isLoggedIn: false,
    //               uid: null,
    //               userDetails: null
    //             });
    //           }
    //         } else {
    //           setLoginInfo({
    //             ...loginInfo,
    //             isLoggedIn: false,
    //             uid: null,
    //             userDetails: null
    //           });
    //           console.log("document not found");
    //         }
    //       },
    //       err => {
    //         console.error(err);
    //       }
    //     );
    // else observe();
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
