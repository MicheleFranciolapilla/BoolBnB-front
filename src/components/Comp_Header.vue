<script>
    // import axios from "axios";
import { all } from "axios";
import { store } from "../store";
    export default
    {
        name    :   'Comp_Header',
        data()
        {
            return {
                store,
                click_on_hint   : false,
            }
        },
        mounted(){
            
        },

        methods:
        {

            services_changed()
            {
                for (let i = 0; i < this.store.selected_services.length - 1; i++)
                    for (let j = i + 1; j <= this.store.selected_services.length - 1; j++)
                    {
                        if (this.store.selected_services[i] > this.store.selected_services[j])
                        {
                            let change_var = this.store.selected_services[i];
                            this.store.selected_services[i] = this.store.selected_services[j];
                            this.store.selected_services[j] = change_var;
                        }
                    }
                this.ready_for_call(false);
            },

            ready_for_call(from_search_bar = true)
            {
                // console.log("cityquery da ready for call: ", store.cityQuery);
                if (((this.click_on_hint) && (from_search_bar)) || (!from_search_bar))
                {
                    this.store.city_to_search = this.store.cityQuery.city;
                    this.store.prepare_reactive_call("all");

                    //se siamo in una pagina che sia search
                    if(store.page_name !== 'Search') 
                    {
                        //vai alla pagina search
                        this.$router.push(
                            { 
                                name: 'apartments_search',
                                query: 
                                {
                                    city: store.cityQuery.city,
                                    lat: store.cityQuery.latitude,
                                    long: store.cityQuery.longitude, 
                                    range: store.selected_range,
                                    address: store.cityQuery.address, 
                                }
                            });
                    }
                    else 
                    {
                        this.$router.replace(
                            {
                                name: 'apartments_search',
                                query: 
                                {
                                    city: store.cityQuery.city,
                                    address: store.cityQuery.address,
                                    lat: store.cityQuery.latitude,
                                    long: store.cityQuery.longitude,
                                    range: store.selected_range,
                                    services: store.selected_services
                                },
                            });
                    }
                }
                else if ((!this.click_on_hint) && (from_search_bar))
                {
                    console.log("devi selezionare dalla lista");
                }
            },

            Searched_hint()
            {
                this.click_on_hint = false;
                if (store.searched_text.length > 3) 
                {
                    const tomTomUrl = `https://api.tomtom.com/search/2/geocode/${store.searched_text}.json?key=mDuLGwpUfBez8sET5BVhGMRbc4FRXzB4&countrySet=IT&limit=100&minFuzzyLevel=2&typeahead=false`;
                    fetch(tomTomUrl)
                        .then(response => response.json())
                            .then(data => 
                            {
                                let results = data.results;
                                // Create a Map to store unique elements
                                // console.log(results)
                                const uniqueElements = new Map();
                                results.forEach(element => 
                                    {
                                        // Check if the element type is "Geography" or "Street"
                                        if (element.type === "Geography" || element.type === "Street") 
                                        {
                                            let address, city, type, latitude, longitude;
                                            // Extract data based on the element type
                                            if (element.type === "Geography") 
                                            {
                                                address = element.address.municipality;
                                                city = element.address.municipality;
                                                type = element.type;
                                                latitude = element.position.lat;
                                                longitude = element.position.lon;
                                            } 
                                            else if (element.type === "Street") 
                                            {
                                                address = element.address.freeformAddress;
                                                type = element.type;
                                                city = element.address.municipality;
                                                latitude = element.position.lat;
                                                longitude = element.position.lon;
                                            }
                                            // Check if address, city, type, latitude, and longitude are not undefined
                                            if (address && city && type && latitude !== undefined && longitude !== undefined) 
                                            {
                                                // Create a unique key using address, city, type, latitude, and longitude
                                                const key = `${address}_${city}_${type}_${latitude}_${longitude}`;
                                                // Add to the Map only if it's a unique combination
                                                if (!uniqueElements.has(key)) 
                                                {
                                                    uniqueElements.set(key, { address, city, type, latitude, longitude });
                                                }
                                            }
                                        }
                                    });
                                const uniqueElementsArray = Array.from(uniqueElements.values());
                                const customSort = (a, b) => 
                                {
                                    const scoreA = a.address.toLowerCase().includes(store.searched_text.toLowerCase()) ? 1 : 0;
                                    const scoreB = b.address.toLowerCase().includes(store.searched_text.toLowerCase()) ? 1 : 0;
                                    if (scoreA !== scoreB) 
                                    {
                                        return scoreB - scoreA;
                                    }
                                    return a.address.localeCompare(b.address);
                                };
                                uniqueElementsArray.sort(customSort);
                                store.RaccoltaIndirizzi = uniqueElementsArray            
                                let hintList = document.getElementById('cities');
                                hintList.innerHTML = '';
                                store.RaccoltaIndirizzi.forEach(element => 
                                {
                                    // Create a new option element
                                    let option = document.createElement('option');

                                    // Set the value and text of the option to the address property
                                    option.value = element.address;
                                    option.textContent = element.address;
                                    // Append the option to the hintList
                                    hintList.appendChild(option);


                                    if (element.type === "Street") 
                                    {
                                        if (element.address === store.searched_text) 
                                        {
                                            store.cityQuery = element;
                                            this.click_on_hint = true;
                                        }
                                    } 
                                    else if (element.type === "Geography") 
                                    {
                                        if (element.address === store.searched_text) 
                                        {
                                            store.cityQuery = element;
                                            this.click_on_hint = true;
                                        }
                                    }
                                });   
                                // console.log("valore di city query: ",store.cityQuery);                         
                            })
                            .catch(error => 
                            {
                                console.error("Error fetching data:", error);
                            });
                }
            },  
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
            <form v-if="(store.page_name !== 'Search')" class="d-flex" role="search" @submit.prevent="ready_for_call()">
                <input v-model="store.searched_text" autocomplete="off" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" list="cities" @keyup="Searched_hint()">
                <datalist id="cities">
                  <option v-for="(city, index) in store.all_cities" :key="index" :value="city">{{ city }}</option>
                </datalist>
                <button class="btn" type="submit" @click.prevent="ready_for_call()">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    </div>
</nav>
<div v-if="(store.page_name == 'Search')" class="container my-3" >
    <form  class="d-flex w-50 mx-auto" role="search" @submit.prevent="ready_for_call()">
        <input v-model="store.searched_text" autocomplete="off" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" list="cities" @keyup="Searched_hint()">
        <datalist id="cities">
          <option v-for="(city, index) in store.all_cities" :key="index" :value="city">{{ city }}</option>
        </datalist>
        <button class="btn" type="submit" @click.prevent="ready_for_call()">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </form>
    <div>
        <span>
            range di ricerca
        </span>
        <input type="range" id="range" name="range" :min="store.min_range" :max="store.max_range" v-model="store.selected_range" step="0.5"
         v-on:change="ready_for_call(false)">    
        <span>
            {{ store.selected_range }}Km
        </span>
        <div>
            <div class="row">
                <div  v-for="(service, index) in store.services" :key="index" class="col-2">
                    <input type="checkbox" name="services[]" :id="index" v-model="store.selected_services" :value="service.id" v-on:change="services_changed()">
                    <span>{{ service.name }}</span>

                </div>
            </div>
        </div>
    </div>
</div>

</template>
