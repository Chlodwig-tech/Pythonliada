from flask import Flask, render_template, request

from team import TEAMS
from question import QUESTION
from questions import random_question, remove_question, get_answers

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/admin/")
def admin():
    return render_template('admin.html')


@app.route("/admin/random/")
def admin_random():
    return random_question()

@app.route("/question/")
def api_question():
    return QUESTION.json()

@app.route("/teams/")
def api_teams():
    return TEAMS.json()

@app.route("/admin/teams/", methods=['POST'])
def set_teams():
    global TEAMS
    data = request.get_json()['data']
    TEAMS.set(data)
    return "Done"

@app.route("/admin/question/", methods=['POST'])
def set_question():
    global QUESTION, QUESTIONS
    data = request.get_json()['data']
    QUESTION.set(data)
    remove_question(QUESTION.question['name'])
    return "Done"

@app.route("/admin/question/", methods=['GET'])
def admi_api_question():
    if QUESTION.question['name'] == '':
        return random_question()
    else:
        return QUESTION.json()

@app.route("/admin/update_question/", methods=['POST'])
def update_question():
    global QUESTION, QUESTIONS
    data = request.get_json()['data']
    QUESTION.set(data)
    return "Done"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Pozwala na dostęp z innych urządzeń
