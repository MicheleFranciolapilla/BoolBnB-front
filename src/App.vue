<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_ErrorManager from "./components/sections/Comp_ErrorManager.vue";
  export default
  {
    name        : "App",
    components  : 
    {
      Comp_ErrorManager
    },
    data()
    {
      return {
        store
      }
    },
    watch:
    {
      'store.page_name' (new_value)
      {
        if ((new_value === "Home") && (this.store.api_error.error_index === 0))
        {
          console.log("chiamata api per appartamenti");
          this.get_apartments();
        }
      }
    },
    mounted()
    {
      if (this.store.just_started)
      {
        this.store.front_url_root = window.location.origin;
        this.inform_backend();
      }
    },
    methods:
    {
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
            }
            else
            {
              this.store.api_error.error_index = 1;
              this.store.api_error.error_msg = "Nessun appartamento con le caratteristiche richieste";
            }
            this.store.axios_running = false;
          })
        .catch( error =>
          {
            this.store.api_error.error_index = -1;
            this.store.api_error.error_msg = "Impossibile stabilire connessione con il backend";
          });
      }
    }
  }
</script>

<template>
  <div id="front_end">
    <h1>Welcome to Bool B&B</h1>
    <router-view></router-view>
  </div>
  <!-- <Comp_ErrorManager /> -->
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>
