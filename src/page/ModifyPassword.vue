<template>
  <div>
    <div>
      <Header></Header>
    </div>
    <div class="main">
      <Form ref="form" :model="form" :rules="rule" class="login-form" :label-width="80">
        <FormItem prop="password" label="密码">
          <Input type="password" v-model="form.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem prop="rePassword" label="确认密码">
          <Input type="password" v-model="form.rePassword" placeholder="请再次确认密码"/>
        </FormItem>
        <FormItem>
          <Button @click="changePassword('form')" type="primary">确认</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button @click="cancel()">取消</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "ModifyPassword",
        components:{Header},
        data(){
            const rePasswordValidate=(rule,value,callback)=>{
                if(value==''){
                    callback(new Error('请再次确认密码'));
                }
                else{
                    if(value!=''){
                        if(value!=this.form.password){
                            callback(new Error('输入两次密码不一致'));
                        }else{
                            callback();
                        }
                    }
                }
            }
            return{
                form:{
                    password:'',
                    rePassword:''
                },
                rule:{
                    password:[
                        {
                            trigger:'blur',
                            required:true,
                            message:'密码不能为空'
                        },
                        {
                            type:'string',
                            trigger: 'blur',
                            message: '密码不能少于六位数',
                            min:6
                        }
                    ],
                    rePassword: [
                        {
                            trigger:'',
                            required: true,
                            validator:rePasswordValidate,
                        }
                    ]
                }
            }
        },
        methods:{
            changePassword(formName){
                console.log('id='+sessionStorage.getItem('user_id'));
                let pwdData={
                    id:sessionStorage.getItem('user_id'),
                    password:this.form.password
                };
                console.log(pwdData.id+'---'+pwdData.password);
                this.$refs[formName].validate((valid)=>{
                    if(valid) {
                        this.$http.post('/api/user/modifyPassword', pwdData).then(function (response) {
                            console.log(response);
                           this.$message({
                               message: '用户密码修改成功，亲~~',
                               type: 'success'
                           })
                            sessionStorage.clear();
                            this.$router.push('/Login');
                        }).then(function (error) {
                            console.log(error);
                        })
                    }
                    else{
                        console.log('无效数据');
                    }
                })
            },
            cancel(){
                this.$router.push('/Login');
            }
        }
    }
</script>

<style scoped>
  .login-form{
    margin:40px auto;
    width:300px;
  }
</style>
