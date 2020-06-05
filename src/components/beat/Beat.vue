<template>
  <div>
    <div>
      <h3 @click="routeClick">综合交流区</h3>
      <beat-item>
        <li class="list-group-item" v-for="(item, index) in composite" v-if="index < 5">
            <a @click="itemClick(index)">{{item.title}}</a>
          <span class="badge">{{item.author}}</span>

        </li>
      </beat-item>
    </div>
    <div>
      <h3 @click="routeClick1">轻松闲聊区</h3>
      <beat-item>
        <li class="list-group-item" v-for="(item, index) in light" v-if="index < 5">
          <a @click="itemClick1(index)">{{item.title}}</a>
          <span class="badge">{{item.author}}</span>
        </li>
      </beat-item>
    </div>
    <div>
      <h3 @click="routeClick2">大神攻略区</h3>
      <beat-item>
        <li class="list-group-item"v-for="(item, index) in seize" v-if="index < 5">
          <a @click="itemClick2(index)">{{item.title}}</a>
          <span class="badge">{{item.author}}</span>
        </li>
      </beat-item>
    </div>
  </div>
</template>

<script>
  import BeatItem from "./BeatItem";
  export default {
    name: "Beat",
    components:{
      BeatItem
    },
    data(){
      return {
        composite:[],
        light:[],
        seize:[],
        likes:''
      }
    },
    created() {
      //综合交流
      this.$axios({
        method:'get',
        url:'blog/composite',
        params:{
          id:7
        }
      }).then((res) =>{
        this.composite = res.data.data
        //console.log(this.composite)
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
      //轻松闲聊
      this.$axios({
        method:'get',
        url:'blog/composite',
        params:{
          id:8
        }
      }).then((res) =>{
        this.light = res.data.data
        //console.log(this.light)
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
      //大神攻略
      this.$axios({
        method:'get',
        url:'blog/composite',
        params:{
          id:9
        }
      }).then((res) =>{
        this.seize = res.data.data
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      itemClick(index){
        let id = this.composite[index].id
        let num = this.composite[index].TClickCount + 1
        this.$axios({
          method:'get',
          url:'blog/updateClick',
          params:{
            id:id,
            num:num
          }
        }).then((res) =>{
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        this.$router.push('/detail?id=' +this.composite[index].id)
      },
      itemClick1(index){
        let id = this.light[index].id
        let num = this.light[index].TClickCount + 1
        this.$axios({
          method:'get',
          url:'blog/updateClick',
          params:{
            id:id,
            num:num
          }
        }).then((res) =>{
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        this.$router.push('/detail?id=' +this.light[index].id)
      },
      itemClick2(index){
        let id = this.seize[index].id
        let num = this.seize[index].TClickCount + 1
        this.$axios({
          method:'get',
          url:'blog/updateClick',
          params:{
            id:id,
            num:num
          }
        }).then((res) =>{
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        this.$router.push('/detail?id=' +this.seize[index].id)
      },
      routeClick(){
        localStorage.setItem('TSID',7)
        this.$router.push({path:'/category'})

      },
      routeClick1(){
        localStorage.setItem('TSID',8)
        this.$router.push({path:'/category'})

      },
      routeClick2(){
        localStorage.setItem('TSID',9)
        this.$router.push({path:'/category'})

      },
      //点赞
      likeClick(index){
        let topic_id = this.seize[index].id
        let user_id = localStorage.getItem('userId')
        let num = this.seize[index].likes + 1
        this.$axios({
          method:'post',
          url:'blog/updateLike',
          data:{
            id:user_id,
            num:num,
            topic_id:topic_id
          }
        }).then((res) =>{
          this.$axios({
            method:'get',
            url:'blog/Likes',
            params:{
              topic_id:topic_id
            }
          }).then((res) =>{
            this.likes = res.data.data.length
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      }
    }
  }
</script>

<style scoped>
  a, h3{
    cursor:pointer
  }
  .list-group-item{
    height: 50px;
  }
</style>