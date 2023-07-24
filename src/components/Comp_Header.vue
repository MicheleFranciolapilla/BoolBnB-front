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
                    
                    this.store.current_s_page = 1;
                    this.store.city_to_search = this.store.searched_text;
                    this.store.prepare_reactive_call("all");
                    // axios.get(store.api_url_root + 'apartments?filter=all&city=' + this.store.searched_text ).then(res => 
                    // {
                    //     console.log(res)
                    //     store.apartments = res.data.apartments
                        
                    //     store.searched_city = this.store.searched_text
                    //     console.log(store.searched_city)


                    // }) 
                }
                


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
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
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
            <form class="d-flex" role="search" @submit.prevent="Start_search">
                <input v-model="store.searched_text" class="form-control me-2" type="search" placeholder="Search" aria-label="Search" list="cities">
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
