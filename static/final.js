export default{
    name: 'Final',
    components: {},
    data() {
        return {
            points: 0,
            answers1: [],
            answers2: [],
        }
    },
    methods: {
        load: async function(){
            const url = "/api_final_answers/";
            var data = await (await fetch(url)).json();
            this.points = data['points'];
            this.answers1 = data['round1'];
            this.answers2 = data['round2'];
        }
            
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
            <h2 class="text-center">Punkty: {{ points }}</h2>
            <div class="d-flex gap-3">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Punkty</th>
                            <th>Runda 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="answer in answers1">
                            <td v-if="answer[2]">{{ answer[0] }}</td>
                            <td v-else>XX</td>
                            <td v-if="answer[2]">{{ answer[1] }}</td>
                            <td v-else>XXXXXXXXXXXXXXXX</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Runda 2</th>
                            <th>Punkty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="answer in answers2">
                            <td v-if="answer[2]">{{ answer[0] }}</td>
                            <td v-else>XX</td>
                            <td v-if="answer[2]">{{ answer[1] }}</td>
                            <td v-else>XXXXXXXXXXXXXXXX</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        <div style="display: flex; justify-content: center;">
            <a href="/" type="button" class="btn btn-primary">Pytania</a>
        </div>
  `
}