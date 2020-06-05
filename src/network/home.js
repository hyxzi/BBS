import {request} from "./index";

export function getHomeMultidata() {
  this.$axios({
    method:'get',
    url:'blog/recommends'
  }).then((response) =>{

    console.log(response)       //请求成功返回的数据
  }).catch((error) =>{
    console.log(error)       //请求失败返回的数据
  })
}

export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
/*export function getHomeMultidata() {
  axios.get('http://localhost:8000/api/blog/list')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}*/
