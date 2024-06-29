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
  setisLoggedin,
  selectToken,
} from "./loginSlice";
import "./Login.css";
import google from "./google.svg";
import facebook from "./facebook.svg"
import { useEffect } from "react";
import { selectisSignedup } from "./userSlice";

function Login() {
  const password = useSelector(selectPassword);
  const username = useSelector(selectUsername);
  const token = useSelector(selectToken);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectisLoading);
  const isSignedup = useSelector(selectisSignedup);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      console.log('Token is available, navigating to /home/products');
      navigate('/home/products')
    }
  }, [token, navigate])

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

  };

  return (
    <div className="formBox">
      <div className="http">
        {error && <p>{error}</p>}
        {isLoading && <p>Loading</p>}
      </div>
      <h2 className="guide">Please log in</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input name="username" value={username} onChange={handleUsername} type="text" />
        <label>Password</label>
        <input name="password" value={password} onChange={handlePassword} type="password" />
        <input className="submit" type="submit" />
        {!isSignedup && <Link to="/signup">Sign up page</Link>}
      </form>
      {/* <div className="oauthBox1">
        <p>Login using:</p>
        <div className="oauthBox2">
          <img onClick={handleGoogle} className="svg" src={google} alt="google" />
          <img onClick={handleFacebook} className="svg" src={facebook} alt="facebook" />
        </div>
      </div> */}
    </div>
  );
}

export default Login;
