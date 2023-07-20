<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_ErrorManager from "./components/Comp_ErrorManager.vue";
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
      }
    }
  }
</script>

<template>
  <!-- <Comp_ErrorManager /> -->
  <h2>Welcome</h2>
  <router-view></router-view>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>
