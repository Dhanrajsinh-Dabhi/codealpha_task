import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
    const [forgotInputs, setForgotInputs] = useState({
        email: '',
        user_question: '',
        user_question_answer_secret: '',
        new_password: '',
    });

    const handleForgotChange = (e) => {
        const { name, value } = e.target;
        setForgotInputs({ ...forgotInputs, [name]: value });
    }

    const handleForgotSubmit = async (e) => {
        e.preventDefault();

        console.log(JSON.stringify(forgotInputs));

        try {
            const response = await axios.post('http://localhost:3000/api/forgot-password', forgotInputs); // Ensure correct endpoint
            console.log('Response from server:', response.data);
            toast.success("Password reset successful!", {
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
            toast.error(err.response?.data?.message || 'Password reset failed.');
        }
    }

    return (
        <>
            <form onSubmit={handleForgotSubmit}>
                <ToastContainer position="top-center" />
                <div>
                    <label>Email:</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        value={forgotInputs.email}
                        onChange={handleForgotChange}
                        required
                    />
                </div>
                <div>
                    <label>Pick a question:</label>
                    <select
                        name="user_question"
                        value={forgotInputs.user_question}
                        onChange={handleForgotChange}
                        required>
                        <option value="">Select your question</option>
                        <option value="What is your favorite color?">What is your favorite color?</option>
                        <option value="What is your best friend's name?">What is your best friend's name?</option>
                        <option value="Which city were you born in?">Which city were you born in?</option>
                    </select>
                </div>
                <div>
                    <label>Answer:</label>
                    <input
                        type='text'
                        name='user_question_answer_secret'
                        placeholder='Enter your answer'
                        value={forgotInputs.user_question_answer_secret}
                        onChange={handleForgotChange}
                        required
                    />
                </div>
                <div>
                    <label>New Password:</label>
                    <input
                        type='password'
                        name='new_password'
                        placeholder='Enter new password'
                        value={forgotInputs.new_password}
                        onChange={handleForgotChange}
                        required
                    />
                </div>
                <div>
                    <input type='submit' value="Submit" />
                </div>
            </form>
        </>
    );
}

export default ForgotPassword;
