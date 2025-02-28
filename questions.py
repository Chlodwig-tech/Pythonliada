import random
import json

from question import Question


QUESTIONS_DATA = {}
QUESTIONS      = []

def random_final_question():
    global QUESTIONS
    if not QUESTIONS:
        QUESTIONS = list(QUESTIONS_DATA)
    key = random.choice(QUESTIONS)
    question = Question()
    question.set_answers(key, QUESTIONS_DATA[key])
    return question

def random_question():
    return random_final_question().json()

def remove_question(question):
    global QUESTIONS
    try:
        QUESTIONS.remove(question)
    except:
        print('Question already removed')


def get_answers(question):
    return QUESTIONS_DATA[question]

with open('pytania/pytania.json', 'r') as file:
    data = json.load(file)
    QUESTIONS_DATA = data
    QUESTIONS = list(data)
    print('Questions loaded.')