import { createApp } from 'vue';
// import './style.css'
import App from './App.vue';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import { router } from "./router";

router.beforeEach((to, from, next) => 
    {
        if (to.meta.page_title) 
        {
            document.title = to.meta.page_title;
        }
        next(); 
    });

createApp(App).use(router).mount('#app')
