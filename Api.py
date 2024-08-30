import base64
import io
import os
import matplotlib.pyplot as plt
from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
from JobInterviewAI import generate_questions,content_analyzer
import threading
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)
import speechTotext

FILE_DIRECTORY = os.getcwd()
feelings = {}

@app.route('/weighted_emotions', methods=['POST'])
def weighted_emotions():
    weights = {
        'Afraid': 0.7,
        'Amused': 0.9,
        'Angry': 0.8,
        'Annoyed': 0.6,
        'Uncomfortable': 0.5,
        'Anxious': 0.8,
        'Apathetic': 0.6,
        'Astonished': 0.8,
        'Bored': 0.4,
        'Worried': 0.7,
        'Calm': 0.9,
        'Conceited': 0.5,
        'Contemplative': 0.5,
        'Content': 0.8,
        'Convinced': 0.7,
        'Delighted': 1.0,
        'Depressed': 0.7,
        'Determined': 0.8,
        'Disappointed': 0.7,
        'Discontented': 0.5,
        'Distressed': 0.7,
        'Embarrassed': 0.6,
        'Enraged': 0.7,
        'Excited': 1.0,
        'Feel Well': 0.9,
        'Frustrated': 0.7,
        'Happy': 1.0,
        'Hopeful': 0.9,
        'Impressed': 0.8,
        'Melancholic': 0.6,
        'Peaceful': 0.9,
        'Pensive': 0.6,
        'Pleased': 0.8,
        'Relaxed': 0.9,
        'Sad': 0.7,
        'Satisfied': 0.8,
        'Sleepy': 0.4,
        'Tired': 0.5
    }

    weighted_score = 0
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400
    
    for key, val in data['affects'][0].items():
        if key in weights:
            weighted_score += val * weights[key]
    
    # Thresholds
    max_possible_score = sum(weights.values())  # 31.4 based on the provided weights
    high_threshold = 0.8 * max_possible_score  # 80% of maximum score
    medium_threshold = 0.6 * max_possible_score  # 60% of maximum score

    # Determine the outcome based on the weighted score
    if weighted_score > high_threshold:
        outcome = "High likelihood of passing the interview"
    elif medium_threshold <= weighted_score <= high_threshold:
        outcome = "Moderate/neutral outcome; further evaluation needed"
    else:
        outcome = "Low likelihood of passing the interview"
    
    print(f"Weighted Score: {weighted_score}")
    print(f"Outcome: {outcome}")
    
    return jsonify({'weighted_score': weighted_score, 'outcome': outcome, 'yourData': data}), 200




@app.route('/recommendations', methods=['POST'])
def recommendations():
    recommendations = []
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data received'}), 400

    # Identify dominant emotions (those with values greater than 0.5)
    dominant_emotions = {key: val for key, val in data['affects'][0].items() if val > 0.5}

    # Provide recommendations based on dominant emotions
    if 'Afraid' in dominant_emotions or 'Anxious' in dominant_emotions:
        recommendations.append('Take a deep breath, maintain eye contact, and try to stay calm.')

    if 'Amused' in dominant_emotions:
        recommendations.append('Your lightheartedness is good, but ensure it aligns with the interview’s tone.')

    if 'Angry' or 'Annoyed' in dominant_emotions:
        recommendations.append('Try to manage your frustration, as it can negatively impact your responses.')

    if 'Uncomfortable' in dominant_emotions:
        recommendations.append('Try to focus on your strengths and be more confident in your abilities.')

    if 'Apathetic' in dominant_emotions:
        recommendations.append('Show more enthusiasm for the role to convey genuine interest.')

    if 'Astonished' in dominant_emotions:
        recommendations.append('If something surprises you, stay composed and provide thoughtful responses.')

    if 'Bored' in dominant_emotions:
        recommendations.append('Engage more actively in the conversation to show interest.')

    if 'Worried' in dominant_emotions:
        recommendations.append('Prepare thoroughly to boost your confidence and ease your concerns.')

    if 'Calm' in dominant_emotions:
        recommendations.append('Your calm demeanor is a strong asset. Keep it up.')

    if 'Conceited' in dominant_emotions:
        recommendations.append('Balance confidence with humility to avoid coming across as arrogant.')

    if 'Contemplative' in dominant_emotions:
        recommendations.append('Reflective thinking is good, but ensure you respond in a timely manner.')

    if 'Content' in dominant_emotions:
        recommendations.append('Maintain this positive mindset, it reflects well on you.')

    if 'Convinced' in dominant_emotions:
        recommendations.append('Confidence in your answers is good, but remain open to feedback.')

    if 'Delighted' in dominant_emotions:
        recommendations.append('Your enthusiasm is infectious! Keep it up.')

    if 'Depressed' in dominant_emotions:
        recommendations.append('Focus on your strengths and what excites you about the role.')

    if 'Determined' in dominant_emotions:
        recommendations.append('Your determination is impressive, channel it into clear, concise answers.')

    if 'Disappointed' in dominant_emotions:
        recommendations.append('Try to stay positive and focus on what you can control in the interview.')

    if 'Discontented' in dominant_emotions:
        recommendations.append('Highlight aspects of the role that you find appealing.')

    if 'Distressed' in dominant_emotions:
        recommendations.append('Take a moment to collect yourself, and focus on your core competencies.')

    if 'Embarrassed' in dominant_emotions:
        recommendations.append('Everyone makes mistakes; recover quickly and move on.')

    if 'Enraged' in dominant_emotions:
        recommendations.append('Try to remain composed and redirect your energy into positive communication.')

    if 'Excited' in dominant_emotions:
        recommendations.append('Your excitement is great! Just ensure it doesn’t overwhelm your focus.')

    if 'Feel Well' in dominant_emotions:
        recommendations.append('You’re in a good place emotionally. Keep your confidence high.')

    if 'Frustrated' in dominant_emotions:
        recommendations.append('Try to channel your frustration into constructive feedback.')

    if 'Happy' in dominant_emotions:
        recommendations.append('Your positive energy is a great asset. Keep it up!')

    if 'Hopeful' in dominant_emotions:
        recommendations.append('Hopefulness is a great mindset. Use it to inspire confidence in your answers.')

    if 'Impressed' in dominant_emotions:
        recommendations.append('If something impresses you, acknowledge it, but stay focused on your goals.')

    if 'Melancholic' in dominant_emotions:
        recommendations.append('Try to shift your focus to positive outcomes and experiences.')

    if 'Peaceful' in dominant_emotions:
        recommendations.append('Your peaceful demeanor is beneficial, maintain your composure.')

    if 'Pensive' in dominant_emotions:
        recommendations.append('Thoughtfulness is good, but be sure to articulate your thoughts clearly.')

    if 'Pleased' in dominant_emotions:
        recommendations.append('Your satisfaction shows. Keep your energy positive and engaging.')

    if 'Relaxed' in dominant_emotions:
        recommendations.append('Your relaxation is a strength, just stay engaged and alert.')

    if 'Sad' in dominant_emotions:
        recommendations.append('Focus on what excites you about the role and what you can contribute.')

    if 'Satisfied' in dominant_emotions:
        recommendations.append('Your contentment is positive. Keep your energy steady and strong.')

    if 'Sleepy' in dominant_emotions:
        recommendations.append('Try to boost your energy before the interview; a quick walk might help.')

    if 'Tired' in dominant_emotions:
        recommendations.append('Stay hydrated and focused; push through the fatigue with enthusiasm.')

    # If no specific dominant emotions, provide general advice
    if not recommendations:
        recommendations.append('Stay positive and confident. Preparation is key to success.')

    return jsonify({'recommendations': recommendations, 'yourData': data}), 200




@app.route('/submit', methods=['POST'])
def submit_data():
    data = request.json
    interviewer_type = data.get('interviewerId')
    field = data.get('field')
    role = data.get('role')
    print(interviewer_type,field,role)
    response = generate_questions(field, interviewer_type, role)
    #response = {'question 1': 'Can you explain the concept of RESTful API and how you have implemented it in your projects?', 'question 2': 'How do you handle asynchronous operations in JavaScript, and what are the potential pitfalls to watch out for?', 'question 3': 'Could you walk me through your experience with database normalization and how it has helped improve database performance in your projects?', 'question 4': 'In your opinion, what are the key differences between unit testing and integration testing, and how do you decide which approach to take in your projects?', 'question 5': 'Can you discuss a challenging bug you encountered in one of your projects and how you approached debugging and resolving it?', 'question 6': 'How do you ensure the security of user data in your applications, especially when handling sensitive information like passwords?', 'question 7': 'Describe your experience with version control systems like Git, including branching strategies and how you handle conflicts in collaborative projects.', 'question 8': 'What is your approach to optimizing the performance of web applications, and can you share a specific example where you improved the speed or efficiency of a project?', 'question 9': 'How do you stay up-to-date with the latest technologies and trends in the field of full-stack development, and how do you decide which ones to incorporate into your work?', 'question 10': 'Explain a project where you had to work with a third-party API and the challenges you faced integrating it into your application.', 'question 11': 'Discuss a time when you had to make trade-offs between delivering a feature on time and ensuring code quality. How did you handle that situation?', 'question 12': 'What is your experience with containerization technologies like Docker, and how have you used them to streamline the deployment process in your projects?', 'question 13': "How do you approach code reviews in your team, and what criteria do you consider when providing feedback on your colleagues' code?", 'question 14': 'Can you explain the concept of CORS (Cross-Origin Resource Sharing) and how you address CORS issues in your web applications?', 'question 15': 'Describe a project where you had to scale the application to accommodate a growing user base. What challenges did you face, and how did you ensure scalability and performance under increased load?'}
    print(response)
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
    #answer = speechTotext.record(data["language"])
    answer = []
    thread = threading.Thread(target=speechTotext.record, args=(data["language"],answer))
    thread.start()
    thread.join()
    print(answer)
    while True:
        if len(feelings)>0:
            break
    print(feelings)
    emotion_graph()
    if answer is not []:
         analysis = content_analyzer(data["field"], data["question"], answer[0],feelings.keys())
    else:
         analysis = content_analyzer(data["field"], data["question"], "",feelings.keys())
    print(analysis)
    #analysis = {"disadvantage1":"","disadvantage2":"","advantage1":"","advantage2":"","suggestion1":"","suggestion2":"","revised answer":""}
    #print(analysis)
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

    #print("Received data:", data)  # Log the received data

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
