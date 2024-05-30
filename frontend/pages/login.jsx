import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import Registration_Login from '../components/Register_Login';


function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const verifyLoginToken = async (token) => {
        try {
           const token= localStorage.setItem('token get from the server:', response.data.token)
                // Check token validity before redirecting to dashboard
                // const isValidToken = await verifyToken(token);
              
               
            const response = await axios.post('http://localhost:3000/api/verifyToken', { token });
            // return response.data.ok;
              if (isValidToken) {
                navigate('/dashboard');}
        } catch (error) {
            console.error('Error verifying token:', error);
            return false;
        }
    };


    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', inputs);

            if (response.data.ok) {
                // localStorage.setItem('token get from the server:', response.data.token)
                 // Save the token in session storage
                //  sessionStorage.setItem('jwtToken', response.data.token);
                 login(response.data.token);
                // Correct path to the dashboard
                navigate('/')
                toast.success("Login successful!", {
                    position: "top-center",
                   
                });
            } else {
                toast.error('Token verification failed. Please login again.');
            }

        

    }
        catch (err) {
        const errorMessage = err.response?.data?.message || 'An error occurred. Please try again.';
        toast.error(errorMessage, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
};

return (
   


    
<>
  <head>
  <meta charset="UTF-8"/>
  <title> Login and Registration Form in HTML & CSS | CodingLab </title>
 <link rel="styleshe  et" href="App.css"/>
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 </head>
<body>
<div class="container">
  <input type="checkbox" id="flip"/>
  <div class="cover">
    <div class="front">
      <img src="/home/dhanrajsinh/Downloads/istockphoto-1281150061-1024x1024.jpg" alt=""/>
     
    </div>
    <div class="back">
      <img class="backImg" src="/home/dhanrajsinh/Downloads/login-and-registration-form-in-html-css<semi-final>/Foldable Login & Registration form/Images/login.jpg" alt=""/>
      <div class="text">
        <span class="text-1">Complete miles of journey <br></br> with one step</span>
        <span class="text-2">Let's get started</span>
      </div>
    </div>
  </div>
  <div class="forms">
      <div class="form-content">
        <div class="login-form">
          <div class="title">Login</div>
          <form onSubmit={handleLoginSubmit}>
      <ToastContainer position="top-center" />
          <div class="input-boxes">
            <div class="input-box">
              <i class="fas fa-envelope"></i>
              <input
              type='email'
              name="email"
              placeholder='Enter your email'
              value={inputs.email}
              onChange={handleLoginChange}
          />
            </div>
            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input
              type='password'
              name="password"
              placeholder='Enter your password'
              value={inputs.password}
              onChange={handleLoginChange}
          />
            </div>
            <div class="text"><a href="#">Forgot password?</a></div>
            <div class="button input-box">
            <button type="submit" disabled={!inputs.email || !inputs.password}>
          Login
      </button>
            </div>
            <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
          </div>
      </form>
    </div>
      <div class="signup-form">
        <div class="title">Signup</div>
      <form action="#">
          <div class="input-boxes">
            <div class="input-box">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Enter your name" required/>
            </div>
            <div class="input-box">
              <i class="fas fa-envelope"></i>
              <input type="text" placeholder="Enter your email" required/>
            </div>
            <div class="input-box">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Enter your password" required/>
            </div>
            <div class="button input-box">
              <input type="submit" value="Sumbit"/>
            </div>
            <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
          </div>
    </form>
  </div>
  </div>
  </div>
</div>
</body>

</>
   





);
}

export default Login;

