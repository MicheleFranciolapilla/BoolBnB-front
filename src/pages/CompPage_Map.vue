<script>
import Comp_Map from '../components/Comp_Map.vue';
import { store } from '../store';

  export default{
      name: "CompPage_Map",
      components : {
        Comp_Map,
      },
      data() {
        return {
            store,
        }
      },
      methods: {

      }
 }
</script>

<template>
  <Comp_Map />
</template>

<style lang="scss" scoped>

</style>