# `pip3 install assemblyai` (macOS)
# `pip install assemblyai` (Windows)

import pyaudio
import wave
import os
import time

from google.cloud import speech
import io
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./inspiring-team-386523-29d458586b76.json"


# Parameters
FORMAT = pyaudio.paInt16  # Audio format (16-bit PCM)
CHANNELS = 1           # Number of audio channels (stereo)
RATE = 44100              # Sampling rate (samples per second)
CHUNK = 1024              # Size of audio chunks
RECORD_SECONDS = 30
OUTPUT_FILENAME = "output.wav"  # Output file name
# Ensure the file is saved in the current working directory
output_path = os.path.join(os.getcwd(), OUTPUT_FILENAME)
# Initialize PyAudio
audio = pyaudio.PyAudio()
should_stop = False


def record(language,result_container):
    # Open the audio stream
    global should_stop
    stream = audio.open(format=FORMAT,
                        channels=CHANNELS,
                        rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK)

    print("Recording for 2 minutes...")

    frames = []
    flag = True
    start_time = time.time()

    # Record audio in chunks
    for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        if should_stop:
            print("stop recording")
            break

        data = stream.read(CHUNK)
        frames.append(data)
        # if elapsed_time > 8:    # later we will implement the flag using a flag from frontend
            #   flag = False


    print("Finished recording.")

    # Stop and close the audio stream
    stream.stop_stream()
    stream.close()
    audio.terminate()

    # Save the recorded audio to a file
    with wave.open(output_path, 'wb') as wf:
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(audio.get_sample_size(FORMAT))
        wf.setframerate(RATE)
        wf.writeframes(b''.join(frames))

    print(f"Audio saved to {output_path}")
    
    # Path to your audio file (must be in WAV format with LINEAR16 encoding)
    transcription_result =  transcribe_audio(output_path, language)
    result_container.append(transcription_result)
    should_stop = False

# def start_recording(language):
#     global should_stop
#     should_stop = False
#     record(language)

def stop_recording():
    global should_stop
    should_stop = True

def transcribe_audio(audio_file_path, language):
    # Initialize the client
    client = speech.SpeechClient()

    # Load the audio file
    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    # Configure the audio settings
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # Adjust this based on your audio file
        sample_rate_hertz=44100,  # Adjust this if your file has a different sample rate

        language_code=language #"he-IL",  # Hebrew language code en-US

    )

    # Perform the transcription
    response = client.recognize(config=config, audio=audio)

    answer = ""

    # Print the transcription
    for result in response.results:
        answer += " " + result.alternatives[0].transcript
        # print("Transcript: {}".format(result.alternatives[0].transcript))
    return answer


if __name__ == '__main__':
    transcribe_audio(output_path)

#
# aai.settings.api_key = "65fc0f2131704cd5b303c28979e0f118"
# #config = aai.TranscriptionConfig(language_code="en_us")
# config = aai.TranscriptionConfig(speech_model=aai.SpeechModel.nano, language_code="he")
#
# transcriber = aai.Transcriber(config=config)
# # Transcribe the uploaded audio file
# # transcriber = aai.Transcriber()
# transcript = transcriber.transcribe(output_path)
#
# print(transcript.text)
# print(transcript.words)
#
# # Assuming 'transcript' contains the transcription result as a dictionary
# words = transcript.words  # List of words with timestamps
#
# # Parameters
# silence_threshold = 2  # Minimum duration of silence in seconds
#
# # Function to find silences
# def find_silences(words, threshold, record_seconds):
#     silences = []
#     if words is None:
#         silences.append({
#             'start': 0,
#             'end': record_seconds,
#             'duration': record_seconds
#         })
#         return silences
#     if words[0].start/1000 >= threshold:
#         silences.append({
#             'start': 0,
#             'end': words[0].start/1000,
#             'duration': words[0].start/1000
#         })
#     if len(words) == 1:
#         if record_seconds - words[0].end/1000 >= threshold:
#             silences.append({
#                 'start': words[0].end/1000,
#                 'end': record_seconds,
#                 'duration': record_seconds - words[0].end/1000
#             })
#
#     for i in range(1, len(words)):
#         start_time = words[i-1].end / 1000.0  # Convert ms to seconds
#         end_time = words[i].start / 1000.0  # Convert ms to seconds
#         silence_duration = end_time - start_time
#         if silence_duration >= threshold:
#             silences.append({
#                 'start': start_time,
#                 'end': end_time,
#                 'duration': silence_duration
#             })
#     if words is None:
#         silences.append({
#             'start': 0,
#             'end': record_seconds,
#             'duration': record_seconds
#         })
#     return silences
#
# # Find silences in the transcription
# silences = find_silences(words, silence_threshold, RECORD_SECONDS)
#
# # Print the silences
# print("Detected silences:")
# for silence in silences:
#     print(f"Start: {silence['start']}s, End: {silence['end']}s, Duration: {silence['duration']}s")
#
