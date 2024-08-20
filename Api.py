from flask import Flask, request, jsonify
from flask_cors import CORS
from JobInterviewAI import generate_questions
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

@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    interviewer_type = data.get('interviewerId')
    field = data.get('field')
    print(interviewer_type,field)
    response = generate_questions(field, interviewer_type)
    print(response)
    return jsonify(response)

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

if __name__ == '__main__':
    app.run(port=5000)