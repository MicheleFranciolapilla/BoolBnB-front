// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        api_url_root    :   'http://127.0.0.1:8000/api/',
        axios_running   :   false,
        apartments      :   [], 
        one_apartment   :   {}, 
        services        :   [], 
        api_error       :   {
                                error_index :   0,
                                error_msg   :   "" 
                            },
        front_error     :   {
                                error_index :   0,
                                error_msg   :   "" 
                            },
        front_url_root  :   "", 
        just_started    :   true, 
        page_name       :   "",
        currentpage     :   1,
        maxPage         :   1,
        current_s_page  :   1,
        max_s_page      :   1,
        reactive_calls  :   false,
        calls_params    :   {
                                call_type   : 0, 
                                id          : 0   
                            },
        call_type_array :   [
                                'sponsored',
                                'single',
                                'all'
                            ], 
        all_cities      :   [
                                "Agrigento",
                                "Alessandria",
                                "Ancona",
                                "Aosta",
                                "Arezzo",
                                "Ascoli Piceno",
                                "Asti",
                                "Avellino",
                                "Bari",
                                "Barletta-Andria-Trani",
                                "Belluno",
                                "Benevento",
                                "Bergamo",
                                "Biella",
                                "Bologna",
                                "Bolzano",
                                "Brescia",
                                "Brindisi",
                                "Cagliari",
                                "Caltanissetta",
                                "Campobasso",
                                "Carbonia-Iglesias",
                                "Caserta",
                                "Catania",
                                "Catanzaro",
                                "Chieti",
                                "Como",
                                "Cosenza",
                                "Cremona",
                                "Crotone",
                                "Cuneo",
                                "Enna",
                                "Fermo",
                                "Ferrara",
                                "Firenze",
                                "Foggia",
                                "Forlì-Cesena",
                                "Frosinone",
                                "Genova",
                                "Gorizia",
                                "Grosseto",
                                "Imperia",
                                "Isernia",
                                "La Spezia",
                                "L'Aquila",
                                "Latina",
                                "Lecce",
                                "Lecco",
                                "Livorno",
                                "Lodi",
                                "Lucca",
                                "Macerata",
                                "Mantova",
                                "Massa-Carrara",
                                "Matera",
                                "Messina",
                                "Milano",
                                "Modena",
                                "Monza e Brianza",
                                "Napoli",
                                "Novara",
                                "Nuoro",
                                "Ogliastra",
                                "Olbia-Tempio",
                                "Oristano",
                                "Padova",
                                "Palermo",
                                "Parma",
                                "Pavia",
                                "Perugia",
                                "Pesaro e Urbino",
                                "Pescara",
                                "Piacenza",
                                "Pisa",
                                "Pistoia",
                                "Pordenone",
                                "Potenza",
                                "Prato",
                                "Ragusa",
                                "Ravenna",
                                "Reggio Calabria",
                                "Reggio Emilia",
                                "Rieti",
                                "Rimini",
                                "Roma",
                                "Rovigo",
                                "Salerno",
                                "Medio Campidano",
                                "Sassari",
                                "Savona",
                                "Siena",
                                "Siracusa",
                                "Sondrio",
                                "Taranto",
                                "Teramo",
                                "Terni",
                                "Torino",
                                "Ogliastra",
                                "Trapani",
                                "Trento",
                                "Treviso",
                                "Trieste",
                                "Udine",
                                "Varese",
                                "Venezia",
                                "Verbano-Cusio-Ossola",
                                "Vercelli",
                                "Verona",
                                "Vibo Valentia",
                                "Vicenza",
                                "Viterbo",  
                            ],
        searched_text   :   '',
        searched_city   :   '',  
        city_to_search  :   '',
        RaccoltaIndirizzi:  '',
        cityQuery        :  {},
        last_valid_route :   null,
        selected_range   :   20,
        min_range         : 0.5,
        max_range         : 25,       
        selected_services:   [], 
        direct_search_only_city : false,
        latitude : "",
        longitude : "",
        house : `${import.meta.env.BASE_URL}iconAprtment.png`,
        selected_zoom : 12,




        prepare_reactive_call(call_type_str, id = 0)
        {
            let index = this.call_type_array.indexOf(call_type_str.toLowerCase());
            if ( index < 0)
            {
                index = 0;
            }
            this.calls_params.call_type = index;
            this.calls_params.id = id;
            this.reactive_calls = true;
        },

        invoke_error()
        {
            let activator = document.getElementById("modal_activator");
            activator.click();
        },

        reset_error()
        {
            this.api_error.error_index = 0;
            this.api_error.error_msg = "";
            if (this.last_valid_route !== null)
                this.$router.push({ name : 'not-found' });
            else
                this.$router.push({ name : 'home' });
        },

    });