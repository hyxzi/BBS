<template>
  <header :key="reFresh">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#" v-show="!isshow">趣玩游戏论坛</a>
          <a class="navbar-brand" href="#" v-show="isshow">趣玩游戏论坛后台管理</a>
        </div>
        <div>
          <!--向左对齐-->
          <ul class="nav navbar-nav nav-pills navbar-left" v-show="!isshow">
            <li><tab-bar-item path="home"><div>首页</div></tab-bar-item></li>
            <li><tab-bar-item path="/category"><div>版块分区</div></tab-bar-item></li>
            <li><tab-bar-item path="/shop"><div>积分商城</div></tab-bar-item></li>
            <li><tab-bar-item path="/profile"><div>个人空间</div></tab-bar-item></li>
          </ul>
          <ul class="nav navbar-nav navbar-right"v-show="!index">
            <li><router-link to="/register">
              <span class="glyphicon glyphicon-align-justify"></span>注册</router-link>
            </li>
            <li><router-link to="/login">
              <span class="glyphicon glyphicon-user"></span>登录</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right" v-show="index">
            <li><a class="user">欢迎您，{{userInfo}}</a></li>
            <li><a class="exit" @click="exit">退出登录</a></li>
          </ul>
          <div class="navbar-form navbar-right" role="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="请输入关键字">
            </div>
            <button class="btn btn-primary" @click="btnClick">
              搜索
            </button>
          </div>
          <!--向右对齐-->
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
  import TabBarItem from "../../components/tabBarItem/TabBarItem";
  export default {
    name: "NavBar",
    components:{
      TabBarItem
    },
    data(){
      return {
        index:false,
        isshow:false,
        user:'',
        lastname:'',
        reFresh:true
      }
    },
    created(){
      if (localStorage.getItem('userInfo')||localStorage.getItem('adminId')){
        this.index = true
      }else  {
        this.index = false
      }
      if(localStorage.getItem('adminId')){
        this.isshow = true
      }else {
        this.isshow = false
      }
    },
    updated(){
      if (localStorage.getItem('userInfo')||localStorage.getItem('adminId')){
        this.index = true
      }else  {
        this.index = false
      }
      if(localStorage.getItem('adminId')){
        this.isshow = true
      }else {
        this.isshow = false
      }
    },
    methods:{
      //退出登录
      exit(){
        this.$store.commit('deluserInfo','');//更新userInfo
        this.index = false
        localStorage.removeItem('adminId')
        this.$router.push({path:'/'});
      },
      //搜索
      btnClick() {
        //alert(1)
        var keyword = $('.form-control').val()
        this.$router.push('/list?keyword='+keyword)
        //console.log(keyword)
      }
    },
    computed:{
      userInfo:function(){
        return  this.$store.state.userInfo
      }
    },
    watch:{
      $route(now,old){
        if (now.path=='/home' && old.path == '/login'){
          this.index = true
        }else if(now.path=='/cart' && old.path == '/login'){
          this.reFresh = false
          this.$nextTick(() => {
            this.reFresh = true;
          });
        }
      }
    }

  }
</script>

<style scoped>
  .navbar-default{
    margin-bottom: 0;

  }
  .navbar-left{
    margin-left: 100px;
    height: 52px;
  }
  .navbar-left >li{
    width: 80px;
    line-height: 52px;
    font-size: 1.2em;
    text-align: center;
    cursor:pointer
  }
.btn-default{
  background-color: rgb(106,138,255);
  display: inline-block;
}
  .user{
    color: red;
  }
  .exit{
    cursor:pointer
  }
  .navbar-right{
    height: 40px;
  }
</style>