export default{
    name: 'Finaladmin',
    components: {},
    data() {
        return {
            points: 0,
            questions: null
        }
    },
    methods: {
        load: async function(){
            const url = "/api_final_admin_questions/";
            var data = await (await fetch(url)).json();
            this.points = data.points;
            this.questions = data.questions;
        },
        set_points(){
            fetch('/admin/set_final_points/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: this.points
                })
            }).catch(error => {
                console.error(error);
            });
        },
        next(index){
            fetch('/admin/change_question/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: index,
                })
            }).catch(error => {
                console.error(error);
            });
        },
        show(index, round, answer, score){
            fetch('/admin/set_final_score/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    index: index,
                    round: round,
                    answer: answer,
                    score: score,
                })
            }).catch(error => {
                console.error(error);
            });
        },
    },
    computed: {},
    mounted() {
        this.load();
        setInterval(this.load, 1000);
    },
    template: /*html*/`
        <div class="container">
            <h1 class="text-center">Finał</h1>
            <h1 class="text-center">Familiada - Tablica</h1>
            <h2 class="text-center">Punkty: <input @input="set_points" type="number" v-model="points" style="width: 10ch;"></h2>
            <hr>
            <div v-if="questions">
                <div v-for="(question, index) in questions">
                    <h4 class="text-center">{{ question.name }}</h4>
                    <button @click="next(index)" type="button" class="btn btn-primary btn-lg" style="float: right;">Następne pytanie</button>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Odpowiedź</th>
                                <th>Punkty</th>
                                <th>Przyznaj punkty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="answer in question.answers">
                                <td>{{ answer.name }}</td>
                                <td>{{ answer.points }}</td>
                                <td>
                                    <button @click="show(index, 1, answer.name, answer.points)" type="button" class="btn btn-primary">Runda 1</button>
                                    <button @click="show(index, 2, answer.name, answer.points)" type="button" class="btn btn-primary">Runda 2</button>
                                </td>
                            </tr>
                        </tbody>                
                    </table>
                    <hr>
                    
                </div>
            </div>
            <div v-else>
                <hr>
            </div>
    
        </div>
        <div style="display: flex; justify-content: center;">
            <a href="/admin/" type="button" class="btn btn-primary">Pytania</a>
        </div>
  `
}