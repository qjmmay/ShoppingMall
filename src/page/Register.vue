<template>
  <div>
    <div class="header">
     <!-- <Icon type="md-albums" size="30" color="darkturquoise"/>
      <span style="font-size: 24px;font-family: 'Avenir', Helvetica, Arial, sans-serif;color: darkturquoise">注册</span>-->
      <Header></Header>

    </div>
    <div>
      <span class="image"><img src="../../static/image/signup-sale.png" width="450px" height="400px"></span>
    </div>
    <div>
    <span style="font-size: 22px;font-weight: bold;text-align: center;margin-left: 250px;padding-top:30px;position:relative;color: #0086b3">欢迎新用户注册</span>
    <div class="main">
      <Form ref="form" :model="form" :label-width="80"class="registerForm" :rules="rule">
        <FormItem label="用户名称" prop="username">
          <Input v-model="form.username" placeholder="请输入用户名称" type="text"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="form.password" placeholder="请输入密码"  type="password"/>
        </FormItem>
        <FormItem label="确认密码" prop="rePassword">
          <Input v-model="form.rePassword" placeholder="请再次确认密码"  type="password"/>
        </FormItem>
        <FormItem label="邮箱" prop="userMail">
          <Input v-model="form.userMail" placeholder="请输入邮箱"  type="text"/>
        </FormItem>
        <FormItem label="手机" prop="userPhone">
          <Input v-model="form.userPhone" placeholder="请输入手机号"  type="text"/>
        </FormItem>
        <FormItem label="配送地址" prop="address">
          <Input v-model="form.address" placeholder="请输入地址"  type="text"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="userRegister('form')" style="width: 300px">注册</Button>
        </FormItem>
      </Form>
    </div>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "Register",
        components:{Header},
        data(){
            const validatePhone=(rule,value,callback)=>{
                if(value==''){
                    callback(new Error('手机号不能为空'));
                }else{
                    if(value!=''){
                        var reg=/^1[3456789]\d{9}$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的手机号'));
                        }
                    }
                    callback();
                }
            };
            const validateMail=(rule,value,callback)=>{
                if(value==''){
                    callback(new Error('邮箱不能为空'));
                }else{
                    if(value!=''){
                        var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的邮箱'));
                        }
                    }
                    callback();
                }
            };
            const validateRePwd=(rule,value,callback)=>{
                if(value==''){
                    callback(new Error('请再次输入密码'));
                }else{
                    if(value!=this.form.password){
                        callback(new Error('输入的两次密码不一致'));
                    }
                    else{
                        callback();
                    }
                }
            }
            return{
                form:{
                    username: '',
                    IDName: '',
                    password: '',
                    rePassword: '',
                    userMail: '',
                    userPhone: '',
                   address:'',
                },
                rule:{
                    username:[
                        {
                            required:true,
                            message:'用户名不能为空',
                            trigger:'blur'
                        }
                    ],
                    password:[
                        {
                            required:true,
                            message:'密码不能为空',
                            trigger:'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能少于6位数',
                            trigger: 'blur'
                        }
                    ],
                    rePassword: [
                        {
                            required: true,
                            validator:validateRePwd,
                            trigger: 'blur'
                        }
                    ],
                    userMail: [
                        {
                            required: true,
                            validator:validateMail,
                            trigger: 'blur'
                        }
                    ],
                    userPhone: [
                        {
                            required: true,
                            trigger:'blur',
                            validator:validatePhone
                        }
                    ],
                   address:[
                       {
                           required: true,
                           trigger:'blur',
                           message:'地址栏不能为空'
                       }
                   ]
                }
            }
        },
        methods:{
            userRegister:function (formName) {
                const self=this;
                self.$refs[formName].validate((valid)=>{
                    if(valid){
                        self.$http.post('/api/user/register',self.form).then(function(response){
                            console.log(response);
                            console.log('注册成功');
                            self.$router.push('/Login');
                        }).then(function (error) {
                            console.log(error);
                        })
                    }
                    else{
                        console.log('注册失败');
                        return false;
                    }
                })
            },
            Cancel(){
                const self=this;
                self.$router.push('/Login');
            }
        }
    }
</script>

<style scoped>
  .header{
    width: 100%;
    /*background-color: #2c3e50;*/
  }
  .image img{
    float: left;
    margin-top: 40px;
  }
  .main{
    width: 390px;
    float: right;
    margin-top: 20px;
    margin-right: 90px;
  }
  .cancel{
    float: right;
    font-size: 14px;
    color: white;
    margin-right: 10px;
    margin-top: 7px;
  }
  .cancel:hover{
    cursor: pointer;
    color:royalblue;
  }
</style>
