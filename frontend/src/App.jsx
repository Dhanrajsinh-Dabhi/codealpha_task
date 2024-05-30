import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import './App.css'
import Registration from '../pages/registration'
import ForgotPassword from '../pages/ForgotPassword'
import Home from '../pages/home'
import Login from "../pages/login";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "../context/privateroute";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Navbar from "../components/navbar";
import Register_Login from "../components/Register_Login";
import UserProfile from "../pages/UserProfile";
// import axiosConfig from './axiosConfig'; // Ensure this line is here to apply the interceptor

function App() {

  return (
    <>
      <div>
        <Navbar />
      </div>
      <BrowserRouter>

        <Routes>

          {/* <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} /> */}
          <Route path='register-login' element={<Register_Login />} />
        
          
          <Route exact path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />

          <Route path='/user-profile' element={
            <PrivateRoute>
              <UserProfile />
              </PrivateRoute>}
          />
          <Route path='/forgot-password' element={<ForgotPassword />}/>




        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App;