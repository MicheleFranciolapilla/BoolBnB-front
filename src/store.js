// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        api_url_root    :   'http://127.0.0.1:8000/api/',
        axios_running   :   false,
        apartments      :   [], 
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