<script>
    import { store } from '../store';

    export default
    {
        name    :   "CompPage_404",
        data()
        {
            return  {
                        store,
                    }
        },
        created()
        {
            this.store.page_name = "404";
            this.store.api_error.error_index = 0;
        },
    }
</script>

<template>
    <h1 class="mt-5 text-center text-danger">ERRORE 404</h1>
    <h2 class="mt-3 text-center text-warning">{{ store.api_error.error_msg }}</h2>
</template>

<style lang="scss">


</style>
