<script>
import axios, { Axios } from 'axios';
import Comp_OnLoading from '../components/Comp_OnLoading.vue';
import { store } from '../store';
import Comp_Map from '../components/Comp_Map.vue';

    export default
    {
        name    : "CompPage_Apartments_Search",
        components :
        {
            Comp_OnLoading,
            Comp_Map
        },
        data()
        {
            return {
                store,
                filter: '',
                city: '',
                address: '',
                lat: '', 
                long: '',
                range: ''
            }
        },
        created()
        {
            this.store.page_name = "Search";
            if (this.store.calls_params.call_type !== this.store.call_type_array.indexOf('all'))
            {
                if ((!(this.$route.params.city) && (window.location.search.length < 1)) ||
                    ((this.$route.params.city) && (window.location.search.length > 0)))
                {
                    console.log("hai digitato ad capocchiam quindi te ne vai alla home");
                    this.$router.push({ name: 'home' });
                }
                else 
                {
                    if (this.$route.params.city)
                    {
                        this.store.city_to_search = this.$route.params.city;
                        this.store.direct_search_only_city = true;
                        console.log("solo parametro");
                    }
                    else
                    {
                        console.log("solo query");
                        console.log(this.$route.query.city);
                        this.store.cityQuery['city'] = this.$route.query.city;
                        this.store.cityQuery['latitude'] = this.$route.query.lat;
                        this.store.cityQuery['longitude'] = this.$route.query.long;
                        this.store.cityQuery['address'] = this.$route.query.address;
                        this.store.selected_range = this.$route.query.range;
                        if (this.store.selected_range > this.store.max_range)
                            this.store.selected_range = this.store.max_range;
                        else if (this.store.selected_range < this.store.min_range)
                                this.store.selected_range = this.store.min_range;
                        if (this.$route.query.services)
                            this.store.selected_services = this.$route.query.services;
                        this.$router.replace({                                
                                                name: 'apartments_search',
                                                query: 
                                                {
                                                    city: store.cityQuery.city,
                                                    address: store.cityQuery.address,
                                                    lat: store.cityQuery.latitude,
                                                    long: store.cityQuery.longitude,
                                                    range: store.selected_range,
                                                    services: store.selected_services
                                                }
                                            });
                        this.store.city_to_search = this.store.cityQuery['city'];
                    }
                    this.store.prepare_reactive_call("all");
                }
            }
        },
        methods:
        {
            is_sponsorized(apartment)
            {
                let sponsorized = false;
                if (apartment.sponsors.length !== 0)
                {
                    apartment.sponsors.forEach( sponsor => 
                    {   
                        console.log("");
                        console.log("");
                        console.log("Appartamento: ", apartment.id, " - ",apartment.title);
                        const expire_date_msec = Date.parse(sponsor.pivot.expire_at);
                        console.log('--------------------------------------------------------');
                        console.log("Data di scadenza: ", sponsor.pivot.expire_at);
                        console.log("Time relativo alla scadenza: ",expire_date_msec);

                        const now = new Date();
                        console.log("Data attuale in Giappone: ", now);
                        console.log("Time attuale in Giappone: ", now.getTime());

                        const it_zone = { timeZone : 'Europe/Rome' };
                        const now_it = new Date(now.toLocaleString('en-US', it_zone));
                        const now_it_msec = now_it.getTime();
                        console.log("Data attuale in Italia: ", now_it);
                        console.log("Time attuale in Italia: ", now_it_msec);
                        console.log('--------------------------------------------------------');

                        if (now_it_msec < expire_date_msec)
                        {
                            console.log("SPONSOR ATTIVO");
                            sponsorized = true;
                        }
                        else
                            console.log("SPONSOR SCADUTO");
                        console.log("");
                        console.log("");
                    });
                }
                return sponsorized;
            }
        }
        
    }
</script>

<template>
    <h1>Risultati per "{{ store.searched_city }}"</h1>
    
    
    <div v-if="!store.axios_running" class="row mx-auto">
<<<<<<< HEAD
        <div class="container">

            <div class="row pb-2">
                <div class="col-5 row box-sx ">
                    <div v-for="(apartment, index) in store.apartments " :key='index' class="col-6 p-0">
=======
        <div class="row">
            <div class="col-6 row">
                <div v-for="(apartment, index) in store.apartments " :key='index' class="p-1 col-6">
                    <div class="p-2 my-1 card" :class=" is_sponsorized(apartment) ? ('sponsorized') : ('')  ">
>>>>>>> Gestione-errori-axios
                        <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.prepare_reactive_call('single',apartment.id)">
                            <div class="w-100 card">
                                <div class="text-end">
                                    <i>
                                        Distanza : {{ apartment.distance }}Km
<<<<<<< HEAD
                                    </i>
=======
                                        </i>
                                    </p>
                                    <div class="overflow-hidden rounded-4" style="height: 150px;">
                                        <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box"  style="width: 100%;">
                                    </div>
>>>>>>> Gestione-errori-axios
                                </div>
                                <div class="overflow-hidden rounded-4" v-bind:class="{ 'sponsorized' : is_sponsorized(apartment) }" style="height: 150px;">
                                    <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box"  style="width: 100%;">
                                </div>
                                    <div>                        
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
                                        <div class="mt-0">
                                            <i>
                                                {{ apartment.address }}
                                            </i>
                                        </div>
                                    </div>
                                </div>
                        </router-link>
                    </div>
                </div>
                <div class="col-7 px-0 ms-3" >
                    <Comp_Map/>
                </div>
            </div>
        </div>
    </div>
    <Comp_OnLoading v-else 
        :hg_color = "'white'"
        :big = "true"
        :message = "''"
    />
</template>

<style lang="scss">
    .sponsorized
    {
        border: 5px solid blue !important;
    }

    .box-sx {
        height: 100%;
        overflow-y: scroll;
        max-height: 80vh;
    }
    .box-sx::-webkit-scrollbar{
  display: none;
}
</style>