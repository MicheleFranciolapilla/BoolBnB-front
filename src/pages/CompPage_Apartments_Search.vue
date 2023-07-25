<script>
import axios from 'axios';
import Comp_OnLoading from '../components/Comp_OnLoading.vue';
import { store } from '../store';

    export default
    {
        name    : "CompPage_Apartments_Search",
        components :
        {
            Comp_OnLoading
        },
        data()
        {
            return {
                store
            }
        },
        created()
        {
            this.store.page_name = "Search";
            if (this.store.calls_params.call_type !== this.store.call_type_array.indexOf('all'))
            {
                this.store.city_to_search = this.$route.params.city;
                this.store.prepare_reactive_call("all");
            }
        }
    }
</script>

<template>
    <h1>Risultati per "{{ store.searched_city }}"</h1>
    
    <div class="row mx-auto">
        <div class="row">
            <div class="col-6 row">
                <div v-for="(apartment, index) in store.apartments " :key='index' class="p-1 col-6">
                    <div class=" p-2 my-1 card">
                        <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.prepare_reactive_call('single',apartment.id)">
                            <div class="row">
                                <div class="col-12">
                                    <p class="text-end">
                                        <i>
                                        Distanza : {{ apartment.distance }}Km
                                    </i></p>
                                    <div class="overflow-hidden rounded-4" style="height: 150px;">
                                        <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box"  style="width: 100%;">
                                    </div>
                                </div>
                                <div>                        
                                    <p>
                                        <b>
                                            {{ apartment.title }}, 
                                        </b>
                                        <span class="ms-2">
                                            <b>
                                                <i>
                                                    {{ apartment.city }}
                                                </i>
                                            </b>
                                        </span>
                                    </p>
                                    <p class="mt-0">
                                        <i>
                                            {{ apartment.address }}
                                        </i>
                                    </p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Comp_OnLoading v-if="store.axios_running" 
        :hg_color = "'white'"
        :big = "true"
        :message = "''"
    />
</template>

<style lang="scss">

</style>