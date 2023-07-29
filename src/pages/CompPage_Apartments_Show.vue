<script>
import { router } from '../router';
import MessageForm from "../components/Comp_MessageForm.vue";
import Comp_OnLoading from "../components/Comp_OnLoading.vue";
import Comp_Map from "../components/Comp_Map.vue";
import { store } from '../store';
import axios from "axios";
    export default
    {
        name    : "CompPage_Apartments_Show",
        components : {
            MessageForm,
            Comp_OnLoading,
            Comp_Map,
        },
        data()
        {
            return {
                store,
                direct_call : false,
                showCarousel: false,
            }
        },
        beforeRouteUpdate(to, from, next) 
        {
            const title_data = to.params.slug.replaceAll("-", " ");
            document.title = `BoolB&B | ${title_data}`;
            next();
        },
        watch:
        {
            'store.axios_running' (new_value)
            {
                if ((!new_value) && (this.direct_call))
                {
                    console.log("OK");
                    this.direct_call = false;
                    if (Object.keys(this.store.one_apartment).length !== 0)
                    {
                        const apt_slug = this.store.one_apartment.slug;
                        const current_route = router.currentRoute.value;
                        router.replace({ ...current_route, params:{ ...current_route.params, slug: apt_slug } });
                    }
                }
            }
        },
        mounted() 
        {
        },
        created()
        {
            store.page_name = "Show";
            if ((!this.store.axios_running) && (this.condition_to_go()))
            {
                console.log('refresh pagina in corso');
                this.direct_call = true;
                this.store.prepare_reactive_call('single', this.$route.params.id); 
            }
            store.selected_range = 20;
            store.selected_services = [];
            store.city_to_search = '';
            store.searched_text= '';
            store.searched_city= '';

        },
        methods: 
        {
            //configurazione mappa
            condition_to_go()
            {
                if (Object.keys(this.store.one_apartment).length === 0)
                    return true;
                if (this.store.one_apartment.id !== this.$route.params.id )
                    return true;
                else
                    return false;
            },
            openCarousel(event) 
            {
                // evita di cambiare URL
                event.preventDefault();

                this.showCarousel = true;

                document.body.classList.add('modal-open');

                document.addEventListener('click', this.handleDocumentMouseClick.bind(this));
            },
            handleDocumentMouseClick(event) 
            {
                const carouselElement = document.getElementById('carouselExampleFade');
                const overlayElement = document.querySelector('.overlay');

                if (overlayElement && !carouselElement.contains(event.target) && !overlayElement.contains(event.target)) 
                {
                    this.closeCarousel();
                }
            },
            handleCarouselClick(event) 
            {
                const carouselElement = document.getElementById('carouselExampleFade');
                const overlayElement = document.querySelector('.overlay');

                if (!carouselElement.contains(event.target) && !overlayElement.contains(event.target)) 
                {
                    this.closeCarousel();
                }
            },
            closeCarousel() 
            {
                this.showCarousel = false;

                document.body.classList.remove('modal-open');

                document.removeEventListener('click', this.handleDocumentMouseClick);
            },
            
            handleMouseDown(event) 
            {
                event.stopPropagation();
            },
        },
    }
</script>

<template>
    <div v-if="!store.axios_running" class="container">
        <div class="my-4 align-items-center ">
            <div class="row mb-2">
                <div class="col-12 col-md-9 text-center text-md-start">
                    <h1>
                        {{ store.one_apartment.title }}
                    </h1>
                    <div>
                        <i>
                            {{store.one_apartment.address  }}
                        </i>
                        <span class="ms-2">
                            <b>
                                {{store.one_apartment.city }}
                            </b>
                        </span>
                    </div>    
                </div>
                <div class="col-3 text-end d-none d-md-block align-self-center">
                    <!-- btn per form msg -->
                    <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    Contatta l'Host!
                    </button>    
                </div>
            </div>
            <div>
                <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" style="width: 35vw;">
                    <MessageForm/>
                </div>
            </div>    
        </div>
        <div class="row">
            <div class="col-6 p-2">
                <div class="overflow-hidden box-image-sx" style="height: 100%; max-height: 500px;">
                    <a href="#" @click.stop="openCarousel">
                        <img :src="`http://127.0.0.1:8000/storage/${store.one_apartment.cover_img}`" alt="" class="img-box">    
                    </a>
                    
                </div>
            </div>
            <div class="col-6">
                <div class="row">
                    <div v-for="(pictures, index) in store.one_apartment.pictures" :key="index" class="col-6 p-2">
                        <div class="overflow-hidden box-image-dx" style="height: 100%; max-height: 240px;">
                            <a href="#" @click.stop="openCarousel">
                                <img :src="`http://127.0.0.1:8000/storage/${pictures.picture_url}`" alt="" :class="`img-box img-${index}`">    
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- offcanvas del carosello -->
            <div v-if="showCarousel" class="modal show d-block background" id="modal-carousel" tabindex="-1" @click="handleCarouselClick">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">

                        <!-- carosello -->
                        <div id="carouselExampleFade" class="carousel slide carousel-fade">
                            <div class="carousel-inner">

                                <!-- immagini -->
                                <div class="carousel-item active carousel-image-container">
                                    <h5 class="carousel-title">{{ store.one_apartment.title }}</h5>
                                    <img :src="`http://127.0.0.1:8000/storage/${store.one_apartment.cover_img}`" class="d-block w-100" alt="">
                                </div>
                                <div v-for="(pictures, index) in store.one_apartment.pictures" :key="index" class="carousel-item carousel-image-container">
                                    <h5 class="carousel-title">{{ store.one_apartment.title }}</h5>
                                    <img :src="`http://127.0.0.1:8000/storage/${pictures.picture_url}`" class="d-block w-100" alt="">
                                </div>

                            </div>

                            <!-- button prev/next -->
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="row my-2">
            <div class="col-6">
                <span><b>Stanze:</b> {{ store.one_apartment.number_of_rooms }}</span>
                <span class="ms-3"><b>Bagni:</b> {{ store.one_apartment.number_of_bathrooms }}</span>
                <span class="ms-3"><b>Dimensioni:</b> {{ store.one_apartment.square_meters }} Mq.</span>
            </div>
            <div class="col-6">
                <span>
                    <b>
                        Prezzo:
                    </b>
                     {{ store.one_apartment.price }}
                </span>
            </div>
        </div>
        <hr>
        <!-- descrizione apt -->
        <p class="text-center">
            <i>
                "{{ store.one_apartment.description }}"
            </i>
        </p>
        <div class="col-12 text-center  d-md-none">
            <!-- btn per form msg -->
            <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            Contatta l'Host!
            </button>    
        </div>
        <hr>

        <!-- servizi -->
        <div class="row pb-2">
            <div class="col-6">
                <p>
                    <b>
                        Cosa troverai:
                    </b>
                </p>
                <div class="row">
                    <div v-for="(service, index) in store.one_apartment.services" class="col-6 my-2">
                        <i :class="service.icon" class="fa-xl"></i>
                        <span class="ms-2">
                            {{ service.name }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="col-6 my-3">
                 <!-- mappa -->
                <div style="height: 50vh;">
                    <Comp_Map />
                </div>
            </div>

            <!-- Overlay -->
            <div v-if="showCarousel" class="overlay" @click="closeCarousel" @mousedown="handleMouseDown"></div>

        </div>


    </div>
    <Comp_OnLoading v-else 
        :hg_color = "'white'"
        :big = "true"
        :message = "''"
    />
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

.modal-open {
  overflow: hidden;
}

.background{
    background-color: rgba(0, 0, 0, 0.394)!important;
}

.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
}

.overlay.active {
    display: block;
}

.carousel-image-container {
    position: relative;

    .carousel-title {
        position: absolute;
        top: 10px;
        left: 10px;
        color: #fff;
    }
}

</style>