<script>
    import { store } from '../store';
    import Comp_OnLoading from '../components/Comp_OnLoading.vue';
    import Comp_Jumbotron from '../components/Comp_Jumbotron.vue';

    export default
    {
        name    :   "CompPage_Home",
        components :
        {
            Comp_OnLoading,
            Comp_Jumbotron
        },
        data()
        {
            return  {
                        store,
                    }
        },
        created()
        {
            this.store.page_name = "Home";
            store.searched_text = "";
            console.log("ready for calling");
            this.page_update(1);
            store.selected_range = 20;
            store.selected_services = [];
            store.city_to_search = '';
            store.searched_text= '';
            store.searched_city= '';
        },
        methods: 
        {
            page_update(page)
            {
                this.store.currentpage = page;
                this.store.prepare_reactive_call("sponsored");
            },
        },
    }
</script>

<template>
    <div class="main">
        <div class="row mx-auto">
            <Comp_Jumbotron />
        </div>
        <div class="row container mx-auto">
            <h2 class="display-1 text-white animate__animated animate__slideInLeft animate__delay-1s">APARTAMENTI CONSIGLIATI</h2>
            <div v-for="(apartment, index) in store.apartments.data " :key='index' class="p-1 col-sm-12 col-md-6 col-xl-4 animate__animated animate__zoomIn animate__delay-1s">
                <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.prepare_reactive_call('single',apartment.id)">
                    <div class=" p-2 my-1">
                        <span class="badge text-bg-warning">Sponsorizzato</span>
                        <div class="overflow-hidden rounded-4 image_container apart-card" style="height: 300px;">
                            <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box">
                            <img v-for="(image, index) in apartment.pictures" :src="`http://127.0.0.1:8000/storage/${image.picture_url}`" alt=""> 
                        </div>
                        
                        <div class="mt-2">                        
                            <div>
                                <b>
                                    {{ apartment.title }}, 
                                </b>
                                <span class="ms-2">
                                    <b>
                                        <i>
                                            {{ apartment.city }}
                                        </i>
                                    </b>
                                </span>
                            </div>
                            <div>
                                <i>
                                    {{ apartment.address }}
                                </i>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="mt-3">
            <nav aria-label="Page navigation container-fluid">
                <div class="row justify-content-center">
                    <ul class="pagination justify-content-center">
                      <li class="page-item" :class="(this.store.currentpage === 1) ? 'disabled' : ''">
                        <a class="page-link"  @click.prevent="page_update(this.store.currentpage - 1)" href="#" aria-label="Previous">
                          <span aria-hidden="true">&laquo;</span>
                        </a>
                      </li>
                      <li class="page-item" :class="(this.store.currentpage === pages) ? 'active' : ''" aria-current="page" v-for="(pages,index) in this.store.maxPage ">
                          <a class="page-link" @click.prevent="page_update(pages)" href="#" :style="(store.currentpage === pages) ? 'pointer-events: none; cursor: default;' : ''" >{{ pages }}</a>
                      </li>
                      <li class="page-item" :class="(this.store.currentpage === this.store.maxPage) ? 'disabled' : ''" >
                        <a class="page-link" @click.prevent="page_update(this.store.currentpage + 1)" href="#" aria-label="Next">
                          <span aria-hidden="true">&raquo;</span>
                        </a>
                      </li>
                    </ul>
                </div>
            </nav> 
        </div>
    </div>
    <Comp_OnLoading v-if="store.axios_running" 
        :hg_color = "'white'"
        :big = "true"
        :message = "''"
    />
</template>

<style lang="scss">
.main{
    background-color: #C4D7B2;

    .apart-card{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .badge{
        position: relative;
        top: 15px;
        left: -10px;
        padding: 6px;
        z-index: 9999;
    }

    h2{
        text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.77);
    }

}

</style>
