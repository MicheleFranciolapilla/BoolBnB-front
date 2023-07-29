<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_Header from "./components/Comp_Header.vue";
  import Comp_OnLoading from "./components/Comp_OnLoading.vue";
  import Comp_ErrorManager from "./components/Comp_ErrorManager.vue";
  import Comp_Footer from "./components/Comp_Footer.vue";
  export default
  {
    name        : "App",
    components  :
    {
      Comp_Header,
      Comp_OnLoading,
      Comp_ErrorManager,
      Comp_Footer,
    },
    data()
    {
      return  {
                store,
                front_url_sent : false
              }
    },
    watch:
    {
      'store.reactive_calls' (new_value)
      {
        if (new_value)
        {
          this.store.reactive_calls = false;
          this.get_apartments();
        }
      }
    },
    mounted()
    {
      if (this.store.just_started)
        this.initialize();
    },
    methods:
    {
      async initialize()
      {
        this.store.front_url_root = window.location.origin;
        console.log("inform_backend");
        await this.inform_backend();
        if (this.front_url_sent)
        {
          console.log("get services");
          await this.get_services();
          console.log("just started: ", this.store.just_started);
          this.store.just_started = false;
          console.log("just started: ", this.store.just_started);
        }
      },

      async inform_backend()
      {
        this.store.axios_running = true;
        let params = { front_url : this.store.front_url_root };
        await axios.post(`${this.store.api_url_root}front_end`, params)
          .then( res =>
            {
              if ((res.data.success) && (res.data.value == this.store.front_url_root))
              {
                this.store.api_error.error_index = 0;
                this.front_url_sent = true;
                console.log("indirizzo front_end inviato con successo");
              }
              else
              {
                this.store.api_error.error_index = -100;
                this.store.api_error.error_msg = "Impossibile stabilire connessione con il backend";
              }
              this.store.axios_running = false;
            })
          .catch( error =>
            {
              this.store.api_error.error_index = -100;
              this.store.api_error.error_msg = "Impossibile stabilire connessione con il backend";
              this.store.axios_running = false;
            });
      },

      async get_services()
      {
        this.store.axios_running = true;
        await axios.get(`${this.store.api_url_root}services`)
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
                this.store.api_error.error_index = -100;
                this.store.api_error.error_msg = "Elenco servizi non ricevuto";
              }
              this.store.axios_running = false;
            })
          .catch( error =>
            {
              this.store.api_error.error_index = -100;
              this.store.api_error.error_msg = "Errore nella chiamata per ottenimento servizi";
              this.store.axios_running = false;
            });
      },

      compact_services()
      {
        let result = "";
        this.store.selected_services.forEach(element => 
        {
          result += "-" + element;
        });
        return result.substring(1);
      },

      async get_apartments()
      {
        this.store.axios_running = true;
        let end_point = "";
        let params    = "";
        switch (this.store.calls_params.call_type)
        {
          case 0  : //sponsored
                    end_point = "apartments";
                    params    = {
                                  'filter'  : "sponsored",
                                  'page'    : this.store.currentpage
                                };
                    break;
          case 1  : //single
                    end_point = `apartment/${this.store.calls_params.id}`;
                    params    = "";
                    break; 
          case 2  : //all
                    end_point = "apartments";
                    if (this.store.direct_search_only_city)
                    {
                      params  = { 
                                  'filter'  : "all",
                                  'city'    : this.store.city_to_search,
                                };
                      this.store.direct_search_only_city = false;
                    }
                    else
                    {
                      params  = {
                                  'filter'  : "all",
                                  'city'    : this.store.cityQuery['city'],
                                  'long'    : this.store.cityQuery['longitude'],
                                  'lat'     : this.store.cityQuery['latitude'],
                                  'range'   : this.store.selected_range,
                                  'service' : this.compact_services()
                                };
                    }
                    break;
        }
        await axios.get(`${this.store.api_url_root}${end_point}`, { params })
          .then( res =>
            {
              if (res.data.success)
              {
                this.store.api_error.error_index = 0;
                console.log("Sto per mostrare l'attuale path:");
                this.store.last_valid_route = this.$route.fullPath;
                console.log(this.store.last_valid_route);
                switch (this.store.calls_params.call_type)
                {
                  case 0  : //sponsored
                            this.store.apartments = res.data.apartments;
                            this.store.maxPage = res.data.apartments.last_page;
                            break;
                  case 1  : //single
                            this.store.one_apartment = res.data.apartment;
                            store.latitude = parseFloat(res.data.apartment.latitude)
                            store.longitude = parseFloat(res.data.apartment.longitude)
                            console.log(store.latitude, store.longitude)
                            break;
                  case 2  : //all
                            this.store.apartments = res.data.apartments;
                            this.store.searched_city = this.store.cityQuery.address;
                            this.store.searched_text = this.store.searched_city;
                            break;
                }
              }
              else
              {
                // La seguente assegnazione di errore viene implementata per poter distinguere il tipo di richiesta axios che ha prodotto l'errore specifico. Inoltre l'aggiunta del valore (1) al call_type dipende dal fatto che il valore (0) è già occupato dalla condizione di mancanza di errore
                this.store.api_error.error_index = this.store.calls_params.call_type + 1;
                this.store.api_error.error_msg = "Nessun appartamento con le caratteristiche richieste";
                if (this.store.api_error.error_index !== 1)
                  this.$router.push({ name : 'not-found' });
              }
              this.store.axios_running = false;
            })
            .catch( error =>
              {
                this.store.api_error.error_index = -1 * (this.store.calls_params.call_type + 1);
                this.store.api_error.error_msg = "Errore nella chiamata per ottenimento appartamenti";
                console.log("errore generale");
                this.$router.push({ name : 'not-found' });
              });
            console.log("chiamata axios da ap.vue ultimata");
        },
        go_to_pages()
        {
          return (this.store.api_error.error_index !== -100);
        }
    }
  }
</script>

<template>

  <Comp_ErrorManager />

  <Comp_OnLoading
    v-if="((store.just_started) && (store.axios_running))"
    :hg_color = "(!front_url_sent) ? ('orange') : ('blue')"
    :big = "true"
    :message = "(!front_url_sent) ? ('Tentativo di prima connessione al database in corso...') : ('Recupero dati dal database')"
  />

  <div 
    v-else-if="((!store.just_started) && (go_to_pages()))" 
    id="front_end"
  >
  <div v-if="store.page_name !== '404'">
    <Comp_Header />
    <h1 v-if="(store.page_name == 'Home')" class="text-center">Welcome to Bool B&B</h1>
  </div>
    <router-view></router-view>
    <Comp_Footer v-if="store.page_name !== '404'" />
  </div>
  
</template>

<style lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

    h1{
      background-color: #C4D7B2;
      margin-bottom: 0;
    }

</style>
