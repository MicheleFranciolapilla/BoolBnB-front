import { createApp } from 'vue';
// import './style.css'
import App from './App.vue';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { router } from "./router";

createApp(App).use(router).mount('#app')
