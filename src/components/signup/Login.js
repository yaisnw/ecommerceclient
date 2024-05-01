import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectPassword,
  selectUsername,
  addUsername,
  addPassword,
  selectError,
  loginCall,
  setError,
  selectisLoggedin,
  selectisLoading,

} from "./loginSlice";
import "./Login.css";
import google from "./google.svg";
import facebook from "./facebook.svg"

function Login() {
  const password = useSelector(selectPassword);
  const username = useSelector(selectUsername);
  const isLoggedin = useSelector(selectisLoggedin);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectisLoading)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(username);
  const handleUsername = (e) => {
    dispatch(addUsername(e.target.value));
  };
  const handlePassword = (e) => {
    dispatch(addPassword(e.target.value));
  };

  const handleSubmit = async (e) => {
    dispatch(setError(''))
    e.preventDefault();
    try {
      await dispatch(loginCall({ username, password }));
    } catch (error) {
      console.error('Signup failed:', error);
      dispatch(setError(error.message));
    }

    if (isLoggedin) {
      navigate("/home")
    }
  };
  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      window.location.href = 'http://localhost:4000/auth/google'
    }
    catch (e) {
      dispatch(setError(error.message))
    }
  }
  const handleFacebook = async (e) => {
    e.preventDefault();
    try {
      window.location.href = 'http://localhost:4000/auth/facebook'
    }
    catch (e) {
      dispatch(setError(error.message))
    }
  }
  return (
    <div className="formBox">
      <div className="http">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading</p>}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input value={username} onChange={handleUsername} type="text" />
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" />
        <input className="submit" type="submit" />
        <Link to="/signup">Sign up</Link>
      </form>
      <div className="oauthBox1">
        <p>Login using:</p>
        <div className="oauthBox2">
          <img onClick={handleGoogle} className="svg" src={google} alt="google" />
          <img onClick={handleFacebook} className="svg" src={facebook} alt="facebook" />
        </div>
      </div>
    </div>
  );
}

export default Login;
