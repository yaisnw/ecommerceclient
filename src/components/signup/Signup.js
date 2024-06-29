import React, { useEffect } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import {
  selectUsername,
  selectPassword,
  selectisSignedup,
  selectisLoading,
  selecthasError,
  selectError,
  setError,
  addPassword,
  addUsername,
  signup
} from './userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { persistor } from '../../Store'

function Signup() {
  const password = useSelector(selectPassword)
  const username = useSelector(selectUsername)
  const isSignedup = useSelector(selectisSignedup)
  const isLoading = useSelector(selectisLoading)
  const error = useSelector(selectError)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedup) {
      navigate('/login')
    }
  })

  const handleUsername = (e) => {
    dispatch(addUsername(e.target.value))
  }
  const handlePassword = (e) => {
    dispatch(addPassword(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signup({ username, password }));
      if (isSignedup) {
        navigate('/login')
      }
    } catch (error) {
      console.error('Signup failed:', error);
      dispatch(setError(error.message));
    }


  };
  // console.log(password)
  return (
    <div className='formBox'>
      <form className="signForm" onSubmit={handleSubmit}>
        <div className="http">
          {error && <p>{error}</p>}
          {isLoading && <p>Loading</p>}
        </div>

        <label>Username</label>
        <input value={username} onChange={handleUsername} type="text" />
        <label>Password</label>
        <input value={password} onChange={handlePassword} type="password" />
        <input className="submit" type="submit" />
        <Link to="/login">Log in</Link>
      </form>
    </div>
  )
}

export default Signup