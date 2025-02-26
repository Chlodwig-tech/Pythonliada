export default{
    name: 'Adminpanel',
    components: {},
    data() {
        return {
            AX: [false, false, false],
            BX: [false, false, false],
            disabled: true,
            question: {
                'name': '',
                'points': 0,
                'bad': {
                    'A': 0,
                    'B': 0
                },
                'answers': []
            },
            teams: {
                A: {
                    name: '',
                    points: 0
                },
                B: {
                    name: '',
                    points: 0
                },
            },
            multiplayer: 1,
        }
    },
    methods: {
        load: async function(){
            const url = window.location.href + "question/";
            var data = await (await fetch(url)).json();
            this.question = data;
            this.disabled = this.question.points == 0;
            for(var i = 0; i < this.question.bad.A; i++){
                this.AX[i] = true;
            }
            for(var i = 0; i < this.question.bad.B; i++){
                this.BX[i] = true;
            }
            for(var i = this.question.bad.A; i < 3; i++){
                this.AX[i] = false;
            }
            for(var i = this.question.bad.B; i < 3; i++){
                this.BX[i] = false;
            }

            const url2 = "/teams/";
            var data2 = await (await fetch(url2)).json();
            this.teams = data2;
            // var key = Object.keys(data)[0];
            // this.question = key;
            // this.answers = Object.entries(data[key]).sort((a, b) => b[1] - a[1]);
        },
        next: async function(){
            this.disabled = true;
            const url = window.location.href + "random/";
            var data = await (await fetch(url)).json();
            this.question = data;
            this.disabled = this.question.points == 0;
            for(var i = 0; i < this.question.bad.A; i++){
                this.AX[i] = true;
            }
            for(var i = 0; i < this.question.bad.B; i++){
                this.BX[i] = true;
            }
            for(var i = this.question.bad.A; i < 3; i++){
                this.AX[i] = false;
            }
            for(var i = this.question.bad.B; i < 3; i++){
                this.BX[i] = false;
            }
        },
        set_question(){
            this.disabled = false;
            fetch(window.location.href + 'question/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: this.question
                })
            }).catch(error => {
                console.error(error);
            });
        },
        update_question(){
            fetch(window.location.href + 'update_question/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: this.question
                })
            }).catch(error => {
                console.error(error);
            });
        },
        set_teams(){
            fetch(window.location.href + 'teams/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: this.teams
                })
            }).catch(error => {
                console.error(error);
            });
        },
        set_points(index){
            var points = this.question.answers[index][1];
            this.question.points += points * this.multiplayer;
            this.question.answers[index][2] = true;
            this.set_teams();
            this.update_question();
        },
        set_points_teams(team){
            this.teams[team].points += this.question.points;
            this.set_teams();
        },
        set_bads(){
            this.question.bad.A = this.AX.filter(val => val).length;
            this.question.bad.B = this.BX.filter(val => val).length;
            this.update_question();
        },
    },
    computed: {},
    mounted() {
        this.load();
    },
    template: /*html*/`
        <div class="container">
            <h1 class="text-center">Familiada - Tablica</h1>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Drużyna: <span class="points-label"><input @input="set_teams" v-model="teams.A.name" type="text" placeholder="Drużyna A"></span></th>
                        <th>Drużyna: <span class="points-label"><input @input="set_teams" v-model="teams.B.name" type="text" placeholder="Drużyna B"></span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Pkt: <input type="number" @input="set_teams" v-model="teams.A.points" style="width: 10ch;"></td>
                        <td>Pkt: <input type="number" @input="set_teams" v-model="teams.B.points" style="width: 10ch;"></td>
                    </tr>
                    <tr>
                        <td>
                            <label v-for="(ax, index) in AX" :key="index" class="custom-checkbox">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                                <input type="checkbox" @change="set_bads" v-model="AX[index]">
                            </label>
                        </td>
                        <td>
                           <label v-for="(bx, index) in BX" :key="index" class="custom-checkbox">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                                <input type="checkbox" @change="set_bads" v-model="BX[index]">
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <hr>

            <div class="question">
                <button @click="set_points_teams('A')" type="button" :class="'btn btn-info'">Przyznaj punkty {{ teams.A.name }}</button> 
                <button @click="set_points_teams('B')" type="button" :class="'btn btn-info'">Przyznaj punkty {{ teams.B.name }}</button> <br>
                Punkty: <input :disabled="disabled" type="number" @input="update_question" v-model="question.points" style="width: 10ch;"> <br>
                Mnożnik: <input :disabled="disabled" type="number" v-model="multiplayer" style="width: 10ch;"> <br/>
                {{ question.name }}
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Odpowiedź</th>
                        <th>Punkty</th>
                        <th>Przyznaj punkty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(answer, index) in question.answers">
                        <td>{{ answer[0] }}</td>
                        <td>{{ answer[1] }}</td>
                        <td><button :disabled="disabled || answer[2]" @click="set_points(index)" type="button" :class="(disabled || x) ? 'btn btn-danger' : 'btn btn-info'">Przyznaj punkty</button></td>
                    </tr>
                </tbody>
            </table>

            <button @click="next" type="button" class="btn btn-primary btn-lg" style="float: right;">Następne pytanie</button>   
            <button @click="set_question" type="button" class="btn btn-primary btn-lg">Pokaż na tablicy</button>
        </div>


  `
}