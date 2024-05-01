import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, useNavigate } from 'react-router-dom';
import Signup from './components/signup/Signup';
import { Provider, useSelector } from 'react-redux';
import { store } from './Store';
import Login from './components/signup/Login';




const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route path="signup" element={< Signup />} />
    <Route path="login" element={< Login />} />
  </Route>
))

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
