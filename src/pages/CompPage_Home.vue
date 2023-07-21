<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Home",
        data()
        {
            return {
                store
            }
        },
        created()
        {
            store.page_name = "Home";
        }
    }
</script>

<template>
    <div v-if="store.apartments !== null">
        <div class="row container mx-auto">
            <div v-for="(apartment, index) in store.apartments.data " :key='index' class="p-1 col-4">
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
