// src/App.js
import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


const Signup = () => {

    const navigate =useNavigate()


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        // Validate name
        if (formData.name.trim() === '') {
            newErrors.name = 'Name is required';
        }

        // Validate email
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Validate password
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate();
        if (Object.values(errors).some((error) => error !== '')) {
            return;
        }

        console.log('Form submitted:', formData); 
        try {
            console.log("hello");
            await axios.post('http://localhost:3001/signup', formData)
           
            navigate('/login')

        } catch (error) {
         
            console.error('Error submitting data:', error.response.data.error);
            toast.error(error.response.data.error);
        }
            

    };

    return (
        <div className="flex h-screen">

            <div className="md:w-5/12 md:flex-shrink-0 bg-cover bg-center hidden md:block relative">
                <div className="  absolute top-1/3 left-0 right-0 text-center text-white p-4 ">
                    <h1 className='text-3xl font-semibold mb-5'>Welcome Back!</h1>
                    <p>To keep conected with us please<br></br> login with your personal info</p>
                    <button className='border rounded-3xl px-10 mt-8 text-xs py-2' onClick={()=>navigate('/login')}>SIGN IN</button>
                </div>
                <img
                    className="object-cover object-center w-full h-full"
                    src="https://images.pexels.com/photos/2680270/pexels-photo-2680270.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Sample"
                />
            </div>

            <div className="w-full flex justify-center items-center text-center">
                <form className="bg-white p-8 rounded w-96" onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4 text-center text-yellow-400 font-bold">Create Account</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={validate}
                            placeholder='Name'
                            className="w-full px-3 py-2  focus:outline-none bg-gray-100"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={validate}
                            placeholder='Email'
                            className="w-full px-3 py-2 bg-gray-100 focus:outline-none"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={validate}
                            placeholder='Password'
                            className="w-full px-3 py-2 bg-gray-100 focus:outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="px-10 bg-yellow-400 text-white py-2 rounded-3xl focus:outline-none focus:shadow-outline-blue"
                    >
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
