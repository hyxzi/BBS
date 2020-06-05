<template>
  <div>
    <tab-control :titles="['热门贴','推荐贴','精华贴']" class="contr"
                 @click="tabClick"/>
    <recommend-item/>
  </div>
</template>

<script>
  import TabControl from "../../../components/tabControl/TabControl";
  import RecommendItem from "../../../components/recommendItem/RecommendItem";
  export default {
    name: "recommend",
    components:{
      TabControl,
      RecommendItem
    },
    data(){
      return {
        currentType: 'hot',
        listdata:[]
      }
    },

    methods:{
      tabClick(index){

      }
    }
  }
</script>

<style scoped>
.contr{
  cursor:pointer
}
</style>