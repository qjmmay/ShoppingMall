<template>
    <div class="header-container">
      <div class="head-logo"><img src="../../static/image/logo.png" width="150px" @click="toHome()"></div>
      <div v-if="!isLogin">
      <span class="user-inn" @click="toLogin()"><i class="el-icon-user-solid"></i>你好，请登录|</span>
      <span class="user-in"  @click="toRegister()"><i class="el-icon-user-solid"></i>免费注册</span>
      </div>
      <div v-else class="header">
        <span class="user-name"  v-popover:popover-user><img src="../../static/image/img.jpg" style="width:40px;height: 40px;border-radius: 50%">&nbsp;&nbsp;&nbsp;{{username}}</span>
        <el-popover
          placement="bottom-start"
          width="300"
          trigger="hover"
          ref="popover-user"
        >
            <PersonPanel></PersonPanel>
        </el-popover>

      </div>
      <el-menu class="menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="toLogin()" v-if="!isLogin"><i class="el-icon-user-solid"></i>你好，请登录|</el-menu-item>
        <el-menu-item index="1" @click="toRegister()" v-if="!isLogin"><i class="el-icon-user-solid"></i>免费注册</el-menu-item>
        <el-menu-item index="2" @click="toCart()"><Icon type="md-cart" />购物车</el-menu-item>
        <el-menu-item index="3">网站导航</el-menu-item>
        <el-menu-item index="4">客户服务</el-menu-item>
        <el-menu-item index="5">企业采购</el-menu-item>
        <el-menu-item index="6">
          <router-link to="/Home">商城首页</router-link></el-menu-item>
      </el-menu>

    </div>

</template>

<script>
  import App from "../App";
  import PersonPanel from "./PersonPanel";
  import AdminPanel from "./AdminPanel";
    export default {
        name: "Header",
        components:{App,PersonPanel,AdminPanel},
        inject:['reload'],
        data(){
            return{
                activeIndex:1,
                isLogin:false,
                username:'',
                isAdmin:true
            }
        },
        methods:{
            handleSelect(key,keyPath){
                console.log(key,keyPath);
            },
            toCart:function () {
                if(this.isLogin===false){
                    this.$message({
                        message:'请先登录在查看',
                        type:"success"
                    })
                    this.$router.push("/")
                }
                else {
                    if (sessionStorage.getItem('userName') === '覃金梅') {
                        this.$message({
                            message: '管理员不能操作',
                            type: "success"
                        })
                    } else {
                        this.$router.push("/Cart")
                    }
                }
            },
            toLogin:function () {
                this.$router.push("/")
            },
            toRegister:function () {
                this.$router.push("/Register")
            },
            toHome:function () {

                this.$router.push('/Home')
            },
            logout:function () {
                sessionStorage.clear();
                this.$router.push('/');
            }
        },
        created() {
            let username=sessionStorage.getItem('userName');
            if(username){
                this.isLogin=true;
                this.username=username;
                if(this.username!=='覃金梅'){
                    this.isAdmin=false;
                }
              /*  else{
                    this.isAdmin=false;
                }*/
            }
            else{
                console.log('用户未登录');
            }
        },
    }
</script>

<style scoped>
.header-container{
  right:0;
  left: 0;
  width: 100%;
  height:62.5px;
  border-bottom:1px solid #cccccc;
}
.user-inn{
  font-size: 15px;
  position: absolute;
  margin-left: 410px;
  margin-top: 20px;
}
.user-in{
  font-size: 15px;
  margin-top: 20px;
  position: absolute;
  margin-left: 520px;
}
.user-in,.user-inn{
  cursor: pointer;
}
.user-inn:hover,.user-in:hover{
  color:seagreen;
}
  .head-logo{
    float: left;
  }
  .menu-demo{
    float: right;
    border: none;
  }
.header{
  width:150px;
  float:right;
  margin-right: -15px;
  padding-top: 10px;
}
.header span{
  margin-right: 13px;
}
.user-name{
    font-size: 18px;
     color: darkslategrey;
  }

</style>
