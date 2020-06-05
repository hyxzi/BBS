<template>
  <div v-if="reFresh">
    <div class="container">
      <ul class="list-group">
        <li class="list-group-item" v-for="(item, index) in list" @click="itemClick(index)"><a>
          {{item.title}}
          </a>
          <span class="badge">{{item.author}}</span>
      </li>
      </ul>
    </div>
    <home-footer class="homefooter"/>
  </div>

</template>

<script>
  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "List",
    components: {HomeFooter},
    data(){
      return {
        list:[],
        reFresh:true
      }
    },
    created() {
      //console.log(this.$route.query.keyword)
      let keyword = this.$route.query.keyword
      this.$axios({
        method:'get',
        url:'blog/list',
        params:{
          keyword:keyword
        }
      }).then((res) =>{
        this.list = res.data.data;
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      itemClick(index){
        let id = this.list[index].id
        let num = this.list[index].TClickCount + 1
        this.$axios({
          method:'post',
          url:'blog/updateClick',
          data:{
            id:id,
            num:num
          }
        }).then((res) =>{
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        this.$router.push('/detail?id=' +this.list[index].id)
      },
      update(){
        let keyword = this.$route.query.keyword
        this.$axios({
          method:'get',
          url:'blog/list',
          params:{
            keyword:keyword
          }
        }).then((res) =>{
          this.list = res.data.data;
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      }
    },
    computed:{
      getlist(){
        return this.$route.query.keyword
      }
    },
    watch: {
      getlist: function (val,oldval) {
        if(val != oldval){
          this.reFresh = false
          this.$nextTick(() => {
            // 在 DOM 中添加 my-component 组件
            this.reFresh = true;
            this.update()
          });
        }
      }
    }
  }
</script>

<style scoped>
  .container{
    min-height: 535px;
  }
  .list-group{
    margin-top: 30px;
  }
  a{
    cursor:pointer
  }

</style>