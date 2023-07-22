<script>
import { store } from '../store';

    export default
    {
        name    : "CompPage_Apartments_Show",
        data()
        {
            return {
                store
            }
        },
        created()
        {
            store.page_name = "Show";
        }
    }
</script>

<template>
    <div class="container">
        <h1>
            {{ store.one_apartment.title }}
        </h1>
        <p class="mt-3">
            <i>
                {{store.one_apartment.address  }}
            </i>
            <span class="ms-2">
                <b>
                    {{store.one_apartment.city }}
                </b>
            </span>
        </p>
        <div class="row">
            <div class="col-6 p-2">
                <div class="overflow-hidden box-image-sx" style="height: 100%; max-height: 500px;">
                    <img :src="`http://127.0.0.1:8000/storage/${store.one_apartment.cover_img}`" alt="" class="img-box">
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div v-for="(pictures, index) in store.one_apartment.pictures" :key="index" class="col-6 p-2">
                        <div class="overflow-hidden box-image-dx" style="height: 100%; max-height: 240px;">
                            <img :src="`http://127.0.0.1:8000/storage/${pictures.picture_url}`" alt="" :class="`img-box img-${index}`">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p>
            
        </p>
    </div>
</template>

<style lang="scss">
.box-image-sx {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}

.img-1 {
    border-top-right-radius: 30px;
}

.img-3 {
    border-bottom-right-radius: 30px;
}

</style>