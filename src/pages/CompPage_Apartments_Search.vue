<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Apartments_Search",
        data()
        {
            return {
            }
        },
        created()
        {
            store.page_name = "Search";
        }
    }
</script>

<template>
    <h1>I am the search page</h1>
</template>

<style lang="scss">

</style>