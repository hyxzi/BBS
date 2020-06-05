import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state : {
    userInfo: localStorage.getItem("userInfo") || {},//先去localStorage中获取数据
    userId: localStorage.getItem("userId") || {},
    TSID:localStorage.getItem("TSID") || {},
  },
  mutations : {
    setuserInfo(state, v) {
      localStorage.setItem('userInfo', v);//将传递的数据先保存到localStorage中
      state.userInfo = v;// 之后才是修改state中的状态
    },
    deluserInfo(state, v) {
      localStorage.removeItem('userInfo');//将传递的数据先保存到localStorage中
      state.userInfo = v;// 之后才是修改state中的状态
    }
  }
})


export default store