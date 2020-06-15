<template>
  <div>
    <div class="header">
      <!-- <Icon type="md-albums" size="30" color="darkturquoise"/>
       <span style="font-size: 24px;font-family: 'Avenir', Helvetica, Arial, sans-serif;color: darkturquoise">注册</span>-->
      <Header></Header>

    </div>
    <div class="picture">
      <span class="image"><img src="../../static/image/sale.jpg" width="450px" height="400px"></span>
    </div>
  <div class="login">
    <p style="text-align: center;font-size: 30px;font-weight: bold;">用户登录</p>
    <div class="login-content">
      <Form ref="form" :model="form" :rules="rule" class="login-form">
        <div v-if="errorInfo">
          <span style="color:red">{{errInfo}}</span>
        </div>
        <FormItem prop="username">
          <Input type="text" v-model="form.username" placeholder="请输入用户号" @keyup.enter.native="handleLogin('form')" style="width: 300px"/>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="handleLogin('form')" style="width: 300px"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleLogin('form')" style="width:300px;">登录</Button>
        </FormItem>
        <p @click="goRegister()" class="go-register">注册</p>
      </Form>
    </div>
  </div>
  </div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "Login",
        components:{Header},
        data() {
            return {
                errorInfo: false,
                errInfo:'',
                form: {
                    username: '',
                    password: '',
                    validate: '',
                },
                rule: {
                    rdID: [
                        {
                            required: true,
                            message: '用户号不能为空',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '密码不能为空',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能少于6位数',
                            trigger: 'blur'
                        }
                    ],
                }
            }
        },

        methods: {
            handleLogin: function (formName) {
                const self = this;
                sessionStorage.setItem('userName', self.form.username);
                self.$refs[formName].validate((valid)=>{
                    if(valid){
                        if(self.form.username==='覃金梅'){
                            if( self.form.password==='654321'){
                                self.errorInfo = false;
                                console.log("登录成功");
                                self.$router.push('/Admin');
                            }
                            else{
                                self.errorInfo = true;
                                self.errInfo = '密码错误';
                                console.log("密码有误");
                                /*self.$router.push('/Login')*/
                            }
                        }
                        else {
                            sessionStorage.setItem('userName', self.form.username);
                            localStorage.setItem('user', JSON.stringify(self.form));
                            self.$http.post('/api/user/login', JSON.stringify(self.form), {}).then((response) => {
                                console.log(response.data);
                                if (response.data === -1) {
                                    self.errorInfo = true;
                                    self.errInfo = '用户名不存在';
                                    console.log("用户名不存在");
                                } else if (response.data === 0) {
                                    self.errorInfo = true;
                                    self.errInfo = '密码错误';
                                    console.log("密码有误");
                                } else if (response.status === 200) {
                                    self.errorInfo = false;
                                    console.log("登录成功");
                                    self.$router.push('/Home');
                                }
                            }).then((error) => {
                                console.log(error);
                            })
                        }
                    }
                })

            },
            goRegister() {
                this.$router.push('/Register')
            }
        }
    }
</script>

<style scoped>
  .login-main{
    width:100%;
    height:520px;
  }
  .image{
   /* width:450px;
    height:150px;*/
    float:left;
  /*  margin-left: -100px;*/
    margin-top: 10px;
  }
  .picture{
    float: left;
    margin-top: 40px;
  }
  .login{
    width:500px;
    margin-top: 70px;
    float:right;
  }
  .login-content{

    border:1px solid rgba(195,195,195,0.3);
    border-radius: 5px;
    background-color: white;
    width:370px;
    height:320px;
    float:right;
    margin-right: 90px;
    margin-top: 50px;
  }
  .login-form{
    width:303px;
    margin:55px 40px;
  }
  .verifycode{
    margin-left: 20px;
    width:150px;
    padding-top: 20px;
    float: right;
    margin-top: -24px;
  }
  .go-register{
    width:70px;
    height:25px;
    float: right;
    font-size: 13px;
    color: crimson;
    margin-right: -10px;
    text-align: center;
  }
  .go-register:hover{
    cursor: pointer;
    color: #00d1b2;
  }
</style>
