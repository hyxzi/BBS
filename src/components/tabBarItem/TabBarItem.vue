<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeStyle"><slot></slot></div>
  </div>

</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor: {
        type: String,
        default: 'red'
      },
      backgroundColor: {
        type: String,
        default: '#E7E7E7'
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {

        return this.isActive ? {color: this.activeColor,backgroundColor:this.backgroundColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)

      }
    }

  }
</script>

<style scoped>

</style>