<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>

import NavBar from '@/common/navBar/NavBar'
export default {
  name: 'app',
  components: {
    NavBar
  }

}
</script>
<style>
body{
  background-color: #cccccc;
}
</style>
