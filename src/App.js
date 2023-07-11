import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './features/cart/Cart'
import CheckOut from './pages/CheckOut';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './features/product/components/ProductDetail';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Protected>
                <Home/>
              </Protected>
  },
  {
    path: "/login",
    element:  <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element:  <Protected>
                <CartPage/>
              </Protected>,
  },
  {
    path: "/checkout",
    element:  <CheckOut/>
  },
  {
    path: "/product-detail",
    element:  <Protected>
                <ProductDetailPage/>
              </Protected>
  },
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
