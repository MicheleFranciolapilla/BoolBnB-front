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
    <h1>I am the show page</h1>
</template>

<style lang="scss">

</style>