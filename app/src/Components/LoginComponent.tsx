import * as React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import LoginContext from "../Contexts/LoginContext";

import { Redirect } from "react-router-dom";
export default function LoginComponent(props) {
  const {
    state: { loginInfo },
    actions: { login }
  } = useContext<any>(LoginContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formSubmit = async e => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div>
      <div className="basic-form">
        <form
          onSubmit={e => {
            formSubmit(e);
          }}
        >
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
              onChange={e => {
                setPassword(e.target.value);
              }}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <Link to="/" className="hyperlink">
          Register
        </Link>
      </div>
    </div>
  );
}
