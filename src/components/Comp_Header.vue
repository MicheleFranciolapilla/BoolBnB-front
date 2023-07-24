<script>
    // import axios from "axios";
import { store } from "../store";
    export default
    {
        name    :   'Comp_Header',
        data()
        {
            return {
                store   
            }
        },
        mounted(){
            
        },

        methods:{
            Start_search() {
                console.log('funziona')
                //primo check x vedere se è stato inserito testo
                if(store.searched_text !== '')
                {

                    //creiamo un variabile che associato il valore inserite nella barra di ricerca e lo rende lowercase
                    const searchTextLower = this.store.searched_text.toLowerCase();
                    //controlliamo se esiste un match perfetto nell'array delle città se esiste la variabile extacMatch ne associa il valore rispettivo dall'array
                    const exactMatch = this.store.all_cities.find(city => city.toLowerCase() === searchTextLower);

                    //se esiste un match perfetto
                    if (exactMatch) 
                    {
                        console.log('sono uguali')
                    //sostituisce il valore scritto nella searchbar al match perfetto
                      this.store.searched_text = exactMatch;

                      //se non esiste un match perfett
                    } 
                    else 
                    {
                        console.log('non sono uguali')
                        //controlliamo se esiste un match parziale (per una cittò scritta a metà magarai..) e ne associamo i valori
                      const partialMatch = this.store.all_cities.find(city => city.toLowerCase().includes(searchTextLower));
                    
                      //se esiste un match parziale
                      if (partialMatch) 
                      {
                        console.log('allora ci pensoo io')
                        // sostituiamo i valori semi corretti dalla search bar i migliori valori che siamo riusciti a trovare
                        this.store.searched_text = partialMatch;
                      }
                    }

                    this.store.city_to_search = this.store.searched_text;
                    this.store.prepare_reactive_call("all");

                    //se siamo in una pagina che sia search
                    if(store.page_name !== 'Search') 
                    {
                        //vai alla pagina search
                        console.log('vado?')
                        const city = this.store.searched_text;
                        this.$router.push({ name: 'apartments_search', params: { city: city } });
                    }
                    else 
                    {
                        const currentCity = this.store.searched_text;
                        this.$router.replace({ ...this.$route, params: { ...this.$route.params, city: currentCity } });
                    }
                }
                


            },
            Searched_hint(){
                if (store.searched_text.length > 1) {
                const tomTomUrl = `https://api.tomtom.com/search/2/geocode/${store.searched_text}.json?key=mDuLGwpUfBez8sET5BVhGMRbc4FRXzB4&countrySet=IT&limit=100&minFuzzyLevel=2&typeahead=false`;
                fetch(tomTomUrl)
                .then(response => response.json())
                .then(data => {
                    let results = data.results;
                    // Create a Map to store unique elements
                    const uniqueElements = new Map();
                    results.forEach(element => {
                    // Check if the element type is "Geography" or "Street"
                    if (element.type === "Geography" || element.type === "Street") {
                        let address, latitude, longitude;
                         // Extract data based on the element type
                        if (element.type === "Geography") {
                          address = element.address.municipality;
                          latitude = element.position.lat;
                          longitude = element.position.lon;
                        } else if (element.type === "Street") {
                          address = element.address.freeformAddress;
                          latitude = element.position.lat;
                          longitude = element.position.lon;
                        }
                    // Check if address, latitude, and longitude are not undefined
                    if (address && latitude !== undefined && longitude !== undefined) {
                        // Create a unique key using address, latitude, and longitude
                        const key = `${address}_${latitude}_${longitude}`;
                        // Add to the Map only if it's a unique combination
                        if (!uniqueElements.has(key)) {
                            uniqueElements.set(key, { address, latitude, longitude });
                            }
                        }
                    }
                });
                const uniqueElementsArray = Array.from(uniqueElements.values());
                const customSort = (a, b) => {
                const scoreA = a.address.toLowerCase().includes(store.searched_text.toLowerCase()) ? 1 : 0;
                const scoreB = b.address.toLowerCase().includes(store.searched_text.toLowerCase()) ? 1 : 0;
                if (scoreA !== scoreB) {
                  return scoreB - scoreA;
                }
                return a.address.localeCompare(b.address);
                };
                uniqueElementsArray.sort(customSort);
                store.RaccoltaIndirizzi = uniqueElementsArray            
                let hintList = document.getElementById('cities');
                hintList.innerHTML = '';
                store.RaccoltaIndirizzi.forEach(element => {
                      // Create a new option element
                    const option = document.createElement('option');
                    
                      // Set the value and text of the option to the address property
                    option.value = element.address;
                    option.textContent = element.address;
                    
                      // Append the option to the hintList
                    hintList.appendChild(option);
                });                              
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                });
            }
            },    
            calcolatoreLatLon(lat1, lon1, lat2, lon2){
            const R = 6371e3; // metres
    
            const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;
    
            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
            const d = R * c; // in metres
            
            const distanceInKilometers = (d / 1000).toFixed(1);

            console.log(distanceInKilometers);
            return distanceInKilometers;
            }
        },
    }
</script>

<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">BoolB&B</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item" href="http://127.0.0.1:8000/login">Login</a>
                        </li>
                        <li>
                            <a class="dropdown-item" href="http://127.0.0.1:8000/register">Registrazione</a>
                        </li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li>
                            <a class="dropdown-item" href="#">Profilo</a>
                        </li>
                    </ul>
                </li>
            </ul>
            <button @click="calcolatoreLatLon(41.89056, 12.49427, 41.89695, 12.48223)">vai</button>
            <form class="d-flex" role="search" @submit.prevent="Start_search">
                <input v-model="store.searched_text" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" list="cities" @keyup="Searched_hint()">
                <datalist id="cities">
                  <option v-for="(city, index) in store.all_cities" :key="index" :value="city">{{ city }}</option>
                </datalist>
                <button class="btn" type="submit" @click.prevent="Start_search">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    </div>
</nav>

</template>
