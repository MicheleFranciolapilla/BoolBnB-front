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
        reactive_calls  :   false,
        filters_on_call :   {
                                filter      : "",
                                page        : 1,
                                single      : false,
                                id          : 0   
                            },
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



        prepare_reactive_call(param_filter, param_page, single = false, id = 0)
        {
            this.filters_on_call.filter = param_filter;
            this.filters_on_call.page = param_page;
            this.filters_on_call.single = single;
            this.filters_on_call.id = id;
            this.reactive_calls = true;
        },

        get_single_apartment(id)
        {
            this.prepare_reactive_call("", this.currentpage, true, id)
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
        }
    });