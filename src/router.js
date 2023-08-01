import { createRouter, createWebHistory } from "vue-router";

import CompPage_Home from "./pages/CompPage_Home.vue";
import CompPage_Apartments_Search from "./pages/CompPage_Apartments_Search.vue";
import CompPage_Apartments_Show from "./pages/CompPage_Apartments_Show.vue";
import CompPage_Chi_Siamo from "./pages/CompPage_ChiSiamo.vue";
import CompPage_Map from "./pages/CompPage_Map.vue";
import CompPage_404 from "./pages/CompPage_404.vue";
import CompPage_Jumbotron from "./pages/CompPage_Jumbotron.vue";

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
                            path        :   '/search/:city?',
                            name        :   'apartments_search',
                            component   :   CompPage_Apartments_Search,
                            meta        :   {
                                                page_title : 'BoolB&B | Ricerca'
                                            }
                        },
                        {
                            path        :   '/dettaglio/:id/:slug?', 
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
                        },
                        {
                            path        :   '/map', 
                            name        :   'map',
                            component   :   CompPage_Map,
                            meta        :   {
                                                page_title  :   "map"  
                                            },
                        },
                        {
                            path:           '/ChiSiamo',
                            name:           'ChiSiamo', 
                            component:      CompPage_Chi_Siamo,
                            meta:           {
                                                page_title: 'BoolB&B | Chi Siamo'
                                            },
                        },
                        {
                            path        :   '/not-found-404',
                            name        :   'not-found',
                            component   :   CompPage_404,
                            meta        :   {
                                                page_title : 'BoolB&B | 404'
                                            }
                        },
                        {
                            path        :   '/jumbo', 
                            name        :   'jumbo',
                            component   :   CompPage_Jumbotron,
                            meta        :   {
                                                page_title  :   "jumbotron"  
                                            },
                        },
                    ] 
      });

    export { router };