from flask import jsonify

class Teams:
    def __init__(self):
        self.teams = {
            'A': {
                'name': 'Drużyna A',
                'points': 0,
            },
            'B': {
                'name': 'Drużyna B',
                'points': 0,
            }
        }
    
    def json(self):
        return jsonify(self.teams)
    
    def set(self, teams):
        self.teams = teams

TEAMS = Teams()