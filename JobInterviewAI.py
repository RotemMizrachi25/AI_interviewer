import os
from openai import OpenAI

# Retrieve the password from the environment variable
openai_password = os.getenv('OPENAI_PASSWORD')

client = OpenAI(api_key=openai_password)


def generate_chat_call(user_message, temprature=1):
    system_message = "You are a helpful job interview assistant."

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


def question_generator(field):
    user_massage = f"I'm a applying for a new job in {field}. I have a personal interview soon and I want you " \
                   f"to prepare me. write a SINGLE question that I can be asked. Answer in Json: " \
                   f"question:[the question]"
    return generate_chat_call(user_massage)


def question_generator_temp(field):
    user_massage = f"I'm a applying for a new job in {field}. I have a personal interview soon and I want you " \
                   f"to prepare me. The questions can be about myself (strengths, weaknesses, experience, goals)" \
                   f"write 15 questions that I can be asked." \
                   f" Answer in Json: " \
                   f"question:[the question]" \
                   f"question:[the question]" \
                   f"question:[the question]"

    return generate_chat_call(user_massage, 0.9)


def content_analyzer(field, question, answer):
    user_massage = f"I'm a applying for a new job in {field}. In my interview I got this question:" \
                   f"{question}. I answered: {answer}." \
                   f"give me 2 disadvantages and 2 advantages in my answer. give me 2 suggestion of changes I could " \
                   f"say to " \
                   f"improve my answer and 1 revised answer." \
                   f" If the disadvantage/advantage/suggestion are minor write none" \
                   f"Answer in json:" \
                   f"[disadvantage1]:[the disadvantage/none]" \
                   f"[disadvantage2]:[the disadvantage/none]" \
                   f"[advantage1]:[the advantage/none]" \
                   f"[advantage2]:[the advantage/none]" \
                   f"[suggestion1]:[the suggestion/none]" \
                   f"[suggestion2]:[the suggestion/none]" \
                   f"[revised answer]:[the revised answer]"
    return generate_chat_call(user_massage, 0.9)


if __name__ == '__main__':
    #print(question_generator_temp("computer science"))
    answer = "I'm not really sure. I guess I can work alone, but I don't really like it. I prefer when someone tells " \
              "me exactly what to do, step by step. In my classes, I always relied on group projects because it was " \
              "easier to share the workload and get answers from others. Working alone can be stressful, and I might " \
              "get stuck without anyone to help me immediately. So, I guess I'm not that comfortable working " \
              "independently. "
    answerb = "Yes, I am comfortable working independently. During my time in the army, I often had to tackle complex " \
             "technical challenges on my own, which required me to take initiative and develop problem-solving " \
             "skills. Additionally, my experience as a computer science student has involved a significant amount of " \
             "" \
             "self-directed learning and project work. For instance, in my recent coursework, I completed several " \
             "coding projects where I had to research, design, and implement solutions independently. " \
             "However, I also understand the importance of collaboration and communication in a team setting. I value " \
             "the insights and feedback that come from working with others, and I am always willing to seek help and " \
             "contribute to group efforts when needed. I believe that a balance of independent work and teamwork is " \
             "crucial for success in a software development role. "
    print(content_analyzer("computer science", "Are you comfortable working independently?", answer))
