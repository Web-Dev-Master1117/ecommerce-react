import React, { useEffect } from 'react';
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
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile'
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync, selectUserInfo } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import AdminHome from './pages/AdminHome';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';


const router = createBrowserRouter([
  {
    path: "/",
    element:  <Protected>
                <Home/>
              </Protected>
  },
  {
    path: '/admin',
    element: 
    // <ProtectedAdmin>
                <AdminHome/>
            // </ProtectedAdmin>
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
    path: "/product-detail/:id",
    element:  <Protected>
                <ProductDetailPage/>
              </Protected>
  },
  {
    path: '/admin/product-detail/:id',
    element: 
    // <ProtectedAdmin>
                <AdminProductDetailPage/>
            // </ProtectedAdmin>
  },
  {
    path: '/admin/product-form',
    element: <AdminProductFormPage />
  },
  {
    path: '/admin/product-form/edit/:id',
    element: <AdminProductFormPage />
  },
  {
    path: '/orderspage',
    element: <AdminOrdersPage />
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccessPage/>,
  },
  {
    path: '/orders',
    element: <UserOrdersPage/>,
  },
  {
    path: '/profile',
    element: <UserProfilePage/>,
  },
  {
    path: '/logout',
    element: <Logout/>,
  },
  {
    path: '/forget-password',
    element: <ForgetPasswordPage/>
  },
  {
    path: '*',
    element: <PageNotFound/>,
  }
]);

function App() {

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
