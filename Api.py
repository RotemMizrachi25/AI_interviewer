from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/emotions', methods=['POST'])
def calculate_percentages():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid input'}), 400

    total_appearances = sum(data.values())
    if total_appearances == 0:
        return jsonify({emotion: 0 for emotion in data}), 200

    percentages = {emotion: (count / total_appearances) * 100 for emotion, count in data.items()}
    return jsonify(percentages), 200


if __name__ == '__main__':
    app.run(debug=True)