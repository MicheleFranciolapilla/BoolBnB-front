<script>

  import Comp_Jumbotron_Dekstop from "../components/Comp_Jumbotron_Dekstop.vue";
  import Comp_Jumbotron_Mobile from "../components/Comp_Jumbotron_Mobile.vue";

  export default{
      name: "",
      components: {
        Comp_Jumbotron_Dekstop,
        Comp_Jumbotron_Mobile
      },
      data() {
          return {

          }
      },
      methods: {

      }
  }

</script>

<template>

  <Comp_Jumbotron_Dekstop class="d-none d-lg-flex d-md-flex"/>

  <Comp_Jumbotron_Mobile class="d-sm-flex d-md-none" />

</template>

<style lang="scss" scoped>

</style>