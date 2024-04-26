import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectPassword,
  selectUsername,
  addUsername,
  addPassword,
} from "./loginSlice";
import "./Login.css";

function Login() {
  const password = useSelector(selectPassword);
  const username = useSelector(selectUsername);

  const dispatch = useDispatch();

  console.log(username);
  const handleUsername = (e) => {
    dispatch(addUsername(e.target.value));
  };
  const handlePassword = (e) => {
    dispatch(addPassword(e.target.value));
  };
  return (
    <div className="formBox">
      <form className="form">
        <label>Username</label>
        <input value={username} onChange={handleUsername} type="text" />
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" />
        <input className="submit" type="submit" />
        <Link to="/signup">Sign up</Link>
      </form>
    </div>
  );
}

export default Login;
