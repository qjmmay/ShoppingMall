<template>
    <div>
      <Form ref="userForm" :model="userForm"  :label-width="80">
        <FormItem label="用户名称" prop="username">
          <Input v-model="userForm.username" readonly/>
        </FormItem>
        <FormItem label="邮箱" prop="userMail">
          <Input v-model="userForm.userMail" placeholder="请输入邮箱" />
        </FormItem>
        <FormItem label="手机" prop="userPhone">
          <Input v-model="userForm.userPhone" placeholder="请输入手机号" />
        </FormItem>

        <FormItem label="地址" prop="address">
          <Input v-model="userForm.address" placeholder="请输入地址信息" />
        </FormItem>

        <FormItem>
          <Button type="primary" @click="updateUser('userForm')" style="width: 300px">更&nbsp;&nbsp;新</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        name: "editUser",
        data(){
            return{
                userForm:{
                    username:'',
                    userMail:'',
                    userPhone:'',
                    address:''
                }
            }
        },
        methods:{
            updateUser(formName){
               let id=this.$route.params.id;
               console.log(id)
                let userData={
                    id:id,
                    userMail:this.userForm.userMail,
                    userPhone:this.userForm.userPhone,
                    address:this.userForm.address
                };
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/api/user/UpdateUser',userData).then(function(response) {
                            console.log(response);
                            this.$message({
                                message: '用户信息更新成功，亲~~',
                                type: 'success'
                            });
                            this.$router.push('/showUser');
                        }).then(function(error) {
                            console.log(error);
                        })
                    } else {
                        console.log('修改失败!');
                        return false;
                    }
                });
            },
            getUser(){
                let username=this.$route.params.username;
                console.log(username);
                this.$http.post('api/user/getUserInfo',{username:username},{}).then((response)=>{
                    if(response.data===-1){
                        console.log('没有该用户信息');
                    }
                    else if(response.status===200){
                        console.log('获取成功')
                        this.userForm=response.data[0]
                        let result=response.data[0]
                        this.userForm.username=result.username
                        this.userForm.userMail=result.userMail
                        this.userForm.userPhone=result.userPhone
                        this.userForm.address=result.address
                        /*sessionStorage.setItem('user_id',response.data.id)*/
                      /*  let result=response.data
                        this.userForm.u*/
                    }
                })
            }
        },
        mounted() {
          this.getUser()
        }
    }
</script>

<style scoped>

</style>
