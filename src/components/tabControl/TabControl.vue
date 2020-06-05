
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
         :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  import bus from "../../common/bus";
  export default {
    name: "TabControl",
    props:{
      titles:{
        type:Array,
        default (){
          return []
        },

      }
    },
    data(){
      return {
        currentIndex: 0,
        listdata:[]
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('tabClick',index)
          this.$axios({
            method:'get',
            url:'blog/recommends',
            params:{
              index:index
            }
          }).then((res) =>{
            var val = res.data.data
            bus.$emit('val',val)
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }
      }

  }
</script>

<style scoped>
  .tab-control{
    width: 300px;
    text-align: center;
    display: flex;
    background-color: #fffefa;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span{
    padding-bottom: 5px;
  }
  .active{
    color: deeppink;
  }
  .active span{
    border-bottom: 2px solid deeppink;
  }
</style>