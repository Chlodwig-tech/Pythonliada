from flask import Flask, render_template, request

from team import TEAMS
from question import QUESTION
from final import FINAL
from questions import random_question, remove_question, get_answers

app = Flask(__name__)


@app.route("/")
def home():
    return render_template('index.html')

@app.route("/admin/")
def admin():
    return render_template('admin.html')

@app.route("/final/")
def final():
    return render_template('final.html')

@app.route("/admin/final/")
def adminfinal():
    return render_template('finaladmin.html')

@app.route("/api_final_answers/")
def api_final_answers():
    return FINAL.json()

@app.route("/api_final_admin_questions/")
def api_final_admin_questions():
    return FINAL.adminjson()

@app.route("/admin/random/")
def admin_random():
    return random_question()

@app.route("/question/")
def api_question():
    return QUESTION.json()

@app.route("/teams/")
def api_teams():
    return TEAMS.json()

@app.route("/admin/set_final_points/", methods=['POST'])
def set_final_points():
    global FINAL
    data = request.get_json()['data']
    FINAL.set_points(data)
    return "Done"

@app.route("/admin/set_final_score/", methods=['POST'])
def set_final_score():
    global FINAL
    data = request.get_json()
    FINAL.add_points(int(data['score']))
    FINAL.set_final_scores(data)
    return "Done"

@app.route("/admin/change_question/", methods=['POST'])
def admin_change_question():
    data = request.get_json()['data']
    FINAL.change(int(data))
    return "Done"

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
