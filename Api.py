import os
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from JobInterviewAI import generate_questions,content_feelings_analyzer
import threading
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)
import speechTotext

FILE_DIRECTORY = os.getcwd()
feelings = {}


@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    interviewer_type = data.get('interviewerId')
    field = data.get('field')
    role = data.get('role')
    print(interviewer_type,field,role)
    response = generate_questions(field, interviewer_type, role)
    return jsonify(response)


@app.route('/affects', methods=['POST'])
def dominante_moods():
    global feelings
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    mean_data = mean_calc(data['affects'])
    print(mean_data)
    temp ={}
    for key, value in mean_data.items():
        if value > 0.65:
            temp[key]=value
    feelings.update(temp)
    print(feelings)
    return feelings




@app.route('/valence', methods=['POST'])
def valence():
    data = request.get_json()  # Get the JSON data sent with the POST request
    if not data or 'valence' not in data:
        return jsonify({'error': 'No valence data received'}), 400

    valence_values = data['valence']

    if not isinstance(valence_values, list) or len(valence_values) == 0:
        return jsonify({'error': 'Valence data is not a valid non-empty list'}), 400

    # Calculate the average valence
    average_valence = sum(valence_values) / len(valence_values)

    # Determine the level of pleasantness based on the average valence
    if average_valence > 0.25:
        pleasantness_level = "Positive"
    elif average_valence < (-0.25):
        pleasantness_level = "Negative"
    else:
        pleasantness_level = "Neutral"

    # Return the processed results
    return jsonify({
        'pleasantness_level': pleasantness_level
    }), 200



def mean_calc(data_received):
    mean_data = {}
    samples_counter = len(data_received)
    for sample in data_received:
        for feeling, value in sample.items():
            if feeling in mean_data:
                mean_data[feeling] += value
            else:
                mean_data[feeling] = value
    for feeling, value in mean_data.items():
        mean_data[feeling] = value / samples_counter
    return mean_data


@app.route('/record', methods=['POST'])
def recorder():
    global feelings
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data
    # call function to analyze the content
    answer = []
    thread = threading.Thread(target=speechTotext.record, args=(data["language"],answer))
    thread.start()
    thread.join()
    while True:
        if len(feelings)>0:
            break
    print(feelings)
    emotion_graph()
    if answer is not []:
         analysis = content_feelings_analyzer(data["field"], data["question"], answer[0],feelings.keys())
    else:
         analysis = content_feelings_analyzer(data["field"], data["question"], "",feelings.keys())
    return analysis


@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    global should_stop
    speechTotext.stop_recording()

    return jsonify({'status': 'Recording stopping'}), 200

@app.route('/arousal', methods=['POST'])
def arousal():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data or 'arousal' not in data:
        return jsonify({'error': 'No arousal data received'}), 400

    arousal_values = data['arousal']
    total = len(arousal_values)

    if total == 0:
        return jsonify({'error': 'No arousal values provided'}), 400

    positive_count = sum(1 for value in arousal_values if value > 0)
    negative_count = sum(1 for value in arousal_values if value < 0)

    positive_percentage = (positive_count / total) * 100
    negative_percentage = (negative_count / total) * 100

    # Determine the overall arousal state
    if positive_percentage > negative_percentage:
        overall_arousal = "Positive"
    elif negative_percentage > positive_percentage:
        overall_arousal = "Negative"
    else:
        overall_arousal = "Neutral"

    # Output message
    print(f"Positive arousal: {positive_percentage}%")
    print(f"Negative arousal: {negative_percentage}%")
    print(f"Overall arousal: {overall_arousal}")

    # Return the processed data with arousal state
    return jsonify({
        'positive_percentage': positive_percentage,
        'negative_percentage': negative_percentage,
        'overall_arousal': overall_arousal,
        'yourData': data
    }), 200


@app.route('/attention', methods=['POST'])
def attention():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400


    count = sum(data['attention'])
    total = len(data['attention'])
    percentage = (count / total) * 100
    print("you had your attention to the interview " + str(percentage) + "%  of the time")

    # Return the processed data with attention percentage
    return jsonify({
        'percentage_attention': round(percentage),
    }), 200


@app.route('/media/<path:filename>')
def serve_file(filename):
    return send_from_directory(FILE_DIRECTORY, filename)


def emotion_graph():
    global feelings
    try:
        plt.figure(figsize=(6, 4))
        plt.bar(feelings.keys(), feelings.values(), color='skyblue')
        plt.xlabel('Emotions')
        plt.ylabel('Values')
        plt.title('Emotions')
        plt.xticks(rotation=45, ha="right")  # Rotate labels for better readability
        plt.tight_layout()

        # Save the plot as an image file
        plt.savefig(os.path.join(FILE_DIRECTORY,'emotions.png'))
        feelings.clear()

    except Exception as e:
        print(f"Failed to generate or save the plot: {e}")


if __name__ == '__main__':
    app.run(port=5000)
