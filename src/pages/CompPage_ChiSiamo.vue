<script>

  import { store } from '../store';

  export default
  {
      name: "CompPage_ChiSiamo",
      components : {

      },
      data() {
        return {
            store
        }
      },
      methods: {

      }
 }
</script>

<template>
  <div class="container mt-3">
    <h1 class="text-center">Chi Siamo</h1>
    <p>BoolBnB nasce da un progetto scolastico proiettato a rendere possibile prenotazioni di strutture ricettive in varie città e paesi italiani. E’ il lavoro di cinque Jr. Full Stack Web Developer, uniti dalla passione per la programmazione e per le sfide contro se stessi. 
    Con questo progetto abbiamo cercato il più possibile di dare un’ impronta facile alla navigazione del sito, in maniera tale da rendere per gli utenti semplici i passaggi della ricerca e della prenotazione della struttura che più si abbina alla richiesta degli stessi utenti. All’ interno del sito troverete diversi filtri per permettere di cercare le strutture che più sono indicate alle proprie esigenze e una comoda mappa per mostrare la posizione con ciò che circonda la città o il paese scelto per il vostro viaggio, sia esso per motivi di lavoro o turistici. 
    E’ stato inoltre implementato il sistema di pagamento attraverso carta di credito per rendere più sicura ed efficace l’ effettiva prenotazione.
    </p>
    <p>Ci auguriamo che questo sito sia di vostro gradimento, buona ricerca!</p>
    <p>Il Team</p>

    <div class="row">
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="https://picsum.photos/191/115/" alt="">
        <span class="text-center mt-2">
              Michele Franciolapilla
        </span>
      </div>
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="https://picsum.photos/191/115/" alt="">
        <span class="text-center mt-2">
              Leonardo Rinaldi
        </span>
      </div>
    </div>
    <div class="row mt-5">
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="https://picsum.photos/191/115/" alt="">
        <span class="text-center mt-2">
              Edoardo Penco
        </span>
      </div>
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="https://picsum.photos/191/115/" alt="">
        <span class="text-center mt-2">
              Riccardo Signorini
        </span>
      </div>
    </div>
    <div class="row mt-5 mb-3">
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="\Andrea Ferrini.png" alt="">
        <span class="text-center mt-2">
              Andrea Ferrini
        </span>
      </div>
      <div class="card col-6 col-md-3 mx-auto">
        <img class="img-fluid" src="public\logo chatgpt.webp" alt="">
        <span class="text-center mt-2">
              L' amico tuo / Il 6° membro 
        </span>
      </div>
    </div>


  </div>

</template>

<style lang="scss">

</style>