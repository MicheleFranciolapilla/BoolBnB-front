<script setup>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { store } from '../store';



const GOOGLE_MAPS_API_KEY = 'AIzaSyAAjut9fZcWuTjBKeprMbvu-eVfqLt3Nvc';

let nostriMarker = ref(
    [
        { position: { lat: parseFloat(store.one_apartment.latitude), lng: parseFloat(store.one_apartment.longitude) }, title: store.one_apartment.title },
    ]
);

let nostraMap = {
            center: { lat:  parseFloat(store.one_apartment.latitude), lng: parseFloat(store.one_apartment.longitude) },
            zoom: 16,
        };



const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY });
const mapDiv = ref(null);
const markers = nostriMarker;
const infoWindow = ref(null);

onMounted(async () => {
    await loader.load();

    console.log(store.apartments)
    if(store.page_name == 'Search'){
        nostraMap = {
            center: { lat:  parseFloat(store.cityQuery.latitude), lng: parseFloat(store.cityQuery.longitude)},
            zoom: 12,
        };

        nostriMarker.value.pop();
        const updatedMarkerArray = [...nostriMarker.value];
        
        Object.values(store.apartments).forEach(apartment =>
        {
            let newApt = 
            { 
                position: { lat: parseFloat(apartment.latitude), lng: parseFloat(apartment.longitude) }, title: apartment.title, link: 'https://www.example.com/newyork', 
                title: apartment.title,
                cover_image: apartment.cover_img, // Assuming you have a cover_image property in your apartment object
                description: apartment.description,
                price: apartment.price,
                slug: apartment.slug,
                id : apartment.id,
                aptIdent : apartment.id + apartment.slug
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
            info: markerData.aptIdent


        });

        marker.set('markerId', markerData.aptIdent);

        // Aggiungi un listener per l'evento di click sul marker
        marker.addListener('click', () => {
            // Apri il link associato al marker in una nuova finestra
            if(store.page_name == 'Search'){

                openInfoWindow(marker, markerData);
            }
        });

        marker.addListener('mouseover', () => {
            if(store.page_name == 'Search'){

                let aptRef = document.getElementById(markerData.aptIdent);
             



                openInfoWindow(marker, markerData);

                if (aptRef) {
                    aptRef.style.opacity = '0.7';
                }
        }
                
        });

        marker.addListener('mouseout', () => {
            if(store.page_name == 'Search'){

                let aptRef = document.getElementById(markerData.aptIdent);
             
                if (aptRef) {
                    aptRef.style.opacity = '1';
                }

            }
        });

        
    });
});

function openInfoWindow(marker, markerData) {
  // Check if an InfoWindow instance exists, and create one if it doesn't
  if (!infoWindow.value) {
    infoWindow.value = new google.maps.InfoWindow();
  }


//   <img src="http://127.0.0.1:8000/storage/images_for_seeder/id5_1.jpg"  style="width: 100px">
  // Set the InfoWindow content
  infoWindow.value.setContent(`
    <div style="max-width: 320px; max-height: 320px;">
      
      <img src="http://127.0.0.1:8000/storage/${markerData.cover_image}" style="width : 70%" >
      <h6>${markerData.title}</h6>
      <h6>${markerData.price}&#8364;</h6>
      <a class="text-black text-decoration-none" href="http://localhost:5174/dettaglio/${markerData.id}/${markerData.slug}"><b>vai alla pagina</b></a>
    </div>
  `);

  // Open the InfoWindow on the map at the clicked marker's position
  infoWindow.value.open(mapDiv.value, marker);
}

// function closeInfoWindow() {
//   if (infoWindow) {
//     infoWindow.value.close();
//     console.log('chiudo')
//   }
// }
</script>

<template>
    <div ref="mapDiv" style="width: 100%; height: 100%" />
</template>

<style lang="scss" scoped>

</style>