import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, useNavigate, Navigate, redirect } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { Provider, useSelector } from 'react-redux';
import { persistor, store } from './Store';
import Login from './components/signup/Login';
import ProductsList from './components/products/ProductsList';
import ProductDetail from './components/productdetail/ProductDetail';
import Cart from './components/cart/Cart';
import { PersistGate } from 'redux-persist/integration/react';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from './components/signup/loginSlice';
import { useEffect } from 'react';
import Nav from './components/nav/Nav';


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" >
    <Route path="signup" element={< Signup />} />
    <Route path="login" element={< Login />} />
    <Route path="home" element={< Nav />}>
      <Route path="products" element={<ProductsList />} />
      <Route path="products/:id" element={< ProductDetail />} />
      <Route path="cart" element={< Cart />} />
    </Route>
    <Route index element={<Navigate to="signup" replace />} />
  </Route>
))


function App() {


  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
