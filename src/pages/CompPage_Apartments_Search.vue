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

    <h2 class="text-center mb-4">Risultati per "{{ store.searched_city }}"</h2>
    <!-- <p class="text-center">{{ store.apartments.size }} Appartamenti trovati</p> -->
    
    
    <div v-if="!store.axios_running" class="row mx-auto">
        <div class="container px-3 pb-5">
            <div class="row mx-0 pb-2" >
                <div class="row mx-0 box-sx col-12 col-md-12 col-lg-6 mb-3 p-1">
                    <div v-for="(apartment, index) in store.apartments " :key='index' class="px-1 col-12 col-sm-6 col-md-4 col-lg-6 align-items-start mb-2" >
                        <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.prepare_reactive_call('single',apartment.id)">
                            <div class="card p-2" :class=" is_sponsorized(apartment) ? ('sponsorized') : ('')  ">
                                <div class="px-1" style="height: 40px; line-height: 35px;">
                                    <b>
                                        {{ apartment.title }} 
                                    </b>
                                </div>
                                <div class="overflow-hidden rounded-1"  style="height: 150px;">
                                    <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box"  style="width: 100%;">
                                </div>                    
                                    <div class="overflow-hidden" style="height: 40px; line-height: 40px;">
                                        <i>
                                            {{ apartment.address }}
                                        </i>
                                    </div>
                                    <div  class="text-end" style="height: 20px; line-height: 20px; font-size: 14px;">
                                        <i>
                                             {{ apartment.distance }} Km dalla ricerca
                                        </i>
                                    </div>
                                </div>
                        </router-link>
                    </div>
                </div>
                <div class="px-0 col-11 col-sm-12 col-md-12 col-lg-6  map-box"  >
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
        background-color: rgba(9, 48, 14, 0.103);
    }

    .box-sx {
        overflow-y: scroll;
    }
    
    .box-sx::-webkit-scrollbar{
        background-color:#fff;
    width:16px
    }

    .bos-sx::-webkit-scrollbar-track {
    background-color:#fff
    }

    .box-sx::-webkit-scrollbar-track:hover {
    background-color:#f4f4f4
}

/* scrollbar itself */
.box-sx::-webkit-scrollbar-thumb {
    background-color:#babac0;
    border-radius:16px;
    border:5px solid #fff
}
.box-sx::-webkit-scrollbar-thumb:hover {
    background-color:#a0a0a5;
    border:4px solid #f4f4f4
}

/* set button(top and bottom of the scrollbar) */
.box-sx::-webkit-scrollbar-button {display:none}


    .map-box{
        min-height: 80vh;
    }


    @media (min-width: 992px) {
    .box-sx {
        max-height: 80vh;
    }
}
</style>