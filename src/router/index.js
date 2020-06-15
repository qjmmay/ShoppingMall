import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Header from "../components/Header";
import Login from "../page/Login";
import Footer from "../components/Footer";
import Register from "../page/Register";
import Home from "../page/Home";
import GoodList from "../page/GoodList";
import Cart from "../page/Cart";
import PaySuccess from "../page/PaySuccess";
import Pay from "../page/Pay";
import AdminPage from "../page/AdminPage";
import PersonPanel from "../components/PersonPanel";
import AdminPanel from "../components/AdminPanel";
import UserCenter from "../page/UserCenter";
import ModifyPassword from "../page/ModifyPassword";
import ModifyUserInfo from "../page/ModifyUserInfo";
import AddGoods from "../page/AddGoods"
import EditGoods from "../page/EditGoods";
import AllGoods from "../page/AllGoods";
import Admin from "../page/Admin";
import showUser from "../page/showUser";
import editUser from "../page/editUser";
import showOrder from "../page/showOrder";
Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: '/Login',
      component:Login
    },

    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children:[
        {
          path:'/AdminPage',
          name:'AdminPage',
         /* meta:{
            title:'首页',
          },*/
          component:AdminPage
        },
        {
          path:'/AddGoods',
          name:'AddGoods',
          meta:{
            title:'添加商品',
          },
          component:AddGoods
        },
        {
          path:'/EditGoods',
          name:'EditGoods',
          meta:{
            title:'编辑商品',
          },
          component:EditGoods
        },
        {
          path:'/showUser',
          name:'showUser',
          meta:{

          },
          component: showUser
        },
        {
          path:'/editUser',
          name:'editUser',
          component:editUser
        },
        {
          path:'/showOrder',
          name:'showOrder',
          component:showOrder
        },
      ]

    },

    {
      path:'/Register',
      name:'Register',
      component:Register
    },
    {
      path:'/Home',
      name:'Home',
      component:Home,
    },
    {
      path:'/GoodList',
      name:'GoodList',
      component:GoodList
    },
    {
      path:'/Cart',
      name:'Cart',
      component:Cart
    },

    {
      path:'/PaySuccess',
      name:'PaySuccess',
      component:PaySuccess
    },
    {
      path:'/Pay',
      name:'Pay',
      component:Pay
    },
    {
      path:'/AdminPage',
      name:'AdminPage',
      component:AdminPage
    },
    {
      path:'/PersonPanel',
      name:'PersonPanel',
      component:PersonPanel
    },
    {
      path:'/AdminPanel',
      name:'AdminPanel',
      component:AdminPanel
    },
    {
      path:'/ModifyPassword',
      name:'ModifyPassword',
      component:ModifyPassword
    },
    {
      path:'/userCenter',
      name:'UserCenter',
      component:UserCenter
    },
    {
      path:'/ModifyUserInfo',
      name:'ModifyUserInfo',
      component:ModifyUserInfo
    },
    {
      path:'/AddGoods',
      name:'AddGoods',
      component:AddGoods
    },
   /* {
      path:'/EditGoods',
      name:'EditGoods',
      component:EditGoods
    },*/
    {
      path:'/AllGoods',
      name:'AllGoods',
      component:AllGoods
    },
  ]
})
