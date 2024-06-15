from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/emotions', methods=['POST'])
def calculate_percentages():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data
    print(type(data), type(data['affects'][0]))

    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 300



if __name__ == '__main__':
    app.run(debug=True)