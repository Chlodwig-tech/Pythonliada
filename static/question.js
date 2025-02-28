export default{
    name: 'Question',
    components: {},
    data() {
        return {
            audioFile: '/static/wrong.mp3',
            bad: {
                'A': 0,
                'B': 0,
            },
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
                    name: 'Drużyna A',
                    points: 0
                },
                B: {
                    name: 'Druzyna B',
                    points: 0
                },
            },
        }
    },
    methods: {
        load: async function(){
            const url2 = window.location.href + "teams/";
            var data2 = await (await fetch(url2)).json();
            this.teams = data2;

            const url = window.location.href + "question/";
            var data = await (await fetch(url)).json();
            // var key = Object.keys(data)[0];
            this.question = data;
            if(this.bad.A < this.question.bad.A || this.bad.B < this.question.bad.B){
                this.$refs.audioPlayer.play();
                this.bad = this.question.bad;
            }
            // this.answers = Object.entries(data[key]).sort((a, b) => b[1] - a[1]).map(entry => [...entry, false]);
        },
    },
    computed: {},
    mounted() {
        this.load();
        setInterval(this.load, 1000);
    },
    template: /*html*/`
        <div class="container">
            <audio ref="audioPlayer" :src="audioFile" />

            <h1 class="text-center">Familiada - Tablica</h1>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Drużyna: {{ teams.A.name }}</th>
                        <th>Drużyna: {{ teams.B.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ teams.A.points }} pkt</td>
                        <td>{{ teams.B.points }} pkt</td>
                    </tr>
                    <tr>
                        <td>
                            <svg v-for="i in question.bad.A" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </td>
                        <td>
                            <svg v-for="i in question.bad.B" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <hr>

            <div class="question">
                Punkty: {{ question.points }} <br/>
                {{ question.name }}
            </div>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Odpowiedź</th>
                        <th>Punkty</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="answer in question.answers">
                        <td v-if="answer[2]">{{ answer[0] }}</td>
                        <td v-else>XXXXXXXXXXXXXXXX</td>
                        <td v-if="answer[2]">{{ answer[1] }}</td>
                        <td v-else>XX</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div style="display: flex; justify-content: center;">
            <a href="/final/" type="button" class="btn btn-primary">Finał</a>
        </div>




  `
}