<template>
  <form  @submit.prevent="submit">
    <label for="lastname" class="col-sm-2 control-label">道具名称：</label>

    <input type="text" class="form-control name" >

    <label for="lastname" class="col-sm-2 control-label">兑换所需积分</label>

    <input type="text" class="form-control signature">

    <label for="lastname" class="col-sm-2 control-label">库存量：</label>

    <input type="text" class="form-control sex" >
    <button type="submit" class="btn btn-default">提交</button>
  </form>
</template>

<script>
  export default {
    name: "Updategoods",
    created() {

    }
  }
</script>

<style scoped>
  .btn{
    margin: 20px;
    margin-left: 40%;
  }
</style>