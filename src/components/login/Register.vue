<template>
  <div>
    <div class="container">
      <div class="font">
        <span>趣</span>
        <span>玩</span>
        <span>游</span>
        <span>戏</span>
        <span>论</span>
        <span>坛</span>
      </div>
      <div id="login-box">
          <div class="login-box-wh">
            <div class="box-mov">账号:</div>
            <div class="text-box">
              <input type="text" name="username" class="username" placeholder="请输入账号"/>
            </div>
          </div>
          <div class="login-box-wh">
            <div class="box-mov">密码:</div>
            <div class="text-box">
              <input type="password" name="password" class="password" placeholder="请输入密码"/>

            </div>
          </div>
          <div class="login-box-wh">
            <div class="box-mov">邮箱:</div>
            <div class="text-box">
              <input type="email" name="email" class="email" placeholder="请输入QQ邮箱地址"/>
            </div>
          </div>
          <div class="login-box-wh text-box-login">
            <div class="text-box-login-btn">
              <span class="login-btn-m"></span>
              <button type="submit" name="sm1" class="login-btn" @click="register">注册</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "register",
    methods:{
      //注册
      register(){
        let username = $('.username').val()
        let password = $('.password').val()
        let email = $('.email').val()
        let reg = RegExp(/@qq.com/)
        if(username == null ){
          alert('账号不能为空')
          return
        }else if(password == null){
          alert('密码不能为空')
          return;
        }else if(username.length < 6 || username.length > 10){
          alert('账号长度应在6——10位字符之间')
          return;
        }else if(password.length < 6){
          alert('密码长度不能小于6个字符')
          return;
        }else if(reg.test(email) == false){
          alert('邮箱格式不正确，请重新输入！')
          return;
        }
        this.$axios({
          url: 'user/register',
          method: 'post',
          data: {
            username:username,
            password: password,
            email:email
          }
        }).then(res => {
          if(res.data.errno === 0){
            this.$router.push({ path:'/login'})
            username =''
            password= ''
          }else{
            alert(res.data.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
 .container{
    width: 550px;
    height: 50vh;
    /*display: flex;
    justify-content: center;
    align-items: center;*/
    background: #efecaf;
   position: relative;
   top: 100px;
  }
  .font{
    width: 500px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    position:absolute;
    left: 8%;
    top:8%;
  }
  span{
    font-family: fira code;
    font-size: 3em;
    filter: blur(2px);
    color: #fff;
    animation: animate 2.5s linear infinite;
  }
  span:nth-child(1){
    animation-delay: 0s;
  }
  span:nth-child(2){
    animation-delay: 0.25s;
  }
  span:nth-child(3){
    animation-delay: 0.5s;
  }
  span:nth-child(4){
    animation-delay: 0.75s;
  }
  span:nth-child(5){
    animation-delay: 1s;
  }
  span:nth-child(6){
    animation-delay: 1.25s;
  }

  @keyframes animate{
    0%,100%{
      filter: blur(2px);
      color: #fff;
      text-shadow: 0 0 10px #1e90ff,
      0 0 10px #1e90ff,
      0 0 10px #1e90ff,
      0 0 10px #1e90ff,
      0 0 10px #1e90ff,
      0 0 10px #1e90ff;
    }
    5%,95%{
      filter: blur(0px);
      color: #666;
    }
  }
 a{
   -webkit-transition: All 1s ease;
   text-decoration: none;
   color: #dfc684;
 }
 input , button{
   border:0;
   background:none;
   color: black;
 }
 button{
   background-color: #31b0d5;
   font-size: 20px;
 }
 #login-box{
   position:absolute;
   width:500px;
   left:10%;
   top:29%;
 }
 .login-box-wh{
   height:53px;
   width:800px;
   margin-bottom:16px;
 }

 .login-box-wh:hover a{
   color:#f00
 }
 .box-mov{
   width: 53px;
   height: 53px;
   font-size: 1.5em;
   line-height: 53px;
   float: left;
   display: inline-block;
   opacity: .72;
   margin-right: 16px;
   position: relative;
   overflow:hidden;
   z-index:0;
 }

 .text-box{
   width:360px;
   height:53px;
   background: #ffffff;
   opacity: .72;
   float:left;
   line-height:53px;
 }
 .text-box-login-btn{
   width:360px;
   height:53px;
   background: #44a2ff;
   opacity: .72;
   float:left;
   line-height:53px;
   -webkit-box-sizing:border-box;
   position:absolute;
   left:69px;
   overflow:hidden;
 }
 .login-btn-m{
   width:360px;
   height:53px;
   margin-top:-53px;
   position:absolute;
   z-index:1;
 }
 .text-box-login:hover .login-btn-m{
   margin-top:0;
   border: 1px solid #2aabd2;
 }
 .login-btn{
   width:100%;
   height:100%;
   cursor:pointer;
   font-size:16px;
   position:absolute;
   z-index:5;
   transition: 0.8s;
   -moz-transition: 0.8s;
   -webkit-transition: 0.8s 0.3s;
 }
 .login-btn:hover{
   color:#f00;
 }
 input{
   height:100%;
   width:100%;
   padding:8px 0 8px 8px;


 }
 input:focus {
   outline:none;
 }
</style>