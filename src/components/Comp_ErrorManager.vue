<script>
    import {store} from "../store";
    export default
    {
        name    :   "Comp_ErrorManager",
        data()
        {
            return  {
                        store,
                        fatal_error     : false,
                    }
        },
        watch:
        {
            'store.api_error.error_index' (new_value)
            {
                if (![0,1].includes(new_value))
                {
                    this.fatal_error = (this.store.api_error.error_index == -100);
                    this.store.invoke_error();
                }
            }
        },
        methods:
        {
            reload_page()
            {
                location.reload();
            }
        }
    }
</script>

<template>
    <div id="error_manager">

        <button id="modal_activator" type="button" data-bs-toggle="modal" data-bs-target="#error_modal" hidden></button>
        <div class="modal fade" id="error_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="error_modal_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="error_modal_label">Errore{{ (fatal_error) ? (' CRITICO ') : ('') }}</h5>
                        <button v-if="!fatal_error" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" v-on:click="store.reset_error()"></button>
                    </div>
                    <div class="modal-body">
                        <h6>{{ store.api_error.error_msg }}</h6>
                        <div v-if="fatal_error">
                            <hr>
                            <h6>Premere su "Ricarica la pagina" per eseguire il refresh.</h6>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-if="!fatal_error" type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="store.reset_error()">
                            Prosegui
                        </button>
                        <button v-else type="button" class="btn btn-warning" data-bs-dismiss="modal" v-on:click="reload_page()">
                            Ricarica la pagina
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
</style>