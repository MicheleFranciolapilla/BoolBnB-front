// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        is_just_started : true, 
        page_name       : "",
        error_index     : 0, 
        error_message   : "", 

        invoke_error()
        {
            let activator = document.getElementById("modal_activator");
            activator.click();
        }
    });