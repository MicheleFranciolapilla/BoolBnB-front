<script setup>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { store } from '../store';



const GOOGLE_MAPS_API_KEY = 'AIzaSyAAjut9fZcWuTjBKeprMbvu-eVfqLt3Nvc';

let nostriMarker = ref(
    [
        { position: { lat: parseFloat(store.one_apartment.latitude), lng: parseFloat(store.one_apartment.longitude) }, title: store.one_apartment.title, link: 'https://www.example.com/newyork' },
    ]
);

let nostraMap = {
            center: { lat:  parseFloat(store.one_apartment.latitude), lng: parseFloat(store.one_apartment.longitude) },
            zoom: 20,
        };



const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
const markers = nostriMarker

onMounted(async () => {
    await loader.load();

    console.log(store.apartments)
    if(store.page_name == 'Search'){
        nostraMap = {
            center: { lat:  parseFloat(store.cityQuery.latitude), lng: parseFloat(store.cityQuery.longitude) },
            zoom: 14,
        };

        nostriMarker.value.pop();
        const updatedMarkerArray = [...nostriMarker.value];
        
        Object.values(store.apartments).forEach(apartment =>
        {
            let newApt = 
            { 
                position: { lat: parseFloat(apartment.latitude), lng: parseFloat(apartment.longitude) }, title: apartment.title, link: 'https://www.example.com/newyork' 
            };
            updatedMarkerArray.push(newApt);
        });

        nostriMarker.value = updatedMarkerArray;

    }

    console.log(nostriMarker)
     
    const map = new google.maps.Map(mapDiv.value, nostraMap);

    // Aggiungi i marker alla mappa
    markers.value.forEach(markerData => {
        const marker = new google.maps.Marker({
            position: markerData.position,
            map,
            title: markerData.title,
        });

        // Aggiungi un listener per l'evento di click sul marker
        marker.addListener('click', () => {
            // Apri il link associato al marker in una nuova finestra
            window.open(markerData.link, '_blank');
        });
    });
});
</script>

<template>
    <div ref="mapDiv" style="width: 100%; height: 80vh" />
</template>

<style lang="scss" scoped>

</style>