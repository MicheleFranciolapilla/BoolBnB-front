import { createRouter, createWebHistory } from "vue-router";

import CompPage_Home from "./pages/CompPage_Home.vue";
import CompPage_Apartments_Search from "./pages/CompPage_Apartments_Search.vue";
import CompPage_Apartments_Show from "./pages/CompPage_Apartments_Show.vue";

const router = createRouter(
    {
        history :   createWebHistory(),
        routes  :   [
                        {
                            path        :   '/',
                            name        :   'home',
                            component   :   CompPage_Home,
                            meta        :   {
                                                page_title : 'BoolB&B | Home Page'
                                            }
                        },
                        {
                            path        :   '/search/:city',
                            name        :   'apartments_search',
                            component   :   CompPage_Apartments_Search,
                            meta        :   {
                                                page_title : 'BoolB&B | Ricerca'
                                            }
                        },
                        {
                            path        :   '/dettaglio/:id/:slug', 
                            name        :   'apartments_show',
                            component   :   CompPage_Apartments_Show,
                            meta        :   {
                                                page_title  :   "BoolB&B | "  
                                            },
                            beforeEnter :   (to, from, next) =>
                                            {
                                                document.title  = to.meta.page_title + to.params.slug.replaceAll("-", " ");
                                                next();
                                            }
                        }
                    ] 
    });
    export { router };