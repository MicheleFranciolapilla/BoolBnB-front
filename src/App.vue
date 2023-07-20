<script>
  import { store } from "./store";
  import axios from "axios";
  import Comp_ErrorManager from "./components/Comp_ErrorManager.vue";
  export default{
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
        this.store.just_started = false;
      }
    },
    methods:
    {
      inform_backend()
      {
        this.store.axios_running = true;
        axios.post(`${this.store.api_url_root}/api/front_url_root`, { front_url : this.store.front_url_root })
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
