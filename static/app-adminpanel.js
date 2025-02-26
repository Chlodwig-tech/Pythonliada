import Adminpanel from './adminpanel.js'
const {createApp} = Vue;
const app = createApp({
    components: {
        Adminpanel,
    }
});
app.mount('#app');