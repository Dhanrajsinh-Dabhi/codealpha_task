import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import e from 'cors';
import { Form } from 'react-router-dom';


function Registration() {


    const [inputs, setInputs] = useState({
        name: '',
        m_number: '',
        email: '',
        password: '',
        // gender: [male,female],

    });

    const[ok,setOk]=useState(false);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
        
    }
    const handleSubmit = async (e)   => {
        e.preventDefault();

        const data = JSON.stringify(inputs);
        console.log(data);

            try{
            const response = await axios.post('http://localhost:3000/api/register', {
                ...inputs
            });
            // .then((resp)=>setOk(resp.data.ok))
            setOk(response.data.ok)
          
                console.log('Response from server:', response.data)
            }
            catch ( err) {
                toast.error(err.response.data );
            }
        
            
        };


    return (
        <>
            <form onSubmit={handleSubmit}>
            <ToastContainer position="top-center" />  
                <h3>Full NAme:{inputs.name}</h3>
                <input type='text' name="name" placeholder='enter your name' value={inputs.name} onChange={handleChange} />


                <h3>Mobile NO:{inputs.m_number}</h3>
                <input type='tel' name="m_number" placeholder='91-xxxxxxxxxx' value={inputs.m_number} onChange={handleChange} />



                <h3>Email:{inputs.email}</h3>
                <input type='email' name="email" placeholder='enter your email' value={inputs.email} onChange={handleChange} />

                <h3>Password:{inputs.password}</h3>
                <input type='password' name="password" placeholder='enter your password' value={inputs.password} onChange={handleChange} />


                <br></br>
                <button disabled={ !inputs.name || !inputs.m_number || !inputs.email  ||  !inputs.password }>register</button>
            </form>


        </>
    );
}

export default Registration;






