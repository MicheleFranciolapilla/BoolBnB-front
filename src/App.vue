<script>
  import { store } from "./store";
  import Comp_ErrorManager from "./components/Comp_ErrorManager.vue";
  export default{
    name        : "App",
    components  : 
    {
      Comp_ErrorManager
    }
  }
</script>

<template>
  <Comp_ErrorManager />
  <h2>Welcome</h2>
  <router-view></router-view>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>
