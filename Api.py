import base64
import io
import os
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from JobInterviewAI import generate_questions,content_analyzer
import threading

app = Flask(__name__)
CORS(app)
import speechTotext

FILE_DIRECTORY = os.getcwd()
feelings = {}

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
    role = data.get('role')
    print(interviewer_type,field,role)
    #response = generate_questions(field, interviewer_type)
    response = {'question 1': 'Can you explain the concept of RESTful API and how you have implemented it in your projects?', 'question 2': 'How do you handle asynchronous operations in JavaScript, and what are the potential pitfalls to watch out for?', 'question 3': 'Could you walk me through your experience with database normalization and how it has helped improve database performance in your projects?', 'question 4': 'In your opinion, what are the key differences between unit testing and integration testing, and how do you decide which approach to take in your projects?', 'question 5': 'Can you discuss a challenging bug you encountered in one of your projects and how you approached debugging and resolving it?', 'question 6': 'How do you ensure the security of user data in your applications, especially when handling sensitive information like passwords?', 'question 7': 'Describe your experience with version control systems like Git, including branching strategies and how you handle conflicts in collaborative projects.', 'question 8': 'What is your approach to optimizing the performance of web applications, and can you share a specific example where you improved the speed or efficiency of a project?', 'question 9': 'How do you stay up-to-date with the latest technologies and trends in the field of full-stack development, and how do you decide which ones to incorporate into your work?', 'question 10': 'Explain a project where you had to work with a third-party API and the challenges you faced integrating it into your application.', 'question 11': 'Discuss a time when you had to make trade-offs between delivering a feature on time and ensuring code quality. How did you handle that situation?', 'question 12': 'What is your experience with containerization technologies like Docker, and how have you used them to streamline the deployment process in your projects?', 'question 13': "How do you approach code reviews in your team, and what criteria do you consider when providing feedback on your colleagues' code?", 'question 14': 'Can you explain the concept of CORS (Cross-Origin Resource Sharing) and how you address CORS issues in your web applications?', 'question 15': 'Describe a project where you had to scale the application to accommodate a growing user base. What challenges did you face, and how did you ensure scalability and performance under increased load?'}
    print(response)
    return jsonify(response)


@app.route('/affects', methods=['POST'])
def dominante_moods():
    global feelings
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    #print("Received data:", data)  # Log the received data
    #print(type(data), type(data['affects'][0]))

    # show_feelings(data['affects'])
    mean_data = mean_calc(data['affects'])
    print(mean_data)
    temp ={}
    for key, value in mean_data.items():
        if value > 0.65:
            temp[key]=value
    feelings.update(temp)
    print(feelings)

    # for key, val in data['affects'][0].items():
    #     if val > 0.5:
    #         dominante.append(key)
    #
    # print("dominate feelings are: " + ", ".join(dominante))

    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200


def show_feelings(data_received):
    data = {}
    # how many times the feeling was above 0.6
    for sample in data_received:
        for feeling, value in sample.items():
            if feeling in data and sample[feeling] >= 0.6:
                data[feeling] += 1
            elif sample[feeling] >= 0.6:
                data[feeling] = 1
    print(data)

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

@app.route('/valence', methods=['POST'])
def valence():
    dominante = []
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    valence = sum(data['valence'])/len(data['valence'])

    print("valence:", valence)  # Log the received data

    # Example: return received data or some processed result
    if valence > -0.3 and valence < 0.3:
        return "Natural"
    elif valence > 0.3:
        return "Positive"
    else:
        return "Negative"


@app.route('/record', methods=['POST'])
def recorder():
    global feelings
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data
    # call function to analyze the content 
    # answer = speechTotext.record(data["language"])
    answer = []
    # thread = threading.Thread(target=speechTotext.record, args=(data["language"],answer))
    # thread.start()
    # thread.join()
    print(answer)
    while True:
        if len(feelings)>0:
            break
    print(feelings)
    # if answer is not []:
    #     analysis = content_analyzer(data["field"], data["question"], answer[0],feelings.keys())
    # else:
    #     analysis = content_analyzer(data["field"], data["question"], "",feelings.keys())
    #print(analysis)
    analysis = {"disadvantage1":"","disadvantage2":"","advantage1":"","advantage2":"","suggestion1":"","suggestion2":"","revised answer":""}
    print(analysis)
    return analysis

    # Example: return received data or some processed result
    return jsonify({'message': 'Data processed', 'yourData': data}), 200

@app.route('/stop-recording', methods=['POST'])
def stop_recording():
    global should_stop
    speechTotext.stop_recording()

    return jsonify({'status': 'Recording stopping'}), 200

@app.route('/arousal', methods=['POST'])
def arousal():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400
    print(data)
    count = sum(data['arousal'])
    total = len(data['arousal'])
    percentage = (count / total)
    print("you had your arousal on the interview " + str(percentage) + "% of the time")
    if percentage > -0.3 and percentage < 0.3:
        return "Natural"
    elif percentage >0.3:
        return "Positive"
    else:
        return "Negative"


@app.route('/attention', methods=['POST'])
def attention():
    data = request.get_json()  # This will get the JSON data sent with the POST
    if not data:
        return jsonify({'error': 'No data received'}), 400

    print("Received data:", data)  # Log the received data

    count = sum(data['attention'])
    total = len(data['attention'])
    percentage = (count / total) * 100
    print("you had your attention to the interview " + str(percentage) + "%  of the time")

    # Example: return received data or some processed result
    return round(percentage)

@app.route('/media/<path:filename>')
def serve_file(filename):
    return send_from_directory(FILE_DIRECTORY, filename)


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
