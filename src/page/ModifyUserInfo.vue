<template>
<div>
  <Header></Header>
  <div class="main">
    <Form ref="form" :model="form" :label-width="80"class="modifyForm" :rules="rule">
      <FormItem label="用户名称" prop="username">
        <Input v-model="form.username" readonly/>
      </FormItem>
      <FormItem label="邮箱" prop="userMail">
        <Input v-model="form.userMail" placeholder="请输入邮箱" />
      </FormItem>
      <FormItem label="手机" prop="userPhone">
        <Input v-model="form.userPhone" placeholder="请输入手机号" />
      </FormItem>

      <FormItem label="地址" prop="address">
        <Input v-model="form.address" placeholder="请输入地址信息" />
      </FormItem>

      <FormItem>
        <Button type="primary" @click="updateUser('form')" style="width: 300px">更&nbsp;&nbsp;新</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script>
    import Header from "../components/Header";
    export default {
        name: "ModifyUserInfo",
        components: {Header},
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
            return{
                form:{
                    username: '',
                    userMail: '',
                    userPhone: '',
                    address:'',
                },
                rule:{
                    username:[
                        {
                            required:true,
                            message:'请输入用户名',
                            trigger:'blur'
                        }
                    ],

                    userMail: [
                        {
                            validator:validateMail,
                            trigger: 'blur'
                        }
                    ],
                    userPhone: [
                        {
                            trigger:'blur',
                            validator:validatePhone
                        }
                    ],
                   address:[
                        {
                            required: true,
                            message: '请输入你的地址信息',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods:{
            updateUser:function (formName){
                console.log('id号为：'+sessionStorage.getItem('user_id'));
                let userData={
                    id:sessionStorage.getItem('user_id'),
                    userMail:this.form.userMail,
                    userPhone:this.form.userPhone,
                    address:this.form.address
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/api/user/UpdateUser',userData).then(function(response) {
                            console.log(response);
                            this.$message({
                                message: '用户信息更新成功，亲~~',
                                type: 'success'
                            });
                            this.$router.push('/Home');
                        }).then(function(error) {
                            console.log(error);
                        })
                    } else {
                        console.log('修改失败!');
                        return false;
                    }
                });
            },
            getUserInfo:function(){
                let userName = sessionStorage.getItem('userName');
                const self = this;
                console.log(userName);
                if (userName) {
                    self.$http.post('/api/user/getUserInfo', {username: userName}, {}).then((response) => {
                        console.log('response='+response);
                        if (response.data == -1) {
                            console.log("用户名不存在");
                        } else if (response.status == 200) {
                            console.log("查找成功");
                            this.form = response.data[0];
                            console.log(this.form);
                            let result = response.data[0];
                            self.form.username = result.username;
                            self.form.userMail = result.userMail;
                            self.form.userPhone = result.userPhone;
                            self.form.address = result.address;
                        }
                    }).then(function (error) {
                        console.log(error);
                    })
                } else {
                    console.log('username 为空');
                }
            }
        },
        mounted() {
            this.getUserInfo();
        }
    }
</script>

<style scoped>
  .main{
    width: 390px;
    margin: 0px auto;
  }
</style>
