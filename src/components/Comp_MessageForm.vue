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

                if(!(this.mess_email == "") && !(this.mess_body == "") && !(this.mess_name == "") && !(this.mess_surname == "")) {

                    // store.api_url_root + "messages?apartment_id=" + this.mess_apt_id + "&email=" + this.mess_email + "&email_body=" + this.mess_body + "&nome=" + this.mess_name + "&cognome=" + this.mess_surname
                    axios.post(store.api_url_root + "messages", params).then(res => {
                        this.msg_response = res.data.success
                        console.log(this.msg_response)
                    })

                } else {

                }

            }
        }
    }
</script>

<template>
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
        <div class="alert alert-warning alert-dismissible fade show m-3" role="alert" v-if="this.msg_response">
            <strong>Holy guacamole!</strong> {{this.msg_response}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="(this.msg_response = '' )"></button>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>