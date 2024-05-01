from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Rest of your code...

# Load the trained MLP model
mlp_model = pickle.load(open("mlp.pkl", "rb"))

# Define a function to preprocess input data
def preprocess_input(data):
    try:
        # Convert input data to the appropriate data types
        data['age'] = int(data['age'])
        data['gender'] = int(data['gender'])
        data['height'] = int(data['height'])
        data['weight'] = float(data['weight'])
        data['ap_hi'] = int(data['ap_hi'])
        data['ap_lo'] = int(data['ap_lo'])
        data['cholesterol'] = int(data['cholesterol'])
        data['gluc'] = int(data['gluc'])
        data['smoke'] = int(data['smoke'])
        data['alco'] = int(data['alco'])
        data['active'] = int(data['active'])

        # Perform data preprocessing similar to the training data
        data['age'] = (data['age'] / 365).round().astype('int')
        data['bmi'] = data['weight'] / ((data['height'] / 100) ** 2)
        data['map'] = ((2 * data['ap_lo']) + data['ap_hi']) / 3
        data['age_group'] = pd.cut(data['age'], bins=[30, 35, 40, 45, 50, 55, 60, 65], labels=range(7), include_lowest=True, right=True)
        data['bmi'] = pd.cut(data['bmi'], bins=6, labels=range(6), right=True, include_lowest=True)
        data['map'] = pd.cut(data['map'], bins=6, labels=range(6), right=True, include_lowest=True)
        print(data['age_group'])
        # Convert gender to binary encoding (1 for male, 0 for female)
        data['gender'] = data['gender'].apply(lambda x: 1 if x == 1 else 0)

        # Select only the required columns
        processed_input = data[['cholesterol', 'gluc', 'smoke', 'active', 'age_group', 'bmi', 'map']]
        return processed_input
    except Exception as e:
        print(f"Error during input preprocessing: {e}")
        return None

# Define a route to render the HTML template
@app.route('/')
def index():
    return render_template('index.html')

# Define a route to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get user input from request
        user_input = request.json

        print(f"Received user input: {user_input}")

        # Preprocess user input
        processed_input = preprocess_input(pd.DataFrame(user_input, index=[0]))
        if processed_input is None:
            return jsonify({'error': 'Input preprocessing failed'})

        # Make prediction using MLP model
        prediction = mlp_model.predict(processed_input)
        print(f"Prediction: {prediction}")

        # Return prediction result
        return jsonify({'prediction': int(prediction[0])})
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'Prediction failed'})


if __name__ == '__main__':
    app.run(debug=True)