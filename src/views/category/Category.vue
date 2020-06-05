<template>
  <div>
    <div class="container">
      <div class="row">
        <ul class="list-group col-lg-2 col-md-2 col-sm-2">
          <li class="list-group-item reply">版块分类</li>
          <li class="list-group-item reply" v-for="(item, index) in reply" :class="{active:index == isShow}"  >
            <a @click="btnClick(index) ">{{item.Sname}}</a>
          </li>
        </ul>
        <div class="col-lg-10 col-md-10 col-sm-10">
          <h2>{{heard}}</h2>
          <pre class="lead">{{content}}</pre>
          <ul class="list-group" >
            <li class="list-group-item" v-for="(item, index) in titles">
              <a @click="btnClick1(index)">{{item.title}}</a>
              <span class="badge">{{item.author}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <home-footer class="homefooter" />
  </div>

</template>

<script>

  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "Category",
    components:{

      HomeFooter
    },
    data(){
      return {
        reply:[],
        isShow : 0,
        titles: [],
        heard:'',
        content:''
      }
    },
    created() {
      if(localStorage.getItem('TSID')){
        var TSID = localStorage.getItem('TSID')
        this.isShow = TSID-1
      }else {
        localStorage.setItem('TSID',1)
        TSID = localStorage.getItem('TSID')
      }
      //获取版块
      this.$axios({
        method:'get',
        url:'blog/reply',
      }).then((res) =>{
        this.reply = res.data.data
        let i = TSID -1
        this.heard = this.reply[i].Sname
        this.content = this.reply[i].content
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })

      //获取板块文章
      this.$axios({
        method:'get',
        url:'blog/composite',
        params:{
          id:TSID
        }
      }).then((res) =>{
        this.titles = res.data.data
        //console.log(this.titles)
        localStorage.removeItem('TSID')
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
      //console.log(localStorage.getItem('TSID'))

    },
    methods:{
      //获取所点击的版块文章
      btnClick(index){

        let TSID = this.reply[index].TSID
        this.heard = this.reply[index].Sname
        this.content = this.reply[index].content
        this.isShow = index
        this.$axios({
          method:'get',
          url:'blog/composite',
          params:{
            id:TSID
          }
        }).then((res) =>{
          this.titles = res.data.data
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })

      },
      //更新文章点击量
      btnClick1(index){
        let id = this.titles[index].id
        let num = this.titles[index].TClickCount + 1
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
        this.$router.push('/detail?id=' +this.titles[index].id)
      }
    }

  }
</script>

<style scoped>
  .container{
    margin-top: 20px;
    background-color: white;
    min-height: 520px;
  }
  .active{
    background-color: #ccadad;
    border: 0;
  }
  .active:hover{
    background-color: #ccadad;
  }
  .reply{
    text-align: center;
  }
  a{
    cursor:pointer;
  }
  pre{
    font-size: 15px;
    white-space:pre-wrap;
    white-space:-moz-pre-wrap;
    white-space:-pre-wrap;
    white-space:-o-pre-wrap;
    word-wrap:break-word;
  }
</style>
