<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Apartments_Search",
        data()
        {
            return {
                store
            }
        },
        created()
        {
            store.page_name = "Search";
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
                        <div class="row">
                            <div class="col-12">
                                <div class="overflow-hidden rounded-4" style="height: 200px;">
                                    <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>