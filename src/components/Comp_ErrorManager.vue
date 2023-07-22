<script>
    import {store} from "../store";
    export default
    {
        name    :   "Comp_ErrorManager",
        data()
        {
            return  {
                        store,
                        fatal_error :   (store.api_error.error_index == -100) 
                    }
        }
    }
</script>

<template>
    <div id="error_manager">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#error_modal">
        </button>

        <div class="modal fade" id="error_modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="error_modal_label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="error_modal_label">Errore{{ (fatal_error) ? (' CRITICO ') : ('') }}</h5>
                        <button v-if="!fatal_error" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6>{{ store.api_error.error_msg }}</h6>
                        <div v-if="fatal_error">
                            <hr>
                            <h6>RICARICARE LA PAGINA O PREMERE SU ABBANDONA</h6>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button v-if="!fatal_error" type="button" class="btn btn-primary" data-bs-dismiss="modal" v-on:click="store.reset_error()">
                            Prosegui
                        </button>
                        <button v-else type="button" class="btn btn-warning" data-bs-dismiss="modal" v-on:click="window.close()">
                            Abbandona
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>