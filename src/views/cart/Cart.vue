<template>
  <div class="row">
    <div class="col-lg-2 col-md-2 col-sm-2">
      <ul class="list-group sidebar-menu">
        <li class="list-group-item list" :class="{active:index == isShow}" v-for="(item, index) in list">
          <a @click="btnClick(index)">{{item}}</a>
        </li>
        <li href="#userMeun" class="list-group-item panel panel-default nav-header menu-first collapsed" data-toggle="collapse">
          <a data-toggle="collapse" data-target="#demo" @click="btnClick1">文章管理</a>
        </li>
        <ul  id="userMeun" class="list-group nav nav-list collapse menu-second" >
        <li class="list-group-item list1" v-for="(item, index) in reply" :class="{active:index == isshow}">
          <i class="icon-edit"></i>
          <a @click="textClick(index)" >{{item.Sname}}</a>
        </li>
      </ul>
      </ul>
    </div>
    <div class="col-lg-10 col-md-10 col-sm-10">
      <!--用户表-->
      <div class="table1">
        <table class="table table-striped " >
          <thead>
          <tr>
            <th>用户ID</th>
            <th>账号</th>
            <th>用户名</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in users">
            <td>{{item.user_id}}</td>
            <td>{{item.username}}</td>
            <td>{{item.realname}}</td>
            <td><a @click="admin(index)">注销</a> <span>|</span><a @click="updateuser(index)">编辑</a></td>
          </tr>
          </tbody>
        </table>
        <div v-show="indexs">
          <label class="col-sm-2 col-md-2 control-label">账号：</label>
          <input type="text" placeholder="请输入账号" class="form-control username">
          <label class="col-sm-2 col-md-2 control-label">密码：</label>
          <input type="text" placeholder="请输入账号" class="form-control password">
          <button  @click="setupdate"  class="btn btn-default">提交</button>
        </div>
      </div>

      <!--版块种类-->
      <div class="table2 tabled">
        <table class="table table-hover" >
          <caption ><a @click="getupdateT">新增版块</a></caption>
          <thead>
          <tr>
            <th>版块ID</th>
            <th>版块名</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in replys">
            <td>{{item.TSID}}</td>
            <td>{{item.Sname}}</td>
            <td><a @click="getTSI(index)">编辑</a><span> |</span><a @click="getTS(index)"> 删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--道具种类-->
      <div class="table3 tabled">
        <table class="table table-hover" >
          <caption ><a @click="getupdate1">新增道具</a></caption>
          <thead>
          <tr>
            <th>道具ID</th>
            <th>道具名</th>
            <th>兑换所需积分</th>
            <th>库存量</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in goods">
            <td>{{item.id}}</td>
            <td>{{item.goods}}</td>
            <td>{{item.Point}}</td>
            <td>{{item.number}}</td>
            <td><a @click="getGs(index)">编辑</a><span> |</span><a @click="delgooods(index)"> 删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--版块文章-->
      <div class="tabled table4">
        <table class="table table-hover tableds" >
          <thead>
          <tr>
            <th>文章ID</th>
            <th>文章标题</th>
            <th>文章点击量</th>
            <th>文章收藏量</th>
            <th>文章点赞量</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in text">
            <td>{{item.id}}</td>
            <td>{{item.title}}</td>
            <td>{{item.TClickCount}}</td>
            <td>{{item.TReplyCount}}</td>
            <td>{{item.likes}}</td>
            <td><a @click="upClick(index)">编辑 </a>|<a @click="itemClick(index)"> 删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--修改板块-->
      <div  class="update2 tabled" >
        <h4>编辑版块</h4>
        <label for="lastname" class="col-sm-2 control-label">版块名称：</label>
        <input type="text" class="form-control name2" >
        <label for="lastname" class="col-sm-2 control-label">版块简介：</label>
        <textarea class="form-control content2"rows="4"></textarea>
        <button class="btn btn-default" @click="getupdateTS">提交</button>
      </div>
      <!--修改道具-->
      <div  class="update tabled" >
        <form @submit.prevent="getupdate($event)">
          <label  class="col-sm-2 control-label">道具id：</label>

          <input type="text" class="form-control" v-model="id">
          <label  class="col-sm-2 control-label">道具名称：</label>

          <input type="text" class="form-control" v-model="name">

          <label  class="col-sm-2 control-label">兑换所需积分</label>

          <input type="text" class="form-control" v-model="point">

          <label  class="col-sm-2 control-label">库存量：</label>
          <input type="text" class="form-control" v-model="number">

          <label  class="col-sm-2 control-label">道具图片：</label>
          <input type="file" class="form-control content"  @change="getFile($event)">

          <label  class="col-sm-2 control-label">道具CDK：</label>
          <input type="text" class="form-control content" v-model="cdk">
          <button type="submit" class="btn btn-default">提交</button>
        </form>
      </div>
      <!--新增道具-->
      <div  class="update1 tabled" >
        <h4>添加道具</h4>
        <form @submit.prevent="getgoods($event)">
          <label  class="col-sm-2 control-label">道具名称：</label>

          <input type="text" class="form-control" v-model="name">

          <label  class="col-sm-2 control-label">兑换所需积分</label>

          <input type="text" class="form-control" v-model="point">

          <label  class="col-sm-2 control-label">库存量：</label>
          <input type="text" class="form-control" v-model="number">

          <label  class="col-sm-2 control-label">道具图片：</label>
          <input type="file" class="form-control content"  @change="getFile($event)">

          <label  class="col-sm-2 control-label">道具CDK：</label>
          <input type="text" class="form-control content" v-model="cdk">
          <button type="submit" class="btn btn-default">提交</button>
        </form>

      </div>
      <!--新增版块-->
      <div  class="update3 tabled">
        <h4>新增版块</h4>
        <label for="lastname" class="col-sm-2 control-label">版块名称：</label>
        <input type="text" class="form-control name3" >
        <label for="lastname" class="col-sm-2 control-label">版块简介：</label>
        <textarea  class="form-control content3" rows="4"></textarea>
        <button class="btn btn-default" @click="getinsetTS">提交</button>
      </div>

    </div>

  </div>

</template>

<script>
  import Updategoods from "../new/Updategoods";
  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "Cart",
    components:{
      HomeFooter,
      Updategoods
    },
    data(){
      return {
        list:['用户管理','版块管理','道具管理'],
        isShow : 0,
        reply:[],
        index:false,
        users:[],
        replys:[],
        text:[],
        goods:[],
        isshow : 0,
        userobj:{},
        indexs:false,
        name:'',
        point:'',
        number:'',
        file:'',
        cdk:'',
        id:''
      }
    },
    created(){
      this.$axios({
        method:'post',
        url:'blog/admin'
      }).then((res) =>{
        this.users = res.data.data
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
      this.$axios({
        method:'get',
        url:'blog/reply'
      }).then((res) =>{
        this.reply = res.data.data
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      btnClick(index){
        $('.list1').removeClass('active')
        this.isShow = index
        if(index == 0){
          this.indexs = false
          $('.table1').addClass('adisplay')
          $('.table1').siblings().removeClass('adisplay')
          $('.table1').siblings().addClass('tabled')
          this.$axios({
            method:'post',
            url:'blog/admin'
          }).then((res) =>{
            this.users = res.data.data
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }else if(index == 1){
          this.indexs = false
          $('.table2').addClass('adisplay')
          $('.table2').siblings().removeClass('adisplay')
          $('.table2').siblings().addClass('tabled')
          this.$axios({
            method:'post',
            url:'blog/adminTSID'
          }).then((res) =>{
            this.replys = res.data.data
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }else {
          $('.table3').addClass('adisplay')
          $('.table3').siblings().removeClass('adisplay')
          $('.table3').siblings().addClass('tabled')
          this.$axios({
            method:'get',
            url:'blog/shop'
          }).then((res) =>{
            this.goods = res.data.data
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }

      },
      btnClick1(){
        $('.list').removeClass('active')
        $('.table4').addClass('adisplay')
        $('.table4').siblings().removeClass('adisplay')
        $('.table4').siblings().addClass('tabled')
        this.$axios({
          method:'post',
          url:'blog/admintitle',
          data:{
            name:this.reply[0].Sname
          }
        }).then((res) =>{
          this.text = res.data.data
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      },
      textClick(index){
        this.isshow = index
        //console.log(this.reply[index])
        this.$axios({
          method:'post',
          url:'blog/admintitle',
          data:{
            name:this.reply[index].Sname
          }
        }).then((res) =>{
         this.text = res.data.data
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      },
      //删除文章
      itemClick(index){
        if(confirm('确定要删除文章吗？')) {
          this.$axios({
            method: 'post',
            url: 'blog/delete',
            data: {
              id: this.text[index].id
            }
          }).then((res) => {
            this.$axios({
              method: 'post',
              url: 'blog/admintitle',
              data: {
                name: this.reply[index].Sname
              }
            }).then((res) => {
              this.text = res.data.data
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        }else {
          return
        }
      },
      //修改文章
      upClick(index){
        localStorage.setItem('textid',this.text[index].id)
        this.$router.push('/update')
      },
      //删除版块
      getTS(index){
        if(confirm('确定要删除该板块吗？')) {
          this.$axios({
            method: 'post',
            url: 'user/delTSID',
            data: {
              id: this.replys[index].TSID
            }
          }).then((res) => {
            this.$axios({
              method: 'post',
              url: 'blog/adminTSID'
            }).then((res) => {
              this.replys = res.data.data
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        }else {
          return
        }
      },
      //注销账号
      admin(index){
        if(confirm('确定要注销账号吗？')){
          this.$axios({
            method:'post',
            url:'user/deluser',
            data:{
              id:this.users[index].user_id
            }
          }).then((res) =>{
            this.$axios({
              method:'post',
              url:'blog/admin'
            }).then((res) =>{
              this.users = res.data.data
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }else {
          return
        }

      },
      //更改道具
      getGs(index){
        $('.update').addClass('adisplay')
        $('.update').siblings().removeClass('adisplay')
        $('.update').siblings().addClass('tabled')
        sessionStorage.setItem('goodsId',this.goods[index].id)
        let point = this.goods[index].Point
        let number = this.goods[index].number
        let goods = this.goods[index].goods

        this.id = sessionStorage.getItem('goodsId')
        this.name = goods
        this.point = point
        this.number = number
        this.cdk = this.goods[index].CDK
      },
      //编辑道具
      getupdate(event){
        event.preventDefault();
        var formData = new FormData();
        formData.append('name', this.name);
        formData.append('point', this.point);
        formData.append('number', this.number);
        formData.append('file', this.file);
        formData.append('cdk', this.cdk);
        formData.append('id', this.id);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$axios.post('blog/updategood',formData,config
        ).then(res => {
          $('.name1').val('')
          $('.point1').val('')
          $('.number1').val('')
          $('.img1').val('')
          location.reload();
        }).catch(err => {
          console.log(err)
        })
      },
      //新增道具
      getupdate1(){
        $('.update1').addClass('adisplay')
        $('.update1').siblings().removeClass('adisplay')
        $('.update1').siblings().addClass('tabled')
      },
      getFile(event) {
        this.file = event.target.files[0];
        console.log(this.file);
      },
      getgoods(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('point', this.point);
        formData.append('number', this.number);
        formData.append('file', this.file);
        formData.append('cdk', this.cdk);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        this.$axios.post(
         'blog/insertgoods',
          formData,
          config
        ).then(res => {
          $('.name').val('')
          $('.point').val('')
          $('.number').val('')
          location.reload();
        }).catch(err => {
          console.log(err)
        })
      },
      //修改板块
      getTSI(index){
        $('.update2').addClass('adisplay')
        $('.update2').siblings().removeClass('adisplay')
        $('.update2').siblings().addClass('tabled')
        $('.name2').val(this.replys[index].Sname)
        $('.content2').val(this.replys[index].content)
        console.log(this.replys[index])
        console.log(this.replys[index].Sname)
        let id = this.replys[index].TSID
        sessionStorage.setItem('TSID',id)
      },
      getupdateTS(){
        let id = sessionStorage.getItem('TSID')
        let name = $('.name2').val()
        let content = $('.content2').val()
        this.$axios({
          url: 'blog/updateTSID',
          method: 'post',
          data: {
            id:id,
            name:name,
            content:content
          }
        }).then(res => {
          $('.name2').val('')
          $('.content2').val('')
          location.reload()
          this.$router.push('/cart')
        }).catch(err => {
          console.log(err)
        })
      },
      //新增版块
      getupdateT(){
        $('.update3').addClass('adisplay')
        $('.update3').siblings().removeClass('adisplay')
        $('.update3').siblings().addClass('tabled')
      },
      getinsetTS(){
        let name = $('.name3').val()
        let content = $('.content3').val()
        this.$axios({
          url: 'blog/insetTSID',
          method: 'post',
          data: {
            name:name,
            content:content
          }
        }).then(res => {
          $('.name3').val('')
          location.reload()
          this.$router.push('/cart')
        }).catch(err => {
          console.log(err)
        })
      },
      //编辑用户
      updateuser(index){
        this.indexs = true
        this.userobj.id = this.users[index].user_id,
        this.userobj.username = this.users[index].username,
        this.userobj.password = this.users[index].password
        $('.username').val(this.userobj.username)
        $('.password').val(this.userobj.password)
      },
      setupdate(){
        let username = $('.username').val()
        let password = $('.password').val()
       this.$axios({
          method:'post',
          url:'user/update',
          data:{
            id:this.userobj.id,
            username:username,
            password:password
          }
        }).then((res) =>{
         $('.username').val('')
         $('.password').val('')
          this.indexs = false
          this.$axios({
            method:'post',
            url:'blog/admin'
          }).then((res) =>{
            this.users = res.data.data
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      },
      //删除道具
      delgooods(index){
        if(confirm('确定要删除该道具吗？')) {
          let id = this.goods[index].id
          this.$axios({
            method: 'post',
            url: 'blog/delgoods',
            data: {
              id: id
            }
          }).then((res) => {
            this.$axios({
              method: 'get',
              url: 'blog/shop'
            }).then((res) => {
              this.goods = res.data.data
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        }else {
          return
        }
      },
      //修改文章

    }
  }
</script>

<style scoped>
.row{
  background-color: #fff;
  margin-top: 20px;
}
.col-lg-2{
  min-height: 500px;
}
.list-group,.list-group-item{
  background-color: #9acfea;
  text-align: center;
  border: 0;
  border-radius: 5px;
}
.active{
  background-color: #f3ffea;
  border: 0;
}
.active:hover{
  background-color: #f3ffea;
}
  .tabled{
    display: none;
  }
  a{
    cursor:pointer;
  }
  th,td{
    text-align: center;
  }
.btn{
  margin: 20px;
  margin-left: 40%;
}
  .adisplay{
    display: block;
  }

</style>
