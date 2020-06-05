<template>
  <div>
    <proflie-left/>
    <home-footer />
  </div>

</template>

<script>
  import ProflieLeft from "./profliechild/ProflieLeft";
  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "Profile",
    components:{
      ProflieLeft,
      HomeFooter
    }
  }
</script>

<style scoped>

</style>
