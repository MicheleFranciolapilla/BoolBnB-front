<script>
import { store } from '../store';
import axios from "axios";

    export default
    {
        name        :   "Comp_MessageForm",
        data()
        {
            return {
                store,
                direct_call : false,
                mess_name : "",
                mess_surname : "",
                mess_email : "",
                mess_body : "",
                mess_apt_id : "",
                msg_response : "",

                nome : "",
                cognome : "",
                email : "",
                testo : "",
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

                    'apartment_id' : this.store.one_apartment.id,
                    'email' : this.mess_email,
                    'email_body' : this.mess_body,
                    'nome' : this.mess_name,
                    'cognome' : this.mess_surname
                }

                // VALIDAZIONE NOME
                if (this.mess_name === "") {

                    this.nome = "is-invalid"

                } else {

                    this.nome = "is-valid"

                }

                // VALIDAZIONE COGNOME
                if (this.mess_surname === "") {

                    this.cognome = "is-invalid"

                } else {

                    this.cognome = "is-valid"
                }

                // VALIDAZIONE EMAIL
                if (!(this.mess_email.includes('@'))) {

                   this.email = "is-invalid"

                } else {

                    this.email = "is-valid"

                }

                // VALIDAZIONE TESTO MESSAGGIO
                if (this.mess_body === "") {

                    this.testo = "is-invalid"

                } else {

                    this.testo = "is-valid"

                }

                // INVIO DATI AL BACKEND E RESET FORM
                if(this.nome === "is-valid" && this.cognome === "is-valid" && this.email === "is-valid" && this.testo === "is-valid") {

                    // store.api_url_root + "messages?apartment_id=" + this.mess_apt_id + "&email=" + this.mess_email + "&email_body=" + this.mess_body + "&nome=" + this.mess_name + "&cognome=" + this.mess_surname
                    axios.post(store.api_url_root + "messages", params).then(res => {
                        this.msg_response = res.data.success
                        console.log(this.msg_response)
                    })

                    this.mess_name = ''
                    this.mess_surname = ''
                    this.mess_email = ''
                    this.mess_body = ''

                    this.nome = ""
                    this.cognome = ""
                    this.email = ""
                    this.testo = ""
                }

            }
        }
    }
</script>

<template>
    


    <!-- <div class="offcanvas-header text-white">
        <h5 class="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div> -->
    <div class="offcanvas-body">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        
        <div class="card p-4">
        
        <h4 class="text-center py-2">Contatta l'Host!</h4>

        <form action="http://127.0.0.1:8000/api/messages" method="POST" class="row g-3">

            <!-- ID APPARTAMENTO -->
            <input type="hidden" id="apartment_id" name="apartment_id" v-model="this.mess_apt_id">

            <!-- NOME -->
            <div class="col-12">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" :class="this.nome" class="form-control" id="name" placeholder="Mario" name="nome" v-model="this.mess_name">
                <span :class="this.nome == 'is-invalid' ? '' : 'd-none'" class="text-danger">Inserisci un nome</span>
            </div>

            <!-- COGNOME -->
            <div class="col-12">
                <label for="surname" class="form-label">Cognome:</label>
                <input type="text" :class="this.cognome" class="form-control" id="surname" placeholder="Rossi" name="cognome" v-model="this.mess_surname">
                <span :class="this.cognome == 'is-invalid' ? '' : 'd-none'" class="text-danger">Inserisci un cognome</span>
            </div>

            <!-- EMAIL -->
            <div class="col-12">
                <label for="email" class="form-label">Email:</label>
                <input type="email" :class="this.email" class="form-control" id="email" placeholder="mariorossi@gmail.com" name="email" v-model="this.mess_email">
                <span :class="this.email == 'is-invalid' ? '' : 'd-none'" class="text-danger">Inserisci una email valida</span>
            </div>

            <!-- MESSAGGIO -->
            <div class="col-12">
                <label for="email_body" class="form-label">Messaggio:</label>
                <textarea id="email_body" :class="this.testo" name="email_body" rows="4" cols="50" class="form-control" placeholder="Scrivi..." v-model="this.mess_body"></textarea>
                <span :class="this.testo == 'is-invalid' ? '' : 'd-none'" class="text-danger">Inserisci del testo</span>
            </div>

            <!-- INVIO MESSAGGIO -->
            <div class="col-12 text-center py-2">
                <button type="submit" class="btn btn-primary" @click.prevent="compose_params()">Invia messaggio</button>
            </div>
                        
                        <!-- <label for="name">Name:</label>
                        <input type="text" id="name" name="nome" v-model="this.mess_name" required>

                        <label for="surname">Surname:</label>
                        <input type="text" id="surname" name="cognome" v-model="this.mess_surname" required>

                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required v-model="this.mess_email">

                        <label for="email_body">Message:</label>
                        <textarea id="email_body" name="email_body" rows="4" cols="50" v-model="this.mess_body" required></textarea>

                        <input type="submit" value="Send Message" @click.prevent="compose_params()"> -->
        </form>

        <!-- MESSAGGIO AUTOMATICO INVIO MESSAGGIO -->
        <div class="alert alert-warning alert-dismissible fade show m-3" role="alert" v-if="this.msg_response">
            <strong>Messaggio inviato correttamente!</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="(this.msg_response = '' )"></button>
        </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>