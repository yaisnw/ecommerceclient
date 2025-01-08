import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  loginCall,
  selectToken,
  selectError,
  selectisLoading,
  logout
} from "./loginSlice";
import { selectisSignedup } from "./userSlice";
import "./auth.css";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectisLoading);
  const isSignedup = useSelector(selectisSignedup);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate('/home/products');
    }
    else {
      dispatch(logout());
    }
  }, [token, navigate, dispatch]);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginCall({ username, password }));
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  console.log(token)
  return (
    <div className="formBox">
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="http">
          {error && <p>{error}</p>}
          {isLoading && <p>Loading</p>}
        </div>
        {isSignedup && <h1> You have signed up!</h1>}
        <h2 className="guide">Enter your credentials:</h2>
        <label>Username</label>
        <input
          name="username"
          value={username}
          onChange={handleUsername}
          type="text"
        />
        <label>Password</label>
        <input
          name="password"
          value={password}
          onChange={handlePassword}
          type="password"
        />
        <input className="submit" type="submit" value="Log in" />
        {!isSignedup && <Link className="navigateLink" to="/signup">Sign up here</Link>}
      </form>
    </div>
  );
}

export default Login;
