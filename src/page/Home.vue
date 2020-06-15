<template>
<div class="container">
  <div><Header></Header></div>
  <div class="navBar">
    <ul class="catalog-navBar">
      <li v-for="(nav,index) in navBars" :key="index" class="cate-nav-item">
        <i class="cate-nav-icon" :class="nav.icon"></i>
        {{nav.text}}
      </li>
    </ul>
    <div class="pic-slide">
      <el-carousel :interval="2000" arrow="always" height="400px">
        <el-carousel-item>
          <router-link to="/AllGoods">
        <img src="../../static/image/1.jpg">
          </router-link>
        </el-carousel-item>
       <el-carousel-item>
         <router-link to="/AllGoods">
          <img src="../../static/image/2.jpg">
         </router-link>
        </el-carousel-item>
        <el-carousel-item>
          <router-link to="/AllGoods">
          <img src="../../static/image/3.jpg">
          </router-link>
        </el-carousel-item>
        <el-carousel-item>
          <router-link to="/AllGoods">
          <img src="../../static/image/5.jpg">
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="nav-show">
    <span><img src="../../static/image/nav_showimg1.jpg"></span>
    <span><img src="../../static/image/nav_showimg2.jpg"></span>
  </div>
  </div>
  <div class="rec-banner">
    <h1 class="banner-title">精品推荐</h1>
    <ul class="rec-list">
      <li class="rec-card" v-for="(item,key) in recGoods" :key="key" @click="togglePage(item)">
        <!--:src="item.cover图片拼接-->
       <img class="rec-media" :src="require(`../../server/${item.image.replace(/\\/g, '\/')}`)">
        <div class="rec-profile">
          <span style="font-size: 16px;font-weight: bold;">{{item.title}}</span>
          <p class="rec-params">
            原价：<span class="rec-price">￥{{item.price}}</span>
            促销价：<span class="rec-online-price">￥{{item.onlinePrice}}</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import Header from "../components/Header";
  import data from "../../data/data";
    export default {
        name: "Home",
        components:{Header},
        data(){
            return{
              recGoods:{
                  title:'',
                  price:'',
                  onlinePrice:'',
                  image:''
              }
            }
        },
        methods:{
            togglePage (item) {
                console.log(item.title)
                this.$router.push({name: 'GoodList', params: {title:item.title}});
            }
        },
        computed:{
            navBars:function () {
                return data.navbars
            },
          /*  image:function () {
                return data.recImage
            }*/
        },
        mounted() {
          let self=this;
            self.$http.post('/api/user/getRecGoods',{},{}).then((response) => {
                console.log(response);
                if(response.data==-1){
                    console.log('没有推荐物品');
                }
                else if(response.status==200){
                    console.log('查找成功');
                    this.recGoods = response.data;
                    console.log(this.recGoods)
                    let result = response.data;
                    self.recGoods.title=result.title;
                    self.recGoods.price=result.price;
                    self.recGoods.onlinePrice=result.onlinePrice;
                    self.recGoods.image=result.image;
                }
            })
        }
    }
</script>

<style scoped>
  .rec-banner{
      margin:20px auto;
      background-color: #fff;
      padding-bottom: 40px;
      padding-top: 20px;
      width: 1120px;

    }
  .banner-title{
    padding: 10px 15px;
  }
  .rec-list{
    border-top: 1px solid #cccccc;
    list-style: none;
  }
  .rec-card{
    display: inline-block;
    cursor: pointer;
    width:25%;
    text-align: center;
    vertical-align: top;
  }
  .rec-media{
      width:240px;
      height:300px;
    }
  .rec-profile{
    display: inline-block;
    color: #444;
    margin:20px 0;
  }
  .rec-params{
    color:#888;
    font-size: 14px;
    margin: 12px;
  }
  .rec-price{
    text-decoration: line-through;
  }
  .rec-online-price{
    font-size: 16px;
    color:#ff0036;
  }
  .navBar{
    width:1120px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    /*background-color: #789;*/
  }
  .nav-show{
    position: absolute;
    margin-top: 400px;
    margin-left: 280px;
  }
  .nav-show img{
    width:348px;
  }
  .catalog-navBar{
    display: inline-block;
    position:absolute;
    list-style: none;
    width:200px;
    height:518px;
    margin: auto;
    padding: auto;
    z-index: 2;
    background-color: rgba(0,0,0,0.8);
   float: left;
  }
  .cate-nav-icon{
    opacity: .5;
  }
  .pic-slide{
    position:absolute;
    width:700px;
    height:400px;
    margin-left: 280px;
    background-color: #e5e5e5;
  }
  .cate-nav-item{
    padding-left: 12px;
    line-height: 37px;
    color:#fff;
    cursor: pointer;
  }
  .cate-nav-item:hover{
    color:#787878;
    /*透明度*/
    background-color: rgba(255,255,255,0.5);
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>
