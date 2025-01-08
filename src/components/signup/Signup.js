import React, { useEffect, useState } from 'react';
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import {
  selectisSignedup,
  selectisLoading,
  selectError,
  signout,
  signup
} from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from './loginSlice';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector(selectToken);
  const isSignedup = useSelector(selectisSignedup);
  const isLoading = useSelector(selectisLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedup) {
      navigate('/login');
    }
    else if(token) {
      navigate('/home/products')
    }
    else {
      dispatch(signout());
    }
  }, [isSignedup, navigate, dispatch, token]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signup({ username, password }));
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="formBox">
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="http">
          {error && <p>{error}</p>}
          {isLoading && <p>Loading</p>}
        </div>
        <h2 className="guide">Create an account:</h2>
        <label>Username</label>
        <input value={username} onChange={handleUsername} type="text" />
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" />
        <input className="submit" type="submit" value="Sign up" />
        <Link to="/login">Login here</Link>
      </form>
    </div>
  );
}

export default Signup;
