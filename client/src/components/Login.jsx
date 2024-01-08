
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUser} from '../redux/slices/userSlice.js'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
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

        // Validate email
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Validate password
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if there are no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', formData);
            console.log('Server response:', response.data);
            dispatch(setUser(response.data.data))
          

            navigate('/')
        } catch (error) {
          
            console.error('Error submitting data:', error?.response?.data?.error);
            toast.error(error?.response?.data?.error);
        }
    };

    return (
        <div className="flex h-screen">
           
            <div className="w-full flex justify-center items-center text-center">
                <form className="bg-white p-8 rounded w-96" onSubmit={handleSubmit}>
                    <h2 className="text-2xl mb-4 text-center text-yellow-400 font-bold">Sign In to Your Account</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={validate}
                            placeholder="Email"
                            className="w-full px-3 py-2  focus:outline-none bg-gray-100"
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
                            placeholder="Password"
                            className="w-full px-3 py-2 bg-gray-100 focus:outline-none"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="px-10 bg-yellow-400 text-white py-2 rounded-3xl focus:outline-none focus:shadow-outline-blue"
                         >
                        SIGN IN
                    </button>
                </form>
            </div>
           
             <div className="md:w-5/12 md:flex-shrink-0 bg-cover bg-center relative hidden md:block">
                <div className="absolute top-1/3 left-0 right-0 text-center text-white p-4">
                    <h1 className="text-3xl font-semibold mb-5">Hello Friend!</h1>
                    <p>Enter you personal detail and<br/>start your journey with us</p>
                    <button className="border rounded-3xl px-10 mt-8 text-xs py-2" onClick={()=>navigate('/signup')}>SIGN UP</button>
                </div>
                <img
                    className="object-cover object-center w-full h-full"
                    src="https://images.pexels.com/photos/2680270/pexels-photo-2680270.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Sample"
                />
            </div>

        </div>
    );
};

export default Login;
