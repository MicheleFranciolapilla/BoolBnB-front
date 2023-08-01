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
                filter          : false,
                input_allowed   : true, 
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
                if  (
                        ((this.click_on_hint) && (from_search_bar)) || 
                        (!from_search_bar)
                    )
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

            is_digit(char)
            {
                if ((char >= "0") && (char <= "9"))
                    return true;
                else
                    return false;
            },

            is_letter(char)
            {
                if ((char.toLowerCase() >= "a") && (char.toLowerCase() <= "z"))
                    return true;
                else
                    return false;
            },

            clean_input()
            {
                console.log("ingresso in clean_input");
                this.click_on_hint = false;
                const text_to_check = this.store.searched_text;
                const text_length = text_to_check.length;
                const without_last = text_to_check.slice(0, -1);
                let last_char = text_to_check.slice(-1);
                if  ( 
                        (this.is_letter(last_char)) || 
                        (this.is_digit(last_char)) || 
                        (last_char == ' ') || 
                        (last_char === '\b') 
                    )
                {
                    switch (text_length)
                    {
                        case 1  :   
                            if ( !this.is_letter(last_char) )
                            {
                                this.store.searched_text = without_last;
                            }
                            break;
                        default :   
                            const before_last = text_to_check[text_length - 2]; 
                            if  (
                                    (this.is_digit(last_char) && this.is_letter(before_last)) ||
                                    (this.is_digit(before_last) && this.is_letter(last_char)) ||
                                    ((last_char.includes(' ')) && (before_last.includes(' ')))
                                )
                            {
                                this.store.searched_text = without_last;
                            }
                            break;
                    }
                }
                else
                {
                    this.store.searched_text = without_last;
                }
                if  (   (this.store.searched_text.length > 4) ||
                        ((this.store.searched_text.length == 4) && (this.store.searched_text[3] != ' '))
                    ) 
                {
                    this.best_matches();
                }
            },

            get_ranking(city, address, text)
            {
                let result = 0;
                let city_matches = 0;
                let address_matches = 0;
                if (city.includes(text))
                    return 7;
                if (address.includes(text)) 
                    return 6;
                for (let i = 0; i < text.length; i++)
                {
                    if (city.includes(text[i]))
                        city_matches++;
                    else
                        break;
                }
                for (let j = 0; j < text.length; j++)
                {
                    if (address.includes(text[j]))
                        address_matches++;
                    else
                        break;
                }
                result = Math.max(city_matches, address_matches);
                if (result > 5)
                    result = 5;
                return result;
            },

            best_matches()
            {
                const tomTomUrl = `https://api.tomtom.com/search/2/geocode/${store.searched_text}.json?key=mDuLGwpUfBez8sET5BVhGMRbc4FRXzB4&countrySet=IT&limit=100&minFuzzyLevel=2&typeahead=false`;
                fetch(tomTomUrl)
                    .then(response => response.json())
                        .then(data =>
                        {
                            let results = data.results;
                            let uniqueElements = new Map();
                            let main_info = [];
                            let searched_text_lc = this.store.searched_text.toLowerCase();
                            results.forEach( element => 
                                {
                                    if ( ["Geography", "Street"].includes(element.type) )
                                    {
                                        var city        = element.address.municipality;
                                        var address     = city;
                                        var type        = element.type;
                                        var latitude    = element.position.lat;
                                        var longitude   = element.position.lon;
                                    }
                                    if (type === "Street")
                                        address = element.address.freeformAddress;
                                    if  (address && city && type && (latitude !== undefined) && (longitude !== undefined))
                                    {
                                        let city_lc = city.toLowerCase();
                                        let address_lc = address.toLowerCase();
                                        let new_main_info = `${city}_${address}`;
                                        if (!main_info.includes(new_main_info))
                                        {
                                            let rank = 0;
                                            main_info.push(new_main_info);
                                            if ((city_lc.concat(" ", address_lc) == searched_text_lc) || (address_lc.concat(" ", city_lc) == searched_text_lc))
                                                rank = 10;
                                            else if ((city_lc == searched_text_lc))
                                                rank = 9;
                                            else if ((address_lc == searched_text_lc))
                                                rank = 8;
                                            else
                                            {
                                                rank = this.get_ranking(city_lc, address_lc, searched_text_lc);
                                            }
                                            let key = `${city}_${address}_${type}_${latitude}_${longitude}_${rank}`;
                                            uniqueElements.set(key, { city, address, type, latitude, longitude, rank });
                                        }
                                    }
                                });
                            let uniqueElementsArray = Array.from(uniqueElements.values());
                            for (let i = 0; i < uniqueElementsArray.length - 1; i++)
                                for (let j = i + 1; j < uniqueElementsArray.length; j++ )
                                {
                                    if (uniqueElementsArray[i].rank < uniqueElementsArray[j].rank)
                                    {
                                        let elem_swap = uniqueElementsArray[i];
                                        uniqueElementsArray[i] = uniqueElementsArray[j];
                                        uniqueElementsArray[j] = elem_swap;
                                    }
                                }
                            console.log(uniqueElementsArray);
                            let hintList = document.getElementById('cities');
                            hintList.innerHTML = '';
                            this.store.RaccoltaIndirizzi = uniqueElementsArray;
                            this.store.RaccoltaIndirizzi.forEach( element =>
                            {
                                // let element_parts = element.split('_');
                                // let new_obj =   {
                                //                     'city'      : element_parts[0],
                                //                     'address'   : element_parts[1],
                                //                     'type'      : element_parts[2],
                                //                     'latitude'  : element_parts[3],
                                //                     'longitude' : element_parts[4]
                                //                 };
                                // this.store.RaccoltaIndirizzi.push(new_obj);
                                let option = document.createElement('option');
                                let address = element.city;
                                if (element.city !== element.address)
                                    address = address.concat(" ", element.address);
                                option.value = address;
                                option.textContent = address;
                                hintList.appendChild(option);
                                this.store.cityQuery = new_obj;
                                this.click_on_hint = true;
                            });
                        })
                        .catch(error => 
                            {
                                console.error("Error fetching data:", error);
                            });
            },

            Searched_hint()
            {
                this.click_on_hint = false;
                // this.clean_input(event);
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


                                    // if (element.type === "Street") 
                                    // {
                                    //     if (element.address === store.searched_text) 
                                    //     {
                                            store.cityQuery = element;
                                            this.click_on_hint = true;
                                    //     }
                                    // } 
                                    // else if (element.type === "Geography") 
                                    // {
                                    //     if (element.address === store.searched_text) 
                                    //     {
                                    //         store.cityQuery = element;
                                    //         this.click_on_hint = true;
                                    //     }
                                    // }
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
                <input v-model="store.searched_text" autocomplete="off" class="form-control" type="search" placeholder="Cerca un'appartamento..." aria-label="Search" list="cities" @keyup="clean_input" style="width: 300px;">
                <datalist id="cities">
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
                <input v-model="store.searched_text" autocomplete="off" class="form-control me-2 w-100" type="search" placeholder="Cerca un'appartamento..." aria-label="Search" list="cities" @keyup="clean_input">
                <datalist id="cities">
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
