<template>
<div>
  <Header></Header>
  <div class="main">
    <Form :model="form" :label-width="80">
      <FormItem label="用户名称">
        <Input v-model="form.username" readonly/>
      </FormItem>
      <FormItem label="邮箱">
        <Input v-model="form.userMail" readonly/>
      </FormItem>
      <FormItem label="手机">
        <Input v-model="form.userPhone" readonly/>
      </FormItem>
      <FormItem label="地址">
        <Input v-model="form.address" readonly/>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="editUserInfo()" style="width: 300px">编辑资料</Button>
      </FormItem>
    </Form>
  </div>
</div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "UserCenter",
        components:{Header},
        data(){
            return{
                form:{
                    username:'',
                    userMail:'',
                    userPhone:'',
                    address:''
                }
            }
        },
        methods:{
            getUserInfo: function () {
                let userName = sessionStorage.getItem('userName');
                const self = this;
                console.log(userName);
                if (userName) {
                    self.$http.post('/api/user/getUserInfo', {username: userName}, {}).then((response) => {
                        console.log(response);
                        if (response.data == -1) {
                            console.log("用户名不存在");
                        } else if (response.status == 200) {
                            console.log("查找成功");
                            this.form = response.data[0];
                            console.log(this.form)
                            let result = response.data[0];
                            let user_id = result.id;
                            sessionStorage.setItem('user_id', user_id);
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
            },
            editUserInfo(){
                this.$router.push('/ModifyUserInfo');
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
    margin: 20px auto;
  }
</style>
