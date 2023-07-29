<script>
    import { store } from '../store';
    import Comp_Header from '../components/Comp_Header.vue';
    import Comp_Footer from '../components/Comp_Footer.vue';

    export default
    {
        name    :   "CompPage_404",
        components: {
            Comp_Header,
            Comp_Footer,
        },
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
<body>
    <div class="wrapper">
        <Comp_Header />
        <h2 class="mt-3 text-center text-warning">{{ store.api_error.error_msg }}</h2>

        <div class="d-flex justify-content-center">
            <router-link class="nav-link btn btn-primary w-25" aria-current="page" to="/">Torna alla home</router-link>
        </div>

    </div>
    <Comp_Footer />
</body>
</template>

<style lang="scss">
body{
    margin: 0;
    padding: 0;
    min-height: 100vh; 
    display: flex;
    flex-direction: column;
}

.wrapper {
    flex: 1; /* Il contenuto principale (wrapper) occupa lo spazio disponibile rimanente */
}

</style>
