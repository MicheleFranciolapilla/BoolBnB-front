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
                                filter  : "",
                                page    : 1,
                                single  : false,
                                id      : 0   
                            },



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