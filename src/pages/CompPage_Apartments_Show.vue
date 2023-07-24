<script>
import { store } from '../store';
import axios from "axios";

    export default
    {
        name    : "CompPage_Apartments_Show",
        data()
        {
            return {
                store,
                mess_name : "",
                mess_surname : "",
                mess_email : "",
                mess_body : "",
                mess_apt_id : "",

            }
        },
        created()
        {
            store.page_name = "Show";
            if ((!this.store.axios_running) && (this.condition_to_go()))
            {
                console.log('refresh pagina in corso');
                this.store.prepare_reactive_call('single', this.$route.params.id); 
            }
        },
        mounted()
        {
            this.mess_apt_id = store.one_apartment.id
        },
        methods: 
        {
            condition_to_go()
            {
                if (Object.keys(this.store.one_apartment).length === 0)
                    return true;
                if (this.store.one_apartment.id !== this.$route.params.id )
                    return true;
                else
                    return false;
            },

            compose_params() 
            {
                let params =  {

                    'apartment_id' : this.mess_apt_id,
                    'email' : this.mess_email,
                    'email_body' : this.mess_body,
                    'nome' : this.mess_name,
                    'cognome' : this.mess_surname
                }

                console.log("cao")
                // store.api_url_root + "messages?apartment_id=" + this.mess_apt_id + "&email=" + this.mess_email + "&email_body=" + this.mess_body + "&nome=" + this.mess_name + "&cognome=" + this.mess_surname
                axios.post(store.api_url_root + "messages", params).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<template>
    <div class="container">
        <h1>
            {{ store.one_apartment.title }}
        </h1>
        <p class="mt-3">
            <i>
                {{store.one_apartment.address  }}
            </i>
            <span class="ms-2">
                <b>
                    {{store.one_apartment.city }}
                </b>
            </span>
        </p>
        <div class="row">
            <div class="col-6 p-2">
                <div class="overflow-hidden box-image-sx" style="height: 100%; max-height: 500px;">
                    <img :src="`http://127.0.0.1:8000/storage/${store.one_apartment.cover_img}`" alt="" class="img-box">
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div v-for="(pictures, index) in store.one_apartment.pictures" :key="index" class="col-6 p-2">
                        <div class="overflow-hidden box-image-dx" style="height: 100%; max-height: 240px;">
                            <img :src="`http://127.0.0.1:8000/storage/${pictures.picture_url}`" alt="" :class="`img-box img-${index}`">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-2">
            <div class="col-6">
                <span><b>Stanze:</b> {{ store.one_apartment.number_of_rooms }}</span>
                <span class="ms-3"><b>Bagni:</b> {{ store.one_apartment.number_of_bathrooms }}</span>
                <span class="ms-3"><b>Dimensioni:</b> {{ store.one_apartment.square_meters }} Mq.</span>
            </div>
            <div class="col-6">
                <span>
                    <b>
                        Prezzo:
                    </b>
                     {{ store.one_apartment.price }}
                </span>
            </div>
        </div>
        <hr>
        <p class="text-center">
            <i>
                "{{ store.one_apartment.description }}"
            </i>
        </p>
        <hr>
        <div class="row pb-2">
            <div class="col-6">
                <p>
                    <b>
                        Cosa troverai:
                    </b>
                </p>
                <div class="row">
                    <div v-for="(service, index) in store.one_apartment.services" class="col-6 mt-2">
                        <i :class="service.icon" class="fa-xl"></i>
                        <span class="ms-2">
                            {{ service.name }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card">
                    <p>
                        Contatta l'Host
                    </p>
                    <form action="http://127.0.0.1:8000/api/messages" method="POST">
                        <input type="hidden" id="apartment_id" name="apartment_id" v-model="this.mess_apt_id" required><br>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="nome" v-model="this.mess_name" required><br>

                        <label for="surname">Surname:</label>
                        <input type="text" id="surname" name="cognome" v-model="this.mess_surname" required><br>

                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required v-model="this.mess_email"><br>

                        <label for="email_body">Message:</label><br>
                        <textarea id="email_body" name="email_body" rows="4" cols="50" v-model="this.mess_body" required></textarea><br>

                        <input type="submit" value="Send Message" @click.prevent="compose_params()">
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.box-image-sx {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}

.img-1 {
    border-top-right-radius: 30px;
}

.img-3 {
    border-bottom-right-radius: 30px;
}

</style>