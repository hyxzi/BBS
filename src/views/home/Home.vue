<template>
  <div>
  <div class="container">
    <div class="row">
      <carousel />
      <recommend :listdata="listdata"/>
      <about />
    </div>
    <div>
      <communication/>
    </div>
  </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import Carousel from "./childlessHome/Carousel";
  import Recommend from "./childlessHome/Recommend";
  import About from "./childlessHome/About";
  import Communication from "./childlessHome/Communication";
  import HomeFooter from "./childlessHome/HomeFooter";


  export default {
    name: "Home",
    components:{
      Carousel,
      Recommend,
      About,
      Communication,
      HomeFooter
    },
    data(){
      return {
        listdata: [],
      }
    },

    methods:{

    }
  }
</script>

<style scoped>

</style>