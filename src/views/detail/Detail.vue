<template>
  <div>
    <div class="container">
      <h3>{{text.title}}</h3>
      <div class="row">
        {{text.author}} {{text.createtime | renderTime}}
        <a class="btn" @click="btnClick">编辑</a>
        <span class="glyphicon glyphicon-eye-open">：{{text.TClickCount}}</span>
        <span class="glyphicon glyphicon-star-empty" v-show="!active" @click="collectClick">收藏量：{{text.TReplyCount}}</span>
        <span class="glyphicon glyphicon-star" v-show="active" @click="delcollect">收藏量：{{text.TReplyCount}}</span>
        <img src="@/assets/img/header/zan.svg" class="img-rounded img-thumbnail" v-show="!isshow" @click="likeClike" alt="赞一个">
        <img src="@/assets/img/header/zan_1.svg" class="img-rounded img-thumbnail" v-show="isshow" @click="dellikeClike" alt="取消赞">
        <span>点赞 ：{{text.likes}}</span>
      </div>
      <div class="content">
        <pre>{{text.content}}</pre>

      </div>

      <reply/>
    </div>

    <home-footer class="homefooter"/>
  </div>

</template>

<script>
  import Reply from "../../components/reply/Reply";
  import HomeFooter from "../home/childlessHome/HomeFooter";
  export default {
    name: "Detail",
    components: {
      Reply,
      HomeFooter
    },
    data() {
      return {
        id: this.$route.query.id,
        text: {},
        isshow:false,
        active:false
      }
  },
    created() {
      this.$axios({
        method:'get',
        url:'blog/detail',
        params:{
          id:this.id
        }
      }).then((res) =>{
        this.text = res.data.data
       // console.log(this.text)
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
      if(localStorage.getItem('userId')){
        let userId = localStorage.getItem('userId')
        //查询是否已点赞
        this.$axios({
          method:'get',
          url:'blog/selectlikes',
          params:{
            topic_id:this.id,
            id:userId
          }
        }).then((res) =>{
          if(res.data.errno == 0){
            this.isshow = true
          }
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
        //查询是否已收藏
        this.$axios({
          method:'post',
          url:'blog/getcollect',
          data:{
            topic_id:this.id,
            id:userId
          }
        }).then((res) =>{
          if(res.data.errno == 0){
            this.active = true
          }
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      }

    },
    filters:{
      //时间格式化函数
      renderTime(date){
        var dateee  = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      },
    },
    methods:{
      //点击编辑文章
      btnClick(){
        if(localStorage.getItem('userId') === this.text.user_id) {
          this.$router.push({path: '/update'})
          localStorage.setItem('textid', this.$route.query.id)
        }else {
          return
        }

      },
      //点击收藏
      collectClick(){
        if(localStorage.getItem('userInfo')){
          let userId = localStorage.getItem('userId')
          let num = this.text.TReplyCount + 1
          userId = userId.replace(/\"/g, "")
          this.$axios({
            method:'post',
            url:'blog/updateReply',
            data:{
              id:this.id,
              num:num,
            }
          }).then((res) =>{
            //将文章加入到用户的收藏列表
            this.$axios({
              method:'post',
              url:'blog/updateReply1',
              data:{
                id:this.id,
                title:this.text.title,
                user_id:userId
              }
            }).then((res) =>{
              //更新页面
              this.$axios({
                method:'get',
                url:'blog/detail',
                params:{
                  id:this.id
                }
              }).then((res) =>{
                this.text = res.data.data
                this.active = true
              }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
              })
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
      //取消收藏
      delcollect(){
        let userId = localStorage.getItem('userId')
        let num = this.text.TReplyCount - 1
        userId = userId.replace(/\"/g, "")
        this.$axios({
          method:'post',
          url:'blog/updateReply',
          data:{
            id:this.id,
            num:num,
          }
        }).then((res) =>{
          this.$axios({
            method:'post',
            url:'blog/delReply',
            data:{
              id:this.id,
              title:this.text.title,
              user_id:userId
            }
          }).then((res) =>{
            this.$axios({
              method:'get',
              url:'blog/detail',
              params:{
                id:this.id
              }
            }).then((res) =>{
              this.text = res.data.data
              this.active = false
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      },

      //点击点赞
      likeClike(){
        if(localStorage.getItem('userInfo')) {
          let userId = localStorage.getItem('userId')
          let num = this.text.likes + 1
          this.$axios({
            method: 'post',
            url: 'blog/updateLike',
            data: {
              topic_id: this.id,
              id: userId
            }
          }).then((res) => {

            this.$axios({
              method: 'post',
              url: 'blog/com',
              data: {
                topic_id: this.id,
                num: num
              }
            }).then((res) => {
              this.$axios({
                method: 'get',
                url: 'blog/detail',
                params: {
                  id: this.id
                }
              }).then((res) => {
                this.text = res.data.data
                this.isshow = true
              }).catch((error) => {
                console.log(error)       //请求失败返回的数据
              })
            }).catch((error) => {
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) => {
            console.log(error)       //请求失败返回的数据
          })
        }else {
          alert('你还未登录，快去登录吧！')
          return
        }
      },
      //取消赞
      dellikeClike(){
        let userId = localStorage.getItem('userId')
        let num = this.text.likes - 1
        this.$axios({
          method:'post',
          url:'blog/delLikes',
          data:{
            topic_id:this.id,
            id:userId
          }
        }).then((res) =>{

          this.$axios({
            method:'post',
            url:'blog/com',
            data:{
              topic_id:this.id,
              num:num
            }
          }).then((res) =>{
            this.$axios({
              method:'get',
              url:'blog/detail',
              params:{
                id:this.id
              }
            }).then((res) =>{
              this.text = res.data.data
              this.isshow = false
            }).catch((error) =>{
              console.log(error)       //请求失败返回的数据
            })
          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }).catch((error) =>{
          console.log(error)       //请求失败返回的数据
        })
      }
    }

  }
</script>

<style scoped>
  .row{
    margin-left: 3px;
  }
  .container{
    min-height: 535px;
  }
  .glyphicon{
    margin-left: 15px;
    line-height: 30px;
  }
pre{
  white-space:pre-wrap;
  white-space:-moz-pre-wrap;
  white-space:-pre-wrap;
  white-space:-o-pre-wrap;
  word-wrap:break-word;
}
  a{
    cursor:pointer;
  }
  .container img{
    height: 30px;
    width: 30px;
  }
</style>