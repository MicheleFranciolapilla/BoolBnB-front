<script>
    import { store } from '../store';
    import Comp_OnLoading from '../components/Comp_OnLoading.vue';

    export default
    {
        name    :   "CompPage_Home",
        components :
        {
            Comp_OnLoading
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
    <div>
        <div class="row container mx-auto">
            <div v-for="(apartment, index) in store.apartments.data " :key='index' class="p-1 col-sm-12 col-md-6 col-xl-4">
                <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.prepare_reactive_call('single',apartment.id)">
                    <div class=" p-2 my-1">
                        <div class="overflow-hidden rounded-4 image_container" style="height: 300px;">
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


</style>
