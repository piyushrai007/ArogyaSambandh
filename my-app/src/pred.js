import React, { useState } from 'react';
import axios from 'axios';

function PredictionModel() {
    const [predictionResult, setPredictionResult] = useState(null);
    const [formData, setFormData] = useState({
        age: '',
        gender: '1',
        height: '',
        weight: '',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '',
        gluc: '',
        smoke: '0',
        alco: '0',
        active: '0'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert age to days
        const ageInDays = formData.age * 365;
        const requestData = {
            ...formData,
            age: ageInDays
        };

        // Send data in JSON format
        axios.post('https://arogyasambandh.onrender.com/predict', requestData)
            .then(response => {
                setPredictionResult(response.data.prediction);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Cardiovascular Disease Prediction</h1>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-4">
                    <label htmlFor="age" className="block font-semibold">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="gender" className="block font-semibold">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required>
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="height" className="block font-semibold">Height (in cm):</label>
                    <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="weight" className="block font-semibold">Weight (in kg):</label>
                    <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="ap_hi" className="block font-semibold">Systolic blood pressure (mmHg):</label>
                    <input type="number" id="ap_hi" name="ap_hi" value={formData.ap_hi} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="ap_lo" className="block font-semibold">Diastolic blood pressure (mmHg):</label>
                    <input type="number" id="ap_lo" name="ap_lo" value={formData.ap_lo} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="cholesterol" className="block font-semibold">Cholesterol:</label>
                    <input type="number" id="cholesterol" name="cholesterol" value={formData.cholesterol} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="gluc" className="block font-semibold">Glucose:</label>
                    <input type="number" id="gluc" name="gluc" value={formData.gluc} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="smoke" className="block font-semibold">Smoking:</label>
                    <select id="smoke" name="smoke" value={formData.smoke} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="alco" className="block font-semibold">Alcohol intake:</label>
                    <select id="alco" name="alco" value={formData.alco} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="active" className="block font-semibold">Physical activity:</label>
                    <select id="active" name="active" value={formData.active} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded" required>
                        <option value="1">Active</option>
                        <option value="0">Not active</option>
                    </select>
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600">Predict</button>
                </div>
            </form>
            {predictionResult !== null && (
                <div className="mt-8">
                    Prediction: {predictionResult === 0 ? 'No chances of Cardiovascular Disease' : 'High chances of Cardiovascular Disease'}
                </div>
            )}
        </div>
    );
}

export default PredictionModel;