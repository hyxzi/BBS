<template>
  <ul class="list-group col-lg-5 col-md-5">
    <li class="list-group-item" v-for="(item, index) in listdata" v-if="index<=7">
      <a @click="itemClick(index)">{{item.title}}</a>
    </li>
  </ul>
</template>

<script>
import bus from "../../common/bus";
  export default {
    name: "RecommendItem",
    data(){
      return {
        listdata:[],
      }
    },
    created() {
      this.$axios({
        method:'get',
        url:'blog/recommends',
        params:{
          index:0
        }
      }).then((res) =>{
      this.listdata = res.data.data
        //console.log(this.recommends)
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      itemClick(index){
        let id = this.listdata[index].id
        let num = this.listdata[index].TClickCount + 1
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
        this.$router.push('/detail?id=' +this.listdata[index].id)
      }
    },
    mounted() {
      bus.$on('val',(val)=> {
        this.listdata  = val
      })
    }
  }
</script>

<style scoped>
  .list-group .list-group-item{
    height: 30px;
    font-size: 14px;
    padding-bottom: 10px;
  }
  a{
    cursor:pointer
  }

</style>