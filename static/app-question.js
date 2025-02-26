import Question from './question.js'
const {createApp} = Vue;
const app = createApp({
    components: {
        Question,
    }
});
app.mount('#app');