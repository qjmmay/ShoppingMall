<template>
  <div class="user-Container">
    <div class="user">
      <div class="user-logo">
        <img src="../../static/image/img.jpg">
      </div>
      <div class="user-info">
        <span>{{username}}</span>-<span>超级管理员</span>
      </div>
      <div class="user-register-time">
        <span class="fa fa-clock-o">注册时间：</span><span>2019-11-18</span>
      </div>
    </div>
    <div class="check-relation">
      <span class="relation-item">followers</span>
      <span class="relation-item">watches</span>
      <span class="relation-item">friends</span>
    </div>
    <div class="button">
    <span class="button-operate">
      <el-button icon="fa fa-male" class="button-item" size="small" @click="AdminCenter()">个人中心</el-button>
    </span>
      <span class="button-operate">
      <el-button icon="fa fa-key" class="button-item" size="small" @click="AdminModifyPwd()">修改密码</el-button>
    </span>
    </div>
    <div class="another-operate">
      <div class="another-operate-item">
        <li class="fa fa-eraser">清除缓存</li>
      </div>
      <div class="another-operate-item">
        <li class="fa fa-user">在线人数</li>
      </div>
      <div class="another-operate-item">
        <li class="fa fa-bell"> 访问次数</li>
      </div>
      <div class="another-operate-item">
        <li class="fa fa-sign-out">还原备份</li>
      </div>
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
            logout(){
                sessionStorage.clear();
                this.$router.push('/')
            },
            AdminModifyPwd(){
                this.$router.push('/AdminModifyPwd');
            },
            AdminCenter(){
                this.$router.push('/AdminCenter');
            }
        }
    }
</script>

<style scoped>
  .user-Container{
    width:300px;
  }
  .user{
    background-color: rgb(19, 138, 156);
    margin-bottom: 20px;
  }
  .user-logo img{
    width:80px;
    overflow: hidden;
    border-radius: 50px;
    margin:12px 110px;
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
    padding: 10px;
  }
  .check-relation{
    color:dimgrey;
    margin-top: -20px;
    background-color: rgba(200, 209, 204, 0.5);
    font-size:16px;
    padding: 15px;
  }
  .relation-item{
    padding: 12px;
  }
  .button{
    height: 50px;
    border-bottom:1px solid #f7f7f7;
  }
  .button-operate{
    margin:20px 0;
  }
  .button-item{
    margin:9px 23px;
  }
  .another-operate{
    color:dimgrey;
  }
  .another-operate-item li{
    margin-top: 25px;
    margin-left: 20px;
    cursor: pointer;
  }
  .another-operate-item li:hover{
    color:royalblue;
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
