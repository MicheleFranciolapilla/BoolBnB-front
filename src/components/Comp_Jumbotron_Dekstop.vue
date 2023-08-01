<script>
export default {
  name: "Comp_Jumbotron_Dekstop",
  data() {
    return {
      slide1: "",
      slide2: "",
      slide3: "",
      slide4: "",
      slide5: "",
      currentSlideIndex: 0,
      isHovering: false,
      openedSlide: "", // New data property to track the currently open slide
      lastOpenedSlideIndex: 0, // New data property to store the index of the last opened slide
      shouldResumeRotation: false, // New data property to track whether rotation should resume
      isAutoOpened: false, // New data property to track whether the slide was opened automatically
    };
  },
  methods: {
    hoverColumn(slide, index) {
      if (this.openedSlide !== "") {
        this[this.openedSlide] = ""; // Close the previously opened slide
      }
      this[slide] = "col-6"; // Open the current slide
      this.openedSlide = slide; // Update the openedSlide with the current slide
      this.isHovering = true;
      this.currentSlideIndex = index;
      this.lastOpenedSlideIndex = this.currentSlideIndex;
      this.isAutoOpened = false; // Reset the flag for manual opening
    },
    hoverLeave(slide) {
      this.isHovering = false;
      this.shouldResumeRotation = true;
      this.shouldResumeRotation = false; // Reset the flag after the delay
  
    },
    slideRotation() {
      if (!this.isHovering || this.shouldResumeRotation) {
        this.isAutoOpened = true; // Mark the slide as auto-opened
        this.currentSlideIndex = (this.currentSlideIndex + 1) % 5;
        this.slide1 = "";
        this.slide2 = "";
        this.slide3 = "";
        this.slide4 = "";
        this.slide5 = "";
        this[`slide${this.currentSlideIndex + 1}`] = "col-6";
        this.openedSlide = `slide${this.currentSlideIndex + 1}`; // Update openedSlide with the new slide after rotation
        this.shouldResumeRotation = false; // Reset the flag after resuming rotation
      } else {
        this.isAutoOpened = false; // Reset the flag if not auto-opened
      }
    },
  },
  mounted() {
    // Open the first slide by default
    this.slide1 = "col-6";
    this.openedSlide = "slide1";

    // Start the slider rotation when the component is mounted
    setInterval(this.slideRotation, 4000);
  },
};
</script>

<template>
  <div class="row justify-content-center">
    <div
      @mouseleave="hoverLeave('slide1')"
      @mouseenter="hoverColumn('slide1', 0)"
      :class="slide1"
      class="col-1 m-1 img1 first text-center"
    >

    <span :class="currentSlideIndex == 0 ? 'd-non' : '' " class="text-white d-block display-1 mt-2 fade-in"><strong class="color">B</strong></span>
    <span :class="currentSlideIndex == 0 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">A</strong></span>
    <span :class="currentSlideIndex == 0 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">R</strong></span>
    <span :class="currentSlideIndex == 0 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">I</strong></span>
    <button :class="currentSlideIndex == 0 ? '' : 'd-none' " type="button" class="btn btn-warning main-txt">Book now</button>

    </div>
    <div 
      @mouseleave="hoverLeave('slide2')"
      @mouseenter="hoverColumn('slide2', 1)" 
      :class="slide2" 
      class="col-1 m-1 img2 text-center">
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 mt-2 fade-in"><strong class="color">P</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">A</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">L</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">E</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">R</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">M</strong></span>
      <span :class="currentSlideIndex == 1 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">O</strong></span>
      <button :class="currentSlideIndex == 1 ? '' : 'd-none' " type="button" class="btn btn-warning main-txt2">Book now</button>
    </div>
    <div
      @mouseleave="hoverLeave('slide3')"
      @mouseenter="hoverColumn('slide3', 2)" 
      :class="slide3" 
      class="col-1 m-1 img3 text-center">
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 mt-2 fade-in"><strong class="color">C</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">O</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">R</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">T</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">I</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">N</strong></span>
      <span :class="currentSlideIndex == 2 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">A</strong></span>
      <button :class="currentSlideIndex == 2 ? '' : 'd-none' " type="button" class="btn btn-warning main-txt3">Book now</button>
    </div>
    <div 
      @mouseleave="hoverLeave('slide4')"
      @mouseenter="hoverColumn('slide4', 3)"
      :class="slide4" 
      class="col-1 m-1 img4 text-center">
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 mt-2 fade-in"><strong class="color">F</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">I</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">R</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">E</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">N</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">Z</strong></span>
      <span :class="currentSlideIndex == 3 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">E</strong></span>
      <button :class="currentSlideIndex == 3 ? '' : 'd-none' " type="button" class="btn btn-warning main-txt4">Book now</button>
    </div>
    <div
      @mouseleave="hoverLeave('slide5')"
      @mouseenter="hoverColumn('slide5', 4)"
      :class="slide5" 
      class="col-1 m-1 img5 last text-center">
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 mt-2 fade-in"><strong class="color">M</strong></span>
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">I</strong></span>
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">L</strong></span>
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">A</strong></span>
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">N</strong></span>
      <span :class="currentSlideIndex == 4 ? 'd-non' : '' " class="text-white d-block display-1 fade-in"><strong class="color">O</strong></span>
      <button :class="currentSlideIndex == 4 ? '' : 'd-none' " type="button" class="btn btn-warning main-txt5">Book now</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@500&display=swap');
.row {
  min-height: 940px;
  padding-top: 100px;
  padding-bottom: 100px;
  font-family: 'Bebas Neue', sans-serif;
  font-family: 'Poppins', sans-serif;

  .first {
    border-radius: 20px 0px 0px 20px;
  }

  .last {
    border-radius: 0px 20px 20px 0px;
  }

  .img1 {
    background-image: url('../../public/jumbo/barijumbotron.jpg');
    background-position: center;
    -webkit-box-shadow: -4px 0px 11px 3px rgba(0,0,0,0.58); 
    box-shadow: -4px 0px 11px 3px rgba(0,0,0,0.58);
  }

  .img2 {
    background-image: url(/public/jumbo/palermojumbotron.webp);
    background-size: cover;
    -webkit-box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64); 
    box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64);
  }

  .img3 {
    background-image: url('/public/jumbo/cortinajumbotron.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64); 
    box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64);
  }

  .img4 {
    background-image: url('../../public/jumbo/firenzejumbotron.jpg');
    background-size: cover;
    -webkit-box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64); 
    box-shadow: 0px -1px 11px 2px rgba(0,0,0,0.64);
  }

  .img5 {
    background-image: url(/public/jumbo/milanojumbotron.jpg);
    background-size: cover;
    -webkit-box-shadow: 5px -1px 11px 2px rgba(0,0,0,0.58); 
    box-shadow: 5px -1px 11px 2px rgba(0,0,0,0.58);
  }

  .col-1 {
    transition: all 1s ease;
  }

  .color {
    color: white;
    -webkit-text-stroke: 1px black; /* width and color */
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

  .main-txt{
    position: relative;
    bottom: 50px;
  }

  .main-txt2{
    position: relative;
    bottom: 335px;
  }

  .main-txt3{
    position: relative;
    bottom: 335px;
  }

  .main-txt4{
    position: relative;
    bottom: 335px;
  }

  .main-txt5{
    position: relative;
    bottom: 235px;
  }

} 
</style>