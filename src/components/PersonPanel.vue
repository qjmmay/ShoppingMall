<template>
  <div class="container">
  <div class="user">
    <div class="user-logo">
      <img src="../../static/image/img.jpg">
    </div>
    <div class="user-info">
      <span>{{username}}</span>-<span>普通会员</span>
    </div>
    <div class="user-register-time">
      <span class="fa fa-clock-o">注册时间：</span><span>2019-11-18</span>
    </div>
  </div>
  <div class="button">
    <span class="button-operate">
      <el-button icon="fa fa-male" class="button-item" size="small" @click="userCenter()">个人中心</el-button>
    </span>
    <span class="button-operate">
      <el-button icon="fa fa-key" class="button-item" size="small" @click="modifyPassword()">修改密码</el-button>
    </span>
  </div>
  <hr>
  <div class="login-operate">
    <li class="fa fa-sign-out" @click="logout()">退出登录</li>
  </div>
  </div>
</template>

<script>
    export default {
        name: "PersonPanel",
        data(){
            return{
                username:sessionStorage.getItem('userName')
            }
        },

        methods:{
            logout:function () {
                sessionStorage.clear();
                this.$router.push('/');
            },
            userCenter(){
                this.$router.push('/userCenter')
            },
            modifyPassword(){
                this.$router.push('/ModifyPassword')
            }
        }
    }
</script>

<style scoped>
  .container{
    width: 280px;
  }
.user{


  background-color: rgb(19, 138, 156);
  margin-bottom: 20px;
}
  .user-logo{


  }
  .user-logo img{
   /* border-radius: 50%;
    width:150px;
    height: 150px;*/
    width:80px;
    overflow: hidden;
    border-radius: 50px;
    margin:12px 100px;
  }
  .user-info{
    color:darkslategrey;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .user-info,.user-register-time{
    text-align: center;

  }
  .user-register-time{
    color:darkslategrey;
    font-size: 16px;
    padding: 2px;
  }
  .button{
    height: 50px;
    border-bottom:1px solid #f7f7f7;
  }
  .button-operate{

  }
  .button-item{
    margin:0px 23px;
  }
  .login-operate{
    font-size: 18px;
    padding-bottom: 8px;
    text-align: center;
    opacity:0.85;
    cursor: pointer;
  }
  .login-operate:hover{
    color:darkcyan;
  }
</style>
