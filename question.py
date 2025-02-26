from flask import jsonify

class Question:
    def __init__(self):
        self.question = {
            'name': '',
            'points': 0,
            'bad': {
                'A': 0,
                'B': 0
            },
            'answers': []
        }
    
    def json(self):
        return jsonify(self.question)
    
    def set_answers(self, question, answers):
        self.question = {
            'name': question,
            'points': 0,
            'bad': {
                'A': 0,
                'B': 0
            },
            'answers': [
                (key, answers[key], False)
                for key in answers
            ]
        }
        
    
    def set(self, question):
        self.question = question

QUESTION = Question()