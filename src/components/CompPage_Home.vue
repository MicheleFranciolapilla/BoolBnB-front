<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Home",
        data()
        {
            return {
            }
        },
        created()
        {
            store.page_name = "Home";
        }
    }
</script>

<template>
    <h1>I am the main page</h1>
</template>

<style lang="scss">

</style>
