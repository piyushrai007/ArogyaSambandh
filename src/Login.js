import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;

        try {
            const response = await axios.post('https://piyushrai.pythonanywhere.com/api/login/', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                localStorage.setItem('refresh', response.data.refresh);
                if (response.data.user_type === 'doctor') {
                    navigate("/doctor-dashboard");
                } else if (response.data.user_type === 'patient') {
                    navigate("/patient-dashboard");
                }
            } else {
                setErrorMessage('Bad request. Please check your username and password.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h2 className="text-3xl font-semibold mb-4">Login</h2>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <label className="mb-2">
                    <span className="text-lg font-semibold">Username:</span>
                    <input name="username" type="text" placeholder="Username" required className="border rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500" />
                </label>
                <label className="mb-2">
                    <span className="text-lg font-semibold">Password:</span>
                    <input name="password" type="password" placeholder="Password" required className="border rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500" />
                </label>
                <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Login</button>
            </form>
            <p className="mt-4 text-gray-600">
                Don't have an account? <Link to="/" className="text-blue-500 hover:text-blue-700">Register</Link>
            </p>
        </div>
    );
}

export default Login;
