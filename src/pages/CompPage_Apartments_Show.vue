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
                showService: false,
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

            openCarousel(index) 
            {
                // Imposta lo showCarousel su true
                this.showCarousel = true;
                // Imposta l'indice dell'immagine cliccata come indice attivo nel carosello
                this.$nextTick(() => {
                    const carouselElement = document.getElementById('carouselExampleFade');
                    const bsCarousel = new bootstrap.Carousel(carouselElement);
                    bsCarousel.to(index);
                });
                // Rimuovi la classe "modal-open" dal body per consentire lo scorrimento della pagina
                document.body.classList.remove('modal-open');
                // Aggiungi l'evento click al documento per gestire la chiusura del carosello
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
        <div class="my-4">
            <div class="row mb-2">
                <!-- titoli -->
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
                <!-- tasto contatta -->
                <div class="col-3 text-end d-none d-md-block align-self-center">
                    <!-- btn per form msg -->
                    <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                    Contatta l'Host!
                    </button>    
                </div>
            </div>
            <!-- offcanvas -->
            <div>
                <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <MessageForm/>
                </div>
            </div>    
        </div>
        <!-- carosello -->
        <div class="row">
            <div class="col-12  col-lg-6 p-2">
                <div class="overflow-hidden box-image-sx" style="height: 100%; max-height: 500px;">
                    <a href="#" @click.stop="openCarousel(0)">
                        <img :src="`http://127.0.0.1:8000/storage/${store.one_apartment.cover_img}`" alt="" class="img-box">    
                    </a>
                </div>
            </div>
            <div class="col-12 col-lg-6 ">
                <div class="row px-1">
                    <div v-for="(pictures, index) in store.one_apartment.pictures" :key="index" class="col-3 col-lg-6 p-1 p-lg-2">
                        <div class="overflow-hidden box-image-dx" style="height: 100%; max-height: 240px;">
                            <a href="#" @click.stop="openCarousel(index + 1)">
                                <img :src="`http://127.0.0.1:8000/storage/${pictures.picture_url}`" alt="" :class="`img-box img-${index}`">    
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- offcanvas del carosello -->
        <div>
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
        <!-- specifiche appartamento -->
        <div class="row my-2">
            <div class="col-6 col-md-4 col-lg-3 col-xl-12">
                <span><b>Stanze:</b> {{ store.one_apartment.number_of_rooms }}</span>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-xl-12">
                <span><b>Bagni:</b> {{ store.one_apartment.number_of_bathrooms }}</span>
            </div>
            <div class="col-6 col-md-4 col-lg-3 col-xl-12">
                <span><b>Dimensioni:</b> {{ store.one_apartment.square_meters }} Mq.</span>
            </div>
            <div class="col-12 col-lg-3 col-xl-12">
                <span>
                    <b>
                        Prezzo:
                    </b>
                     {{ store.one_apartment.price }}&#x20AC;
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
        <!-- bottone che appare solo nel mobile -->
        <div class="col-12 text-center  d-md-none ">
            <!-- btn per form msg -->
            <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            Contatta l'Host!
            </button>    
        </div>
        <hr>

        <!-- servizi -->
        <div class="row pb-2">
            <div class="col-12">
                <div>
                    <b>
                        Cosa troverai:
                    </b>
                    <span class="ms-5 opacity-50 show-click show-btn d-lg-none" @click="(this.showService == true) ? this.showService = false : this.showService = true">
                        <span v-if="!this.showService">
                            <i>
                                Mostra tutto
                            </i>
                        </span>
                        <span v-else>
                            <i>
                                Mostra meno
                            </i>
                        </span>
                    </span>
                </div>
                <div class="row mt-2 service-box" :style="(showService) ? 'max-height: none' : ''">
                    <div v-for="(service, index) in store.one_apartment.services" class="col-6 col-md-4 col-xl-2 my-2">
                        <i :class="service.icon"  style="color: rgba(0, 0, 0, 0.404);"></i>
                        <span class="ms-2" style="font-size: 13px;">
                            {{ service.name }}
                        </span>
                    </div>
                </div>
            </div>

            <hr>

            <div class="col-12 my-3">
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
    z-index: 999999!important;
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

.service-box {
    max-height: 85px;
    overflow: hidden;
}

.show-click {
    cursor: pointer;
}

@media (max-width: 992px) {
    .offcanvas.offcanvas-end {
        width: 100%;
    }
}



@media (min-width: 992px) {
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

    .offcanvas.offcanvas-end {
        width: 50%;
    }

    .service-box {
    max-height: none;
    overflow: none;
}
}
</style>