import os
from openai import OpenAI
import json
from google.cloud import texttospeech
# Retrieve the password from the environment variable
openai_password = os.getenv('OPENAI_PASSWORD')

client = OpenAI(api_key=openai_password)

def generate_chat_call(user_message, temprature=1):
    system_message = "You are an interviewer."

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            temperature=temprature,
            max_tokens=1812,
            top_p=0.95,
            frequency_penalty=0,
            presence_penalty=0,
            n=5  # Request multiple completions
        )

        answer = response.choices[0].message.content
        # print(answer)
        return answer
    except Exception as e:
        print(f"Failed to fetch or parse JSON data from the API: {e}")


def content_feelings_analyzer(field, question, answer, feelings):
    user_massage = f"I'm a applying for a new job in {field}. In my interview I got this question:" \
                   f"{question}. I answered: {answer}." \
                    f"the dominant feelings I felt during my answer: {feelings}"\
                   f"give me 2 disadvantages and 2 advantages in my answer. give me 1 suggestion of changes I could " \
                   f"say to " \
                   f"improve my answer and 1 suggestion of the feelings I should show during the interview" \
                   f"and  1 revised answer." \
                   f" If the disadvantage/advantage/suggestion are minor write none" \
                   f"Answer in json:" \
                   f"[disadvantage1]:[the disadvantage/none]" \
                   f"[disadvantage2]:[the disadvantage/none]" \
                   f"[advantage1]:[the advantage/none]" \
                   f"[advantage2]:[the advantage/none]" \
                   f"[suggestion1]:[the suggestion/none]" \
                   f"[suggestion2]:[the suggestion of feelings]" \
                   f"[revised answer]:[the revised answer]"
    return generate_chat_call(user_massage, 0.9)


def question_generator_friendly(field, role):
    user_massage = f"Act as a friendly interviewer. You should interview me for a job in {field}." \
                   f"Ask questions that focus on my passions, motivations, and how they fit into the team culture for {role} " \
                   f"The tone should be warm, supportive, and conversational." \
                   f"write 15 questions." \
                   f" Answer in Json: " \
                   f"question:[the question]" \
                   f"question:[the question]" \
                   f"question:[the question]"

    return generate_chat_call(user_massage, 0.9)


def question_generator_behave(field, role):
    user_massage = f"Act as a behavior interviewer. You should interview me for a job in {field}." \
                   f"Ask questions that require to reflect on my previous experiences, focusing on teamwork, leadership, " \
                   f"and decision-making in {role}. "\
                   f"The tone should be professional." \
                   f"write 15 questions." \
                   f" Answer in Json: " \
                   f"question:[the question]" \
                   f"question:[the question]" \
                   f"question:[the question]"

    return generate_chat_call(user_massage, 0.9)


def question_generator_technical(field, role):
    user_massage = f"Act as a strict technical interviewer. You should interview me for a job in {field}." \
                   f"Ask questions about technologies, coding practices, and real-world technical challenges relevant to {role}. "\
                   f"The tone should be precise, analytical, and focused on technical expertise" \
                   f"write 15 questions." \
                   f" Answer in Json: " \
                   f"question:[the question]" \
                   f"question:[the question]" \
                   f"question:[the question]"

    return generate_chat_call(user_massage, 0.9)


def question_generator_strict(field, role):
    user_massage = f"Act as a strict interviewer. You should interview me for a job in {field}, {role}." \
                   f"Ask questions about my abilities, especially under pressure. Focus on asking challenging questions" \
                   f"that reveal weaknesses, test resilience, and assess how the candidate handles criticism and tough situations." \
                   f"The tone should be formal, direct, and demanding." \
                   f"write 15 questions." \
                   f" Answer in Json: " \
                   f"question:[the question]" \
                   f"question:[the question]" \
                   f"question:[the question]"

    return generate_chat_call(user_massage, 0.9)


def synthesize_text(text, output_file,voice):
    # Initialize the client
    client = texttospeech.TextToSpeechClient()

    # Set up the input text to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # Set up the voice configuration
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",  # Change to "he-IL" for Hebrew
        name=voice)  #"en-US-Neural2-C"

    # Set up the audio configuration
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3  # MP3 or LINEAR16 (WAV)
    )

    # Perform the text-to-speech request
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # Save the response to an audio file
    with open(output_file, "wb") as out:
        out.write(response.audio_content)
        print(f'Audio content written to "{output_file}"')


def generate_questions(field, interviewerID, role):
    questions_generated = {}
    if interviewerID == 0:
        questions_generated = question_generator_strict(field, role)
        voice = "en-US-Studio-Q"
    elif interviewerID == 1:
        questions_generated = question_generator_behave(field, role)
        voice = "en-US-Neural2-F"
    elif interviewerID == 2:
        questions_generated = question_generator_technical(field, role)
        voice = "en-US-Wavenet-J"
    else:
        questions_generated = question_generator_friendly(field, role)
        voice = "en-GB-Neural2-A"

    questions_dict = json.loads(questions_generated)
    questions_iterator = iter(questions_dict.items())
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./inspiring-team-386523-29d458586b76.json"
    i = 1
    for key, value in questions_iterator:
        text_to_synthesize = f"{value}"
        output_file_path = f"output{i}.mp3"
        synthesize_text(text_to_synthesize, output_file_path,voice)
        i += 1
    return questions_dict


