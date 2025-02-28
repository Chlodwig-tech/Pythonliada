from flask import jsonify
from questions import random_final_question

class Final:
    def __init__(self):
        self.questions = [
            {
                'name': f'Pytanie {i}',
                'answers': [
                    {'name': 'Odpowiedź', 'points': 0, 'revealed': -1}
                    for _ in range(5)
                ]
            } for i in range(5)
        ]
        self.points = 0

    def json(self):
        round1, round2 = [], []
        for i, q in enumerate(self.questions):
            for a in q['answers']:
                if len(round1) <= i and a['revealed'] == 0:
                    round1.append((a['name'], a['points'], True))
                if len(round2) <= i and a['revealed'] == 1:
                    round2.append((a['name'], a['points'], True))

            round1.extend([('', 0, False)] * (i + 1 - len(round1)))
            round2.extend([('', 0, False)] * (i + 1 - len(round2)))

        return jsonify({
            'points': self.points,
            'round1': round1,
            'round2': round2
        })
    
    def adminjson(self):
        return jsonify({
            'points': self.points,
            'questions': self.questions
        })
    
    def set(self, answers):
        self.answers = answers

    def set_points(self, points):
        self.points = points

    def add_points(self, points):
        self.points += points

    def change(self, index):
        question = random_final_question().question
        self.questions[index]['name'] = question['name']
        self.questions[index]['answers'] = [
            {'name': answer[0], 'points': answer[1], 'revealed': -1}
            for answer in question['answers']
        ]

    def set_final_scores(self, data):
        for i, answer in enumerate(self.questions[data['index']]['answers']):
            if answer['name'] == data['answer']:
                self.questions[data['index']]['answers'][i]['revealed'] = 0 if data['round'] == 1 else 1
                break

FINAL = Final()

if __name__ == '__main__':
    print(FINAL.json())