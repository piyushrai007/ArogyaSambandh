import express from "express";
import bodyParser from 'body-parser';
import { XMLHttpRequest } from "xmlhttprequest";
import cors from 'cors';

// Rest of your code remains unchanged
 // Importing the CORS package

const app = express();
const PORT = process.env.PORT || 3001;

// Replace with your actual API key and scoring URL
const API_KEY = "kDGehsTB03MA0UYKjnFw1a2Qz3OQY_6ujedIoC5aqTYj";
const SCORING_URL = "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/5d6342f3-f798-4044-872e-740b741a3e14/predictions?version=2021-05-01";

// Enable CORS for all routes
app.use(cors());

// Enable JSON body parsing
app.use(bodyParser.json());

// Helper function to get IBM Cloud token
function getToken(callback) {
    const req = new XMLHttpRequest();
    req.open("POST", "https://iam.cloud.ibm.com/identity/token");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.onload = () => callback(null, JSON.parse(req.responseText));
    req.onerror = () => callback(req.statusText);
    req.send(`grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${API_KEY}`);
}

// Helper function to make a POST request to the IBM Cloud ML scoring endpoint
function apiPost(scoring_url, token, payload, callback) {
    const oReq = new XMLHttpRequest();
    oReq.open("POST", scoring_url);
    oReq.setRequestHeader("Accept", "application/json");
    oReq.setRequestHeader("Authorization", "Bearer " + token);
    oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    oReq.onload = () => callback(null, JSON.parse(oReq.responseText));
    oReq.onerror = () => callback(oReq.statusText);
    oReq.send(payload);
}

// Endpoint to handle scoring request
app.post('/score', (req, res) => {
    const inputPayload = req.body;

    // Step 1: Get the token
    getToken((err, tokenResponse) => {
        if (err) {
            return res.status(500).send({ error: 'Failed to obtain token' });
        }

        const token = tokenResponse.access_token;

        // Step 2: Use the token to make a scoring request
        apiPost(SCORING_URL, token, JSON.stringify(inputPayload), (err, scoringResponse) => {
            if (err) {
                return res.status(500).send({ error: 'Scoring request failed' });
            }

            res.send(scoringResponse);
        });
    });
});

// Endpoint to handle home route
app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
