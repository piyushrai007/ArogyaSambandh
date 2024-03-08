import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const navigate = useNavigate();

    const register = () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('user_type', userType);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('address_line1', addressLine1);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('pincode', pincode);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture, profilePicture.name);
        }

        axios.post('https://piyushrai.pythonanywhere.com/api/register/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log(response);
            navigate("/login");
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
            <h2 className="text-3xl font-semibold text-white mb-6">Register</h2>
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="input-field" />
                <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="input-field mt-2" />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="input-field mt-2" />
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="input-field mt-2" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="input-field mt-2" />
                <select onChange={(e) => setUserType(e.target.value)} className="input-field mt-2">
                    <option value="">Select User Type</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                </select>
                <input type="text" placeholder="Address Line 1" onChange={(e) => setAddressLine1(e.target.value)} className="input-field mt-2" />
                <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} className="input-field mt-2" />
                <input type="text" placeholder="State" onChange={(e) => setState(e.target.value)} className="input-field mt-2" />
                <input type="text" placeholder="Pincode" onChange={(e) => setPincode(e.target.value)} className="input-field mt-2" />
                <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} className="mt-4" />
                <button onClick={register} className="btn mt-4">Register</button>
            </div>
            <p className="mt-4 text-white">
                Already have an account? <a href="/login" className="text-blue-200 hover:text-blue-300">Login</a>
            </p>
        </div>
    );
}

export default Registration;
