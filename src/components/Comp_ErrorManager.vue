<script>
    import {store} from "../store";
    export default
    {
        name    : "Comp_ErrorManager",
        data()
        {
            return {
                store
            }
        }
    }
</script>

<template>
<!-- Button trigger modal -->
<button id="modal_activator" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">
          <i class="fa-solid fa-exclamation"></i>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <i class="fa-solid fa-exclamation"></i>
        </h5>
      </div>
      <div class="modal-body">
        <h4>{{ store.error_message }}</h4>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>
</template>