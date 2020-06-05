<template>
  <div class="container">

      <table class="table">
      </table>
      <h3>标题</h3>
      <input type="text" class="form-control title">
      <h3>内容</h3>
      <textarea class="form-control content" rows="20" ></textarea>
      <div class="form-group">
        <label for="name">请选择贴子发布的版块</label>
        <select class="form-control opt">
          <option v-for="(item, index) in reply" >{{item.Sname}}</option>
        </select>
      </div>

      <button class="btn btn-primary btn-lg" @click="newBlog">
        发布
      </button>

  </div>
</template>

<script>
  export default {
    name: "NewDetail",
    data(){
      return{
        reply:[]
      }
    },
    created(){
      this.$axios({
        url: 'blog/reply',
        method: 'get',
      }).then(res => {
        this.reply = res.data.data
      }).catch(err => {
        console.log(err)
      })
    },
      methods:{
        newBlog(){
          if(localStorage.getItem('userInfo')){
            let title = $('.title').val()
            let content = $('.content').val()
            let author = this.$store.state.userInfo
            var opt = $('.opt').find("option:selected").val()
            var optIndex = ($('.opt').find("option:selected").index()) + 1
            var userId = localStorage.getItem('userId')
            var point = parseInt(localStorage.getItem('point') )+ 3
            console.log(point)
            this.$axios({
              method:'post',
              url:'blog/new',
              data:{
                Sname:opt,
                title:title,
                content:content,
                author:author,
                TSID:optIndex,
                userId:userId
              }
            }).then((res) =>{
              this.$axios({
                url: 'blog/point',
                method: 'post',
                data: {
                  id:userId,
                  num:point
                }
              }).then(res => {
                localStorage.setItem('point',point)
              }).catch(err => {
                console.log(err)
              })
              $('.title').val('')
              $('.content').val('')
              $(".opt").find("option:first").prop("selected",true);
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
          }else {
            alert('您还未登陆，请先登录')
            return
          }
        }
      }

  }
</script>

<style scoped>
  .container{
    margin-top: 20px;
    background-color: #efebef;
  }
  .btn-lg{
    width: 100px;
    display: block;
    margin: 20px auto;
  }
  .opt{
    width: 200px;
  }
</style>