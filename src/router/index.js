import Vue from 'vue'
import VueRouter from 'vue-router'

const Home =()=> import('../views/home/Home')
const Category =()=>import('../views/category/Category')
const Cart =()=>import('../views/cart/Cart')
const Profile =()=>import('../views/profile/Profile')
const Shop =() =>import('../views/shop/Shop')
const Login =()=>import('@/components/login/Login')
const Register =()=>import('@/components/login/Register')
const Detail =() =>import('../views/detail/Detail')
const NewDetail = () =>import('../views/new/NewDetail')
const updateDetail = () =>import('../views/new/Update')
const List =() => import('../views/list/List')

//使用插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/shop',
    component:Shop
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/detail',
    component:Detail
  },
  {
    path:'/new',
    component:NewDetail
  },
  {
    path:'/update',
    component:updateDetail
  },
  {
    path:'/list',
    component:List
  }

]
//创建路由
const router = new VueRouter({
  routes,
  mode:'history'
})

export default router