import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { persistor } from '../../Store'
import cart from '../cart/cart-shopping-svgrepo-com.svg'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken } from '../signup/loginSlice'
import "./Nav.css"

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken)

  useEffect(() => {
    if (token) {
      const tokenExpiry = jwtDecode(token).exp * 1000;
      const now = Date.now();
      if (now >= tokenExpiry) {
        persistor.purge();
        dispatch({ type: 'RESET_STATE'})
        navigate('/login')
      }
    } else {
      navigate('/login');
    }
  },)



  return (
    <div className='stickyNav'>
      <nav className='navbar'>
        <div className='leftNav'>
          <Link className='home' to="products">Home</Link>
          <Link className='signout' onClick={() => { persistor.purge() }} to="/login">Sign out</Link>
        </div>
        {window.location.href !== 'http://localhost:3000/home/cart' && <img className='cart' onClick={() => { navigate('/home/cart') }} alt="" src={cart} />}
      </nav>
      <Outlet />
    </div>
  )
}

export default Nav