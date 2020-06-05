<template>
  <form  @submit.prevent="submit">
    <label for="lastname" class="col-sm-2 col-md-2 control-label">昵称：</label>
    
    <input type="text" class="form-control name" >
    
    <label for="lastname" class="col-sm-2 col-md-2 control-label">签名:</label>
    
    <input type="text" class="form-control signature">

    <label for="lastname" class="col-sm-2 col-md-2 control-label">性别：</label>
    
    <input type="text" class="form-control sex" >
    
    <label for="lastname" class="col-sm-2 col-md-2 control-label">年龄：</label>
    
    <input type="text" class="form-control age" >
    
    <label for="lastname" class="col-sm-2 col-md-2 control-label">地址</label>
    
    <input type="text" class="form-control address" >
    
    <label for="lastname" class="col-sm-2 col-md-2 control-label">职业：</label>
    
    <input type="text" class="form-control vocation" >

    <label for="password" class="col-sm-2 col-md-2 control-label">密码：</label>

    <input type="password" class="form-control password" >
    <button type="submit" class="btn btn-default">提交</button>
  </form>
</template>

<script>
  export default {
    name: "UpdateForm",
    data(){
      return {
        userInfo:[]
      }
    },
    created(){
      let keyword = localStorage.getItem('userId')
     // console.log(keyword)
      this.$axios({
        url: 'blog/user',
        method: 'get',
        params: {
          keyword:keyword
        }
      }).then(res => {
        this.userInfo = res.data.data
        //console.log(this.userInfo)
        $('.name').val(this.userInfo[0].realname)
        $('.signature').val(this.userInfo[0].signature)
        $('.sex').val(this.userInfo[0].sex)
        $('.age').val(this.userInfo[0].age)
        $('.address').val(this.userInfo[0].address)
        $('.vocation').val(this.userInfo[0].vocation)
        $('.password').val(this.userInfo[0].password)
      }).catch(err => {
        console.log(err)
      });
    },
    methods:{
      submit:function () {
        let id = localStorage.getItem('userId')
        let name = $('.name').val()
        let signature = $('.signature').val()
        let sex = $('.sex').val()
        let age = $('.age').val()
        let address = $('.address').val()
        let vocation = $('.vocation').val()
        let password = $('.password').val()
        this.$axios({
          url: 'blog/updateuser',
          method: 'post',
          data: {
            id:id,
            name:name,
            signature:signature,
            sex:sex,
            age:age,
            address:address,
            vocation:vocation,
            password:password
          }
        }).then(res => {
          //
          id = id.replace(/\"/g, "")
          localStorage.setItem('userId',id)
          this.$store.commit("setuserInfo", $('.name').val())
          location. reload()
          this.$router.push({path:'/profile'});
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .btn{
    margin: 20px;
    margin-left: 40%;
  }
</style>