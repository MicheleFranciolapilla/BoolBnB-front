<script>
export default {
  name: "Comp_Jumbotron_Mobile",
  data() {
    return {
      slide1: "",
      slide2: "",
      slide3: "",
      slide4: "",
      slide5: "",
      currentOpen: 0, // Inizializza currentOpen con 0 per aprire il primo slide all'avvio
      intervalId: null, // Nuova proprietà per memorizzare l'ID dell'intervallo
      isHovering: false, // Nuova proprietà per tracciare se il mouse è sopra il componente
    };
  },
  methods: {
    hoverColumn(slide, index) {
      this.currentOpen = index;
      this.isHovering = true;
      clearInterval(this.intervalId);
      this[slide] = "active";

        // Chiudi tutti gli slide tranne quello corrente
        for (let i = 0; i < 5; i++) {
          const slide = `slide${i + 1}`;
          if (i !== this.currentOpen) {
            this[slide] = "";
          }
        }
    },
    hoverLeave(slide, index) {
      if (!this.isHovering && this.currentOpen !== index) {
        this[slide] = "";
      }
      this.isHovering = false;
      this.resumeRotation();
    },
    slideRotation() {
      if (!this.isHovering) {
        // Esegui la rotazione solo se il mouse non è sopra il componente
        this.currentOpen = (this.currentOpen + 1) % 5;

        // Chiudi tutti gli slide tranne quello corrente
        for (let i = 0; i < 5; i++) {
          const slide = `slide${i + 1}`;
          if (i !== this.currentOpen) {
            this[slide] = "";
          }
        }

        // Apri lo slide corrente
        const currentSlide = `slide${this.currentOpen + 1}`;
        this[currentSlide] = "active";
      }
    },
    resumeRotation() {
      // Riprendi la rotazione dopo un breve ritardo (500 millisecondi) dalla slide successiva a quella aperta
      setTimeout(() => {
        this.currentOpen = (this.currentOpen + 1) % 5;
        this.slideRotation();
        this.intervalId = setInterval(this.slideRotation, 3000);
      }, 500);
    },
  },
  mounted() {
    // Avvia la rotazione automatica ad intervalli di 3 secondi (3000 millisecondi)
    this.intervalId = setInterval(this.slideRotation, 3000);
  },
  beforeDestroy() {
    // Pulisci l'intervallo quando il componente viene distrutto per evitare memory leak
    clearInterval(this.intervalId);
  },
};
</script>

<template>
  <div class="d-flex flex-column justify-content-center cont">
    <div 
    @mouseenter="hoverColumn('slide1', 0)"
    @mouseleave="hoverLeave('slide1', 0)"
    :class="slide1" 
    class="img1 m-1 first">
    <span :class="currentOpen == 0 ? 'd-non' : '' " class="text-white d-block display-2  ms-3 fade-in"><strong class="color">B A R I</strong></span>
    </div>
    <div
    @mouseenter="hoverColumn('slide2', 1)"
    @mouseleave="hoverLeave('slide2', 1)"
    :class="slide2" 
    class="img2 m-1">
    <span :class="currentOpen == 1 ? 'd-non' : '' " class="text-white d-block display-2  ms-3 fade-in"><strong class="color">P A L E R M O</strong></span>
    </div>
    <div
    @mouseenter="hoverColumn('slide3', 2)"
    @mouseleave="hoverLeave('slide3', 2)"
    :class="slide3" 
    class="img3 m-1">
    <span :class="currentOpen == 2 ? 'd-non' : '' " class="text-white d-block display-2  ms-3 fade-in"><strong class="color">C O R T I N A</strong></span>
    </div>
    <div
    @mouseenter="hoverColumn('slide4', 3)"
    @mouseleave="hoverLeave('slide4', 3)"
    :class="slide4" 
    class="img4 m-1">
    <span :class="currentOpen == 3 ? 'd-non' : '' " class="text-white d-block display-2  ms-3 fade-in"><strong class="color">F I R E N Z E</strong></span>
    </div>
    <div
    @mouseenter="hoverColumn('slide5', 4)"
    @mouseleave="hoverLeave('slide5', 4)"
    :class="slide5" 
    class="img5 m-1 last">
    <span :class="currentOpen == 4 ? 'd-non' : '' " class="text-white d-block display-2  ms-3 fade-in"><strong class="color">M I L A N O</strong></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cont{
    padding-left: 50px;
    padding-right: 50px;
    min-height: 500px;

    .color{
        color: black;
    }
    .img1{
        height: 60px;
        width: 100%;
        background-image: url(/public/jumbo/barijumbotron.jpg);
        background-position: center;
        transition: all 1s ease;
    }

    .img2{
        height: 60px;
        width: 100%;
        background-image: url(/public/jumbo/palermojumbotron.webp);
        background-position: center;
        transition: all 1s ease;
    }

    .img3{
        height: 60px;
        width: 100%;
        background-image: url('/public/jumbo/cortinajumbotron.jpg');
        background-position: center;
        transition: all 1s ease;
    }
    
    .img4{
        height: 60px;
        width: 100%;
        background-image: url('../../public/jumbo/firenzejumbotron.jpg');
        background-position: center;
        transition: all 1s ease;
    }

    .img5{
        height: 60px;
        width: 100%;
        background-image: url(/public/jumbo/milanojumbotron.jpg);
        background-position: center;
        transition: all 1s ease;
    }

    .active{
        height: 200px;
    }

    .first{
        border-radius: 20px 20px 0px 0px;
    }

    .last{
        border-radius: 0px 0px 20px 20px;
    }

    .fade-in {
        opacity: 1;
        transition: opacity 1s ease; /* Durata e tipo di transizione */
        transition-delay: 0.5s;
    }

    .fade-in.d-non {
        opacity: 0;
        transition: opacity 0.3s ease;
        display: none;
    }
}
</style>