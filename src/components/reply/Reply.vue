<template>
  <div>
    <ul class="list-group">
    <li class="list-group-item" v-for="(item, index) in list" :key = "item.id">
      <span class="badge">{{ item.uname }}</span>
      {{ item.content }}
    </li>
  </ul>
    <div class="form-group">
      <input class="form-control val" placeholder="自古评论出大神，能不能上神评就看你了">
    </div>
    <div class="form-group">
      <button type="button" class="btn btn-primary" @click="btnClick">
        发表评论
      </button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Reply",
    data(){
      return {
        list:[]
      }
    },
    created() {
      this.$axios({
        method:'get',
        url:'blog/comment',
        params:{
          id:this.$route.query.id
        }
      }).then((res) =>{
        this.list = res.data.data
      }).catch((error) =>{
        console.log(error)       //请求失败返回的数据
      })
    },
    methods:{
      btnClick(){
        //获取评论
        if(localStorage.getItem('userInfo')){
          var valcontent = $('.val').val()
          //获取当前文章id
          const id = this.$route.query.id
          const uname = localStorage.getItem('userInfo')
          const userId = localStorage.getItem('userId')
          const Count = this.list.length + 1
          var point = parseInt(localStorage.getItem('point') )+ 1
          this.$axios({
            method:'post',
            url:'blog/newcomment',
            data:{
              id:id,
              value:valcontent,
              userId:userId,
              uname:uname
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
              this.$axios({
                method:'get',
                url:'blog/comment',
                params:{
                  id:this.$route.query.id
                }
              }).then((res) =>{
                this.list = res.data.data
              }).catch((error) =>{
                console.log(error)       //请求失败返回的数据
              })
            }).catch(err => {
              console.log(err)
            })
            $('.val').val('')

          }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
          })
        }else {
          alert('您还未登陆，先去登陆再来发表精彩评论吧')
        }

      }
    }
  }
</script>

<style scoped>

</style>