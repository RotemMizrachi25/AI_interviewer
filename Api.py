from flask import Flask, request, jsonify
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
app = Flask(__name__)
CORS(app)

@app.route('/weighted_emotions', methods=['POST'])
def weighted_emotions():
    weights = {
        'happiness': 1.0,
        'sadness': 0.8,
        'fear': 0.6,
        'disgust': 0.4,
        'anger': 0.7,
        'surprise': 0.5
    }
    weighted_score = 0
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    for key, val in data['affects'][0].items():
        if key in weights:
            weighted_score += val * weights[key]
    
    return jsonify({'weighted_score': weighted_score, 'yourData': data}), 200

@app.route('/recommendations', methods=['POST'])
def recommendations():
    recommendations = []
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    dominant_emotions = [key for key, val in data['affects'][0].items() if val > 0.5]
    
    if 'fear' in dominant_emotions or 'anxiety' in dominant_emotions:
        recommendations.append('Take a deep breath and try to relax.')
    if 'happiness' in dominant_emotions:
        recommendations.append('Keep up the positive attitude!')
    if 'sadness' in dominant_emotions:
        recommendations.append('Try to focus on positive thoughts.')

    return jsonify({'recommendations': recommendations, 'yourData': data}), 200


@app.route('/affects', methods=['POST'])
def dominante_moods():
    dominante = []
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data
    print(type(data), type(data['affects'][0]))

    for key,val in data['affects'][0].items():
        if val > 0.5:
            dominante.append(key)

    print("dominate feelings are: " + ", ".join(dominante))
        
    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200

@app.route('/valence', methods=['POST'])
def valence():
    dominante = []
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data
    print(type(data), type(data['affects'][0]))

    for key,val in data['affects'][0].items():
        if val > 0.5:
            dominante.append(key)

    print("dominate feelings are: " + ", ".join(dominante))
        
    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200

@app.route('/arousel', methods=['POST'])
def arousel():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    count = sum(1 for value in data['arousel'] if value > 0.5)
    total = len(data)
    percentage = (count / total) * 100
    print("you had your arousel on the interview " + percentage + "precent of the time")
    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200

@app.route('/attention', methods=['POST'])
def attention():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data

    count = sum(1 for value in data['attention'] if value > 0.5)
    total = len(data)
    percentage = (count / total) * 100
    print("you had your attention to the interview " + percentage + "precent of the time")

        
    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200

@app.route('/emotion_graph', methods=['POST'])
def emotion_graph():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400

    emotions = data['affects'][0]
    names = list(emotions.keys())
    values = list(emotions.values())

    plt.figure(figsize=(10, 5))
    plt.bar(names, values)
    plt.xlabel('Emotions')
    plt.ylabel('Intensity')
    plt.title('Emotion Analysis')

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf8')

    return jsonify({'emotion_graph': img_base64, 'yourData': data}), 200

"""
machine learning 
"""
"""
# Define typical emotional profiles for successful and unsuccessful candidates
successful_profile = {
    'happiness': 0.8,
    'sadness': 0.1,
    'fear': 0.2,
    'disgust': 0.1,
    'anger': 0.1,
    'surprise': 0.3
}

unsuccessful_profile = {
    'happiness': 0.3,
    'sadness': 0.4,
    'fear': 0.6,
    'disgust': 0.5,
    'anger': 0.5,
    'surprise': 0.2
}

# Generate synthetic data
def generate_data(profile, label, n_samples=100):
    data = []
    for _ in range(n_samples):
        sample = {key: np.clip(np.random.normal(value, 0.1), 0, 1) for key, value in profile.items()}
        sample['success'] = label
        data.append(sample)
    return data

# Generate 100 samples for successful and unsuccessful candidates
successful_data = generate_data(successful_profile, 1, n_samples=100)
unsuccessful_data = generate_data(unsuccessful_profile, 0, n_samples=100)

# Combine data and create DataFrame
data = pd.DataFrame(successful_data + unsuccessful_data)

# Prepare features and labels
X = data.drop('success', axis=1)
y = data['success']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train logistic regression model
model = LogisticRegression()
model.fit(X_train_scaled, y_train)

# Predict success
@app.route('/predict_success', methods=['POST'])
def predict_success():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    candidate_profile = pd.DataFrame([data['affects'][0]])
    candidate_profile_scaled = scaler.transform(candidate_profile)
    
    success_prob = model.predict_proba(candidate_profile_scaled)[0][1]
    
    return jsonify({'success_probability': success_prob, 'yourData': data}), 200

# Example: Evaluate model accuracy
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model accuracy: {accuracy}")
"""

if __name__ == '__main__':
    app.run(port=5000)