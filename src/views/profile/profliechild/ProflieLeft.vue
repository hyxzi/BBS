<template>
  <div class="container">
    <div class="row text">
      <div class="col-lg-2 col-md-2 col-sm-2">
        <img :src="imgurl"  class="img-responsive" alt="头像" @click="showupdateimg">
        <input type="file" accept="image/*" capture="camera" id="upload" name="file" ref="updateimg"
               @change="updateimg" v-show="showupdate">
      </div>
      <div class="col-lg-7 col-md-7 col-sm-7">
        <h2 v-for="item in userInfo">{{item.realname}}</h2>
        <h4>个性签名:</h4>
        <p v-for="item in userInfo">{{item.signature}}</p>
        <span>积分:</span><span v-for="item in userInfo">{{item.UPoint}}</span>
      </div>
    </div>
    <hr/>
    <div class="row text">
      <ul class="list-group col-lg-2 col-md-2 col-sm-2">
        <li class="list-group-item"  @click="getUser" :class="{'active':!index}"><a>个人信息<span class="glyphicon glyphicon-th-list"></span></a></li>
        <li class="list-group-item"  @click="getList" :class="{'active':isshow}"><a>我的帖子<span class="glyphicon glyphicon-file"></span></a></li>
        <li class="list-group-item"  @click="getCollect" :class="{'active':isshows}"><a>我的收藏<span class="glyphicon glyphicon-bookmark"></span></a></li>
        <li class="list-group-item" @click="getInfo" :class="{'active':isshowss}"><a>我的消息<span class="glyphicon glyphicon-envelope"></span></a></li>
        <li class="list-group-item" @click="getsafe" ><a>注销账户</a><span class="glyphicon glyphicon-trash"></span></li>
      </ul>
      <div class="col-lg-8 col-md-8 col-sm-8 content">
        <!--个人信息-->
        <div class="myuser" v-if="!index">
          <a class="btn right-btn" @click="btnClick">编辑资料</a>
          <div class="row list-group-item" v-for="item in userInfo">
            账号：{{item.username}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            昵称：{{item.realname}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            签名：{{item.signature}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            性别：{{item.sex}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            年龄：{{item.age}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            地址：{{item.address}}
          </div>
          <div class="row list-group-item" v-for="item in userInfo">
            绑定邮箱：{{item.email}}
          </div>

        </div>
        <!--文章列表-->
        <div class="mylist" v-show="isshow">
          <ul class="list-group col-lg-12 col-sm-12 col-md-12">
            <li class="list-group-item" v-for="(item, index) in userlist">
              <a @click="itemsClick(index)"> {{item.title}} </a>
              <a class="badge" @click=deletet(index)>删除</a>
              <a class="badge" @click=update(index)>编辑</a>
            </li>
          </ul>
        </div>
        <!--收藏-->
        <div class="mycollect" v-show="isshows">
          <ul class="list-group col-lg-12 col-sm-12 col-md-12">
            <li class="list-group-item" v-for="(item, index) in collectlist">
              <a @click="itemClick(index)"> {{item.title}}</a>
              <a class="badge"@click=del(index)>删除</a>
            </li>
          </ul>
        </div>
        <!--修改个人资料-->
        <div class="updateuser" v-show="indexs">
          <update-form/>
        </div>
        <!--我的消息-->
        <div class="myInfo" v-show="isshowss">
          <ul class="list-group col-lg-12 col-sm-12 col-md-12">
            <li class="list-group-item" v-for="(item, index) in usercdk">
              <a> 您兑换{{item.goodsname}}道具的CDK为 {{item.goods_cdk}} </a>
            </li>
          </ul>
        </div>
        <!--账号安全-->

      </div>
    </div>
  </div>


</template>

<script>
  import UpdateForm from "./UpdateForm";
  export default {
    name: "proflieLeft",
    components:{
      UpdateForm
    },
    data(){
      return {
        userInfo:[],
        index:false,
        userlist:[],
        collectlist:[],
        isshow:false,
        isshows: false,
        indexs:false,
        isshowss:false,
        usercdk:[],
        issafe:false,
        showupdate:false,
        imgurl:null
      }
    },
    created() {
      if(localStorage.getItem('userInfo')){
        this.user = localStorage.getItem('userInfo')
        let keyword = localStorage.getItem('userId')
        //console.log(keyword)
        this.$axios({
          url: 'blog/user',
          method: 'get',
          params: {
            keyword:keyword
          }
        }).then(res => {
          this.userInfo = res.data.data
          this.imgurl = this.userInfo[0].imgurl
        }).catch(err => {
          console.log(err)
        })

      }else {
        return
      }

    },
    methods:{
      showupdateimg(){
        this.showupdate = true
      },
      //修改头像
      updateimg(event){
        let img = event.target.files[0]
        let formData = new FormData();
        formData.append('file',img);
        this.$axios({
          method:'post',
          url:'user/img',
          anync:true,
          contentType:false,
          processData:false,
          data:formData
        }).then(res =>{
          let keyword = localStorage.getItem('userId')
          this.$axios({
            url: 'blog/user',
            method: 'get',
            params: {
              keyword:keyword
            }
          }).then(res => {
            this.userInfo = res.data.data
            this.imgurl = this.userInfo[0].imgurl
          }).catch(err => {
            console.log(err)
          })
        }).catch(err =>{
          console.log(err)
        })

        this.showupdate = false
      },
      //获取个人信息
      getUser(){
        if(localStorage.getItem('userInfo')){
          this.index = false;
          this.isshow = false;
          this.isshows=  false;
          this.indexs= false;
          this.isshowss = false
          let keyword = localStorage.getItem('userId')
          this.$axios({
            url: 'blog/user',
            method: 'get',
            params: {
              keyword:keyword
            }
          }).then(res => {
            this.userInfo = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }else {
          return
        }

      },
      //获取文章列表
      getList(){
        if(localStorage.getItem('userInfo')){
          this.index = true
          this.isshow = true
          this.isshows=  false
          this.indexs= false
          this.isshowss = false
          let keyword = localStorage.getItem('userId')
          this.$axios({
            url: 'blog/list',
            method: 'get',
            params: {
              keyword:keyword
            }
          }).then(res => {
            this.userlist = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }else {
          return
        }

      },
      //获取收藏文章
      getCollect(){
        if(localStorage.getItem('userInfo')){
          this.index = true
          this.isshow = false
          this.isshows=  true
          this.indexs= false
          this.isshowss = false
          let id = localStorage.getItem('userId')
          this.$axios({
            url: 'blog/collect',
            method: 'get',
            params: {
              id:id
            }
          }).then(res => {
            this.collectlist = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }else {
          return
        }

      },
      //修改资料
      btnClick(){
        if(localStorage.getItem('userInfo')){
          this.index = true
          this.isshow = false
          this.isshows=  false
          this.indexs= true
          this.isshowss = false
        }else {
          return
        }

      },
      //修改文章
      update(index){
        if(localStorage.getItem('userInfo')){
          localStorage.setItem('textid',this.userlist[index].id)
          this.$router.push('/update')
          this.index = false
        }else {
          return
        }

      },
      //获取消息
      getInfo(){
        this.index = true
        this.isshow = false
        this.isshows=  false
        this.indexs= false
        this.isshowss = true
        let id = localStorage.getItem('userId')
        this.$axios({
          url: 'blog/getuserInfo',
          method: 'post',
          data: {
            id:id
          }
        }).then(res => {
          this.usercdk = res.data.data
          //console.log(this.usercdk)
        }).catch(err => {
          console.log(err)
        })
      },
      del(index){
        let id = this.collectlist[index].topic_id
        let userId = localStorage.getItem('userId')
        this.$axios({
          url: 'blog/del',
          method: 'post',
          data: {
            id:id,
            userId:userId
          }
        }).then(res => {
          this.$axios({
            url: 'blog/collect',
            method: 'get',
            params: {
              id:userId
            }
          }).then(res => {
            this.collectlist = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      },
      deletet(index){
        let id = this.userlist[index].id
        let userId = localStorage.getItem('userId')
        //console.log(userId)
        this.$axios({
          url: 'blog/delete',
          method: 'post',
          data: {
            id:id
          }
        }).then(res => {
          this.$axios({
            url: 'blog/list',
            method: 'get',
            params: {
              keyword:userId
            }
          }).then(res => {
            this.userlist = res.data.data
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {
          console.log(err)
        })
      },
      itemsClick(index){
        let id = this.userlist[index].id
        let num = this.userlist[index].TClickCount + 1
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
        this.$router.push('/detail?id=' +this.userlist[index].id)
      },
      itemClick(index){
        this.$router.push('/detail?id=' +this.collectlist[index].topic_id)
        //console.log(this.collectlist[index].topic_id)
      },
      //注销用户
      getsafe(){
        if(confirm('确定要注销账号，离开我们吗？')){
          let keyword = localStorage.getItem('userId')
          this.$axios({
            url: 'user/deluser',
            method: 'post',
            data: {
              id:keyword
            }
          }).then(res => {
            this.$store.commit('deluserInfo','');//更新userInfo
            localStorage.removeItem('adminId')
            this.$router.push({path:'/'});
          }).catch(err => {
            console.log(err)
          })
        }else {
          return false
        }


      }
    }
  }
</script>

<style scoped>
  .active{
    border: 0;
    background-color: #ffcfd7;
  }
  .active:hover{
    background-color: #f3ffff;
  }
  .text{
    background-color: white;
  }
  .my_list{
    display: none;
  }
.col-lg-2{
  text-align: center;
}
  .content{
    background-color: white;
    min-height: 330px;
  }
  a{
    cursor:pointer
  }
  .btn{
    margin-top: 20px;
  }
  .pagination{
    margin-left: 28%;
  }
  .adplay{
    display: block;
  }
</style>