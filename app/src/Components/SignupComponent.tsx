import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../Contexts/LoginContext";
import { Redirect } from "react-router-dom";
export default function SignupComponent(props) {
  const {
    state: { loginInfo },
    actions: { signUp }
  } = useContext<any>(LoginContext);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [error, setError] = useState<{ type; error_message }>({
    type: null,
    error_message: null
  });
  const formSubmit = async e => {
    e.preventDefault();
    // setError({ type: "username", error_message: "Name Already Exist" });
    if (userName == null || email == null || password == null || name == null) {
      alert("one or more fields might be empty");
    } else {
      if (password !== rPassword) {
        alert("password and alert password do not match");
      } else {
        //final signup
        var res = await signUp(email, password, userName, name);
      }
    }
  };

  return (
    <div>
      <div className="basic-form">
        <h2 className="">Register</h2>
        <form
          onSubmit={e => {
            formSubmit(e);
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              name="userName"
              onChange={e => {
                setUserName(e.target.value);
              }}
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              name="name"
              onChange={e => {
                setName(e.target.value);
              }}
              className="form-control"
              placeholder="Full Name"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
              className="form-control"
              placeholder="Email-Id"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              name="password"
              id="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              name="rPassword"
              onChange={e => {
                setRPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Repeat Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={formSubmit}
          >
            Register
          </button>
        </form>
        <Link to="/login" className="hyperlink">
          Login
        </Link>
      </div>
    </div>
  );
}
