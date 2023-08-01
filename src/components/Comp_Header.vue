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
                filter : false,
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
                console.log(this.store.selected_services);
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

            clean_input(event)
            {
                let last_char = event.key;
                const text_to_check = this.store.searched_text;
                const text_length = text_to_check.length;
                // const last_char = text_to_check[text_length - 1];
                const without_last = text_to_check.slice(0, -1);
                if  ( 
                        ((last_char.toLowerCase() >= "a") && (last_char.toLowerCase() <= "z")) || 
                        (!isNaN(last_char)) || 
                        (last_char == ' ') || 
                        (last_char === '\b') 
                    )
                {
                    console.log("CARATTERE LECITO");
                    switch (text_length)
                    {
                        case 1  :   
                            if ( !((last_char.toLowerCase() >= "a") && (last_char.toLowerCase() <= "z")) )
                            {
                                console.log("IL PRIMO CARATTERE NON E' VALIDO");
                                this.store.searched_text = without_last;
                            }
                            break;
                        default :   
                            const before_last = text_to_check[text_length - 2]; 
                            console.log("tipo penultimo: ",typeof(before_last));
                            console.log("valore penultimo: '",before_last,"'");
                            console.log("lunghezza penultimo: ", before_last.length);
                            console.log("tipo ultimo: ",typeof(last_char));
                            console.log("valore ultimo: '",last_char,"'");
                            console.log("lunghezza ultimo: ", last_char.length);
                            if  (
                                    (!isNaN(last_char) && (before_last.toLowerCase() >= "a") && (before_last.toLowerCase() <= "z")) ||
                                    (!isNaN(before_last) && (last_char.toLowerCase() >= "a") && (last_char.toLowerCase() <= "z")) ||
                                    ((last_char.includes(' ')) && (before_last.includes(' ')))
                                )
                            {
                                console.log("IL CARATTERE NON E' VALIDO");
                                this.store.searched_text = without_last;
                            }
                            break;
                    }
                }
                else
                {
                    console.log("ELSE");
                    this.store.searched_text = without_last;
                }
            },

            best_matches()
            {
                this.click_on_hint = false;
                console.log("tasto premuto");
                console.log("click on hint: ", this.click_on_hint);
                // if (this.store.searched_text.length > 3)
            },

            Searched_hint(event)
            {
                this.click_on_hint = false;
                this.clean_input(event);
                if (store.searched_text.length > 3) 
                {
                    const tomTomUrl = `https://api.tomtom.com/search/2/geocode/${store.searched_text}.json?key=mDuLGwpUfBez8sET5BVhGMRbc4FRXzB4&countrySet=IT&limit=100&minFuzzyLevel=2&typeahead=false`;
                    fetch(tomTomUrl)
                        .then(response => response.json())
                            .then(data => 
                            {
                                let results = data.results;
                                // console.log(results);
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
                                console.log("unique elements array: ",uniqueElementsArray);
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
            
            changeRange() {
                if (store.selected_range > 20) {
                  store.selected_zoom = 11;
                } else if (store.selected_range > 22.5) {
                  store.selected_zoom = 10;
                } else if (store.selected_range <= 20 && store.selected_range > 7) {
                  store.selected_zoom = 12;
                } else if (store.selected_range < 7 && store.selected_range > 10) {
                  store.selected_zoom = 12;
                } else if (store.selected_range < 10 && store.selected_range > 5) {
                  store.selected_zoom = 13;
                } else if (store.selected_range < 5 && store.selected_range > 3) {
                  store.selected_zoom = 14;
                } else if (store.selected_range < 3 && store.selected_range > 1) {
                  store.selected_zoom = 14;
                } else if (store.selected_range <= 1) {
                  store.selected_zoom = 15;
                }
            },


        },
    }
</script>

<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary"  style="background-color: rgb(29,116,101)!important;" id="navBarTop">
    <div class="container-fluid" style="background-color: rgb(29,116,101);">
        <a class="navbar-brand text-white" href="#">BoolB&B</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link v-if="store.page_name != 'Home'" class="nav-link active text-white me-5" aria-current="page" to="/">
            <i class="fa-solid fa-house"></i>
            <span>
                Home
            </span>
        </router-link>
        <div class="collapse navbar-collapse text-white" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
               
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Area personale</a>
                    <ul class="dropdown-menu">
                        <li>
                            <a class="dropdown-item text-white" href="http://127.0.0.1:8000/login">Login</a>
                        </li>
                        <li>
                            <a class="dropdown-item text-white" href="http://127.0.0.1:8000/register">Registrazione</a>
                        </li>
                    </ul>
                </li>

            </ul>
            <form v-if="(store.page_name !== 'Search')" class="d-flex" role="search" @submit.prevent="ready_for_call()">
                <input v-model="store.searched_text" autocomplete="off" class="form-control" type="search" placeholder="Cerca un'appartamento..." aria-label="Search" list="cities" @keyup="Searched_hint" style="width: 300px;">
                <datalist id="cities" v-if="!click_on_hint">
                  <!-- <option v-for="(city, index) in store.all_cities" :key="index" :value="city">{{ city }}</option> -->
                </datalist>
                <button class="btn" type="submit" @click.prevent="ready_for_call()">
                  <i class="fa-solid fa-magnifying-glass text-white ms-0"></i>
                </button>
            </form>
        </div>

    </div>
</nav>
<div v-if="(store.page_name == 'Search')" class="container my-3" >
    <div class="row justify-content-center">
        <div class="col-md-12 col-xl-6" >
            <form  class="d-flex  mx-auto" role="search" @submit.prevent="ready_for_call()" style="margin-top: 20px;">
                <input v-model="store.searched_text" autocomplete="off" class="form-control me-2 w-100" type="search" placeholder="Cerca un'appartamento..." aria-label="Search" list="cities" @keyup="Searched_hint()">
                <datalist id="cities" v-if="!click_on_hint">
                  <!-- <option v-for="(city, index) in store.all_cities" :key="index" :value="city">{{ city }}</option> -->
                </datalist>
                <button class="btn" type="submit" @click.prevent="ready_for_call()">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>

    </div>
    <div class="text-center mt-4">
        <button class="btn btn-success" @click="(this.filter == true) ? this.filter = false : this.filter = true">
            <span v-if="(!this.filter)">
                Mostra Filtri Avanzati
            </span>
            <span v-else>
                Nascondi Filtri Avanzati

            </span>
        </button>
    </div>
    <div v-if="(this.filter)">
        <hr>
        <div class="text-center mt-2 row justify-content-center">
            <div>
                <b>
                    Range di ricerca:
                </b>
                <span class="ms-2">
                    {{ store.selected_range }}Km
                </span>
            </div>
            <div class="col-12 col-md-7 col-xl-4 mt-1">
                <input class="text-success" type="range" id="range" name="range" :min="store.min_range" :max="store.max_range" v-model="store.selected_range" step="0.5"
                 v-on:change="ready_for_call(false), changeRange()">    
            </div>
        </div>

        <div>
            <div class="text-center mt-2">
                <b>
                    Scegli uno o più servizi:
                </b>
            </div>
            <div class="row mt-3">
                <div  v-for="(service, index) in store.services" :key="index" class="col-12 col-md-6 col-lg-4 col-xl-2">
                    <input type="checkbox" name="services[]" :id="index" v-model="store.selected_services" :value="service.id" v-on:change="services_changed()">
                    <span class="ms-2">{{ service.name }}</span>
                </div>
            </div>
            <div v-if="Number(store.selected_range) !== 20 || store.selected_services.length !== 0" class="text-center mt-2">
                <button class="btn btn-warning" @click="this.store.selected_range = 20, this.store.selected_services = [], ready_for_call(false)">
                    Reset filtri
                </button>

            </div>
        </div>
        <hr>
    </div>
</div>

</template>

<style>

nav li a{
    text-decoration: none;
}

</style>
