<template>
  <div class="col-lg-2 col-md-2 about">
    <button @click="newBlog" class="btn btn-primary " >
      <span class="glyphicon glyphicon-pencil"></span> 我要发帖</button>
    <button class="btn btn-primary " >
      <span class="glyphicon glyphicon-send"></span> 关于我们</button>
  </div>
</template>

<script>
  export default {
    name: "About",
    methods:{
      newBlog(){
        if(localStorage.getItem('userInfo')){
          this.$router.push({path:'/new'})
        }else {
          alert('您还没有登陆，请先登录')
        }

      }
    }
  }
</script>

<style scoped>
.about{
  margin-left: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  height: 200px;
}
  .btn-primary{
    margin-left: 30px;
    margin-top: 30px;
    height: 40px;
  }
</style>