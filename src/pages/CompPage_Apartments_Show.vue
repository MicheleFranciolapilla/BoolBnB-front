<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Apartments_Show",
        data()
        {
            return {
            }
        },
        created()
        {
            store.page_name = "Show";
        }
    }
</script>

<template>
    <h1>{{this.$route.params.id}}</h1>
    <h2></h2>
</template>

<style lang="scss">

</style>