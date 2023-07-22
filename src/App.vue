<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_Header from "./components/Comp_Header.vue";
  import Comp_OnLoading from "./components/Comp_OnLoading.vue";
  import Comp_ErrorManager from "./components/Comp_ErrorManager.vue";
  export default
  {
    name        : "App",
    components  : 
    {
      Comp_Header,
      Comp_OnLoading,
      Comp_ErrorManager
    },
    data()
    {
      return {
        store
      }
    },
    // watch:
    // {
    //   'store.page_name' (new_value)
    //   {
    //     if ((new_value === "Home") && (this.store.api_error.error_index === 0))
    //     {
    //       console.log("chiamata api per appartamenti");
    //       this.get_apartments("sponsored");
    //     }
    //   }
    // },
    mounted()
    {
      if (this.store.just_started)
      {
        this.initialize();
      }
    },
    methods:
    {
      async initialize()
      {
        this.store.front_url_root = window.location.origin;
        await this.inform_backend();
        await this.get_services();
      },

      inform_backend()
      {
        this.store.axios_running = true;
        let params = { front_url : this.store.front_url_root };
        axios.post(`${this.store.api_url_root}front_end`, params)
          .then( res =>
            {
              if ((res.data.success) && (res.data.value == this.store.front_url_root))
              {
                this.store.api_error.error_index = 0;
                this.store.just_started = false;
                console.log("indirizzo front_end inviato con successo");
              }
              else
              {
                this.store.api_error.error_index = -1;
                this.store.api_error.error_msg = "Impossibile stabilire connessione con il backend";
              }
              this.store.axios_running = false;
            })
          .catch( error =>
            {
              this.store.api_error.error_index = -1;
              this.store.api_error.error_msg = "Impossibile stabilire connessione con il backend";
              this.store.axios_running = false;
            });
      },

      get_services()
      {
        this.store.axios_running = true;
        axios.get(`${this.store.api_url_root}services`)
          .then( res =>
            {
              if (res.data.success)
              {
                this.store.api_error.error_index = 0;
                this.store.services = res.data.services;
                console.log("servizi ricevuti con successo");
              }
              else
              {
                this.store.api_error.error_index = 1;
                this.store.api_error.error_msg = "Elenco servizi non ricevuto";
              }
              this.store.axios_running = false;
            })
          .catch( error =>
            {
              this.store.api_error.error_index = -2;
              this.store.api_error.error_msg = "Errore nella chiamata per ottenimento servizi";
              this.store.axios_running = false;
            });
      },

      get_apartments(filter = "all")
      {
        let params = { "filter" : filter };
        this.store.axios_running = true;
        axios.get(`${this.store.api_url_root}apartments`, { params })
        .then( res =>
          {
            if (res.data.success)
            {
              this.store.api_error.error_index = 0;
              this.store.apartments = res.data.apartments;
              this.store.maxPage = res.data.apartments.last_page;
            }
            else
            {
              this.store.api_error.error_index = 2;
              this.store.api_error.error_msg = "Nessun appartamento con le caratteristiche richieste";
            }
            this.store.axios_running = false;
          })
        .catch( error =>
          {
            this.store.api_error.error_index = -3;
            this.store.api_error.error_msg = "Errore nella chiamata per ottenimento appartamenti";
          });
      }
    }
  }
</script>

<template>
  <div id="front_end">
    <Comp_Header/>
    <h1 class="text-center">Welcome to Bool B&B</h1>
    <router-view></router-view>
    <Comp_OnLoading 
     v-if="(store.axios_running)"
     :hg_color = "'blue'"
     :big = "true"
     :message = "(store.just_started) ? ('Tentativo di prima connessione al database in corso...') : ('Recupero dati dal database')" />
  </div>
  <!-- <Comp_ErrorManager /> -->
</template>

<style lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>
