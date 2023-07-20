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
        mounted()
        {
            store.page_name = "Home";
        }
    }
</script>

<template>
    <h1>I am the main page</h1>
</template>