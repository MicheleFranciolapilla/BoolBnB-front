<script>
    import { store } from '../store';
    import axios from "axios";

    export default
    {
        name    :   "CompPage_Home",
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
            this.store.currentpage = 1;
            this.prepare_reactive_call("sponsored");
            // this.axios_update("",1);
        },
        methods: 
        {
            axios_update(op, page = 0)
            {
                switch (op)
                {
                    case "+"    :   this.store.currentpage++;
                                    break;
                    case "-"    :   this.store.currentpage--;
                                    break;
                    default     :   this.store.currentpage = page;
                }
                this.store.prepare_reactive_call("sponsored", this.store.currentpage);
            },
        },
    }
</script>

<template>
    <div v-if="store.apartments !== null">

        <div>
            <nav aria-label="Page navigation">
              <ul class="pagination    ">
                <li class="page-item" :class="(this.store.currentpage === 1) ? 'disabled' : ''">
                  <a class="page-link"  @click.prevent="axios_update('-')" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item" :class="(this.store.currentpage === pages) ? 'active' : ''" aria-current="page" v-for="(pages,index) in this.store.maxPage ">
                    <a class="page-link" @click.prevent="axios_update('',pages)" href="#" :style="(store.currentpage === pages) ? 'pointer-events: none; cursor: default;' : ''" >{{ pages }}</a>
                </li>
                <li class="page-item" :class="(this.store.currentpage === this.store.maxPage) ? 'disabled' : ''" >
                  <a class="page-link" @click.prevent="axios_update('+')" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav> 
        </div>

        <div class="row container mx-auto">
            <div v-for="(apartment, index) in store.apartments.data " :key='index' class="p-1 col-4">
                <router-link :to="{name: 'apartments_show', params: { id: apartment.id, slug:apartment.slug}}" class="text-decoration-none text-black" @click="store.get_single_apartment(apartment.id)">
                    <div class=" p-2 my-1">
                        <div class="overflow-hidden rounded-4" style="height: 300px;">
                            <img :src="`http://127.0.0.1:8000/storage/${apartment.cover_img}`" alt="" class="img-box">
                        </div>
                        <div class="mt-3">                        
                            <p>
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
                            </p>
                            <p class="mt-0">
                                <i>
                                    {{ apartment.address }}
                                </i>
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .img-box {
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
    display: block;
}

</style>
