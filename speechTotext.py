import pyaudio
import wave
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

    # Record audio in chunks
    for _ in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        if should_stop:
            print("stop recording")
            break

        data = stream.read(CHUNK)
        frames.append(data)



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


def stop_recording():
    global should_stop
    should_stop = True

def transcribe_audio(audio_file_path, language):
    # Initialize the client
    client = speech.SpeechClient()

    # Load the audio file
    with io.open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()

    if language is 'he':
        language = "he-IL"
    else:
        language = "en-US"
    # Configure the audio settings
    audio = speech.RecognitionAudio(content=content)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,  # Adjust this based on your audio file
        sample_rate_hertz=44100,  # Adjust this if your file has a different sample rate
        language_code=language
    )

    # Perform the transcription
    response = client.recognize(config=config, audio=audio)

    answer = ""

    # Print the transcription
    for result in response.results:
        answer += " " + result.alternatives[0].transcript
    return answer

