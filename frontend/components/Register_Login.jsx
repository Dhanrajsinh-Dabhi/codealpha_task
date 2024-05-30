import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from '../src/App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Registration_Login() {
    // Login components
    const navigate = useNavigate();
    const { login } = useAuth();
    const [Logininputs, setLoginInputs] = useState({
        email: '',
        password: '',
    });

    // Register components
    const [Registerinputs, setRegisterInputs] = useState({
        name: '',
        user_name:'',
        m_number: '',
        email: '',
        password: '',
        // gender:'',
        // user_quetion:'',
        // user_quetion_answer_secret:''

    });

    const [ok, setOk] = useState(false);

    const verifyLoginToken = async (token) => {
        try {
            const response = await axios.post('http://localhost:3000/api/verifyToken', { token });
            if (response.data.ok) {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            return false;
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({ ...Logininputs, [name]: value });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', Logininputs);

            if (response.data.ok) {
                login(response.data.token);
                // localStorage.getItem(token)
                localStorage.setItem('token get fromm the server:',response.data.token)
                navigate('/');
                toast.success("Login successful!", {
                    position: "top-center",
                });
            } else {
                toast.error('Token verification failed. Please login again.');
            }
        } catch (err) {
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
    }

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterInputs({ ...Registerinputs, [name]: value });
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        const data = JSON.stringify(Registerinputs);
        console.log(data);

        try {
            const response = await axios.post('http://localhost:3000/api/register', Registerinputs);
            setOk(response.data.ok);
            console.log('Response from server:', response.data);
            toast.success("Registration successful!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            toast.error(err.response?.data?.message );
        }
    }

    return (
        <>


            <div className="container">
                <input type="checkbox" id="flip" />
                <div className="cover">
                    <div className="front">
                        <img src="/home/dhanrajsinh/Downloads/istockphoto-1281150061-1024x1024.jpg" alt="" />
                    </div>
                    <div className="back">
                        <img className="backImg" src="/home/dhanrajsinh/Downloads/login-and-registration-form-in-html-css<semi-final>/Foldable Login & Registration form/Images/login.jpg" alt="" />
                        <div className="text">
                            <span className="text-1">Complete miles of journey <br /> with one step</span>
                            <span className="text-2">Let's get started</span>
                        </div>
                    </div>
                </div>
                <div className="forms">
                    <div className="form-content">
                        <div className="login-form">
                            <div className="title">Login</div>
                            <form onSubmit={handleLoginSubmit}>
                                <ToastContainer position="top-center" />
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input
                                            type='email'
                                            name="email"
                                            placeholder='Enter your email'
                                            value={Logininputs.email}
                                            onChange={handleLoginChange}
                                        />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input
                                            type='password'
                                            name="password"
                                            placeholder='Enter your password'
                                            value={Logininputs.password}
                                            onChange={handleLoginChange}
                                        />
                                    </div>
                                    <div className="text"><Link to='/forgot-password' >ForgotPassword</Link></div>
                                    <div className="button input-box">
                                        <button type="submit" disabled={!Logininputs.email || !Logininputs.password}>
                                            Login
                                        </button>
                                    </div>
                                    <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
                                </div>
                            </form>
                        </div>
                        <div className="signup-form">
                            <div className="title">Signup</div>
                            <form onSubmit={handleRegisterSubmit}>
                                <ToastContainer position="top-center" />
                                <div className="input-boxes">
                                    <div className="input-box">
                                        <i className="fas fa-user"></i>
                                        <input type='text' name="name" placeholder='Enter your name' value={Registerinputs.name} onChange={handleRegisterChange} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-user"></i>
                                        <input type='text' name="user_name" placeholder='Enter user name' value={Registerinputs.user_name} onChange={handleRegisterChange} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-user"></i>
                                        <input type='tel' name="m_number" placeholder='91-xxxxxxxxxx' value={Registerinputs.m_number} onChange={handleRegisterChange} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-envelope"></i>
                                        <input type='email' name="email" placeholder='Enter your email' value={Registerinputs.email} onChange={handleRegisterChange} />
                                    </div>
                                    <div className="input-box">
                                        <i className="fas fa-lock"></i>
                                        <input type='password' name="password" placeholder='Enter your password' value={Registerinputs.password} onChange={handleRegisterChange} />
                                    </div>

                                    

                                        <div className="button input-box">
                                            <input type="submit" value="Submit" />
                                        </div>
                                        <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Registration_Login;
