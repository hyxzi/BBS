<template>
  <div>
    <div class="container">
      <h3>赚积分，兑好礼</h3>
      <hr/>
      <div class="row">
        <div class="col-lg-3" v-for="(item, index) in list">
          <img v-bind:src="item.img" class="img-thumbnail img-responsive">
          <p>{{item.goods}}</p>
          <span>库存：{{item.number}}</span>
          <span>所需积分：{{item.Point}}</span>
          <button class="btn bg-primary" @click="btnClick(index)">我要兑换</button>
        </div>
      </div>

    </div>
    <home-footer class="homefooter"/>
  </div>


</template>

<script>
  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "Shop",
    components:{
      HomeFooter
    },
    data(){
      return {
        list:[]
      }
    },
    created() {
      this.$axios({
        method:'get',
        url:'blog/shop',
      }).then((res) =>{
        this.list = res.data.data
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      //兑换道具
      btnClick(index){
        if(!localStorage.getItem('userInfo')){
          alert('您还没有登录')
          return
        }
        var userId = localStorage.getItem('userId')
        var point = parseInt(localStorage.getItem('point'))
        var num = this.list[index].number - 1
        var points = this.list[index].Point
        var id = this.list[index].id
        if(point > points){
          this.$axios({
          method:'post',
          url:'blog/goods',
          data:{
            id:id,
            num:num
          }
        }).then((res) =>{
          //兑换道具成功后，刷新用户积分
          let point = localStorage.getItem('point')-this.list[index].Point
            //console.log(point)
            this.$axios({
              method:'post',
              url:'blog/insertpoint',
              data:{
                id:localStorage.getItem('userId'),
                point:point
              }
            }).then((res) =>{
              localStorage.setItem('point',point)
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
            //刷新道具库存
            this.$axios({
              method:'get',
              url:'blog/shop',
            }).then((res) =>{
              this.list = res.data.data
              alert('兑换成功')
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
            //导入用户消息

            this.$axios({
              method:'post',
              url:'blog/insertuserInfo',
              data:{
                id:userId,
                goods_id:id,
                goods_cdk:this.list[index].CDK,
                goodsname:this.list[index].goods
              }
            }).then((res) =>{
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        }else {
          alert('您的积分不足，快去发帖赚积分吧')
        }

      }
    }
  }
</script>

<style scoped>
  .container{
    margin-top: 10px;
    background-color: #fff;
  }
  .row{
    min-height: 500px;
  }
.col-lg-3{
  height: 280px;
  text-align: center;
}
  .img-responsive{
    height: 150px;
  }
  span{
    margin: 10px;
  }
  .btn{
    margin-top: 15px;
  }
</style>