<script setup>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { store } from '../store';



const GOOGLE_MAPS_API_KEY = 'AIzaSyAAjut9fZcWuTjBKeprMbvu-eVfqLt3Nvc';

const nostiMarker = ref(
    store.nostiMarker
);

const nostraMap = store.nostraMap;


const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
const markers = nostiMarker

onMounted(async () => {
    await loader.load();
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