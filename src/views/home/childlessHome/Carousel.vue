<template>
  <div id="myCarousel" class="carousel slide col-lg-4 col-md-4 col-sm-4">
    <!-- 轮播（Carousel）指标 -->
    <ol class="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
      <li data-target="#myCarousel" data-slide-to="1"></li>
      <li data-target="#myCarousel" data-slide-to="2"></li>
    </ol>
    <!-- 轮播（Carousel）项目 -->
    <div class="carousel-inner">
      <div class="item active">
        <img src="~@/assets/img/car/1.jpg" alt="First slide">
      </div>
      <div class="item">
        <img src="~@/assets/img/car/2.jpg" alt="Second slide">
      </div>
      <div class="item">
        <img src="~@/assets/img/car/3.jpg" alt="Second slide">
      </div>
    </div>
    <a class="carousel-control left" href="#myCarousel"
       data-slide="prev"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span></a>
    <a class="carousel-control right" href="#myCarousel"
       data-slide="next"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span></a>
  </div>
</template>

<script>
  export default {
    name: "Carousel",
  }
</script>

<style scoped>
.slide{
  height: 170px;
  margin-top: 44px;
}
  .carousel-indicators{
    margin-top: 50px;
  }
  .left,.right{
    margin-top: 20px;
  }
</style>