from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

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

    count = sum(1 for value in data if value > 0.5)
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

    count = sum(1 for value in data if value > 0.5)
    total = len(data)
    percentage = (count / total) * 100
    print("you had your attention to the interview " + percentage + "precent of the time")

        
    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200


if __name__ == '__main__':
    app.run(port=5000)