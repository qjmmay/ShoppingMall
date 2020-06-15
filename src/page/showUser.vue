<template>
  <el-table
    :data="formUser"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline-block class="demo-table-expand">
          <el-form-item label="用户名">
            <span>{{ props.row.username }}</span>
          </el-form-item>
          <el-form-item label="邮箱号">
            <span>{{ props.row.userMail }}</span>
          </el-form-item>
          <el-form-item label="手机号">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="用户地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="用户名"
      prop="username">
    </el-table-column>
    <el-table-column
      label="邮箱号"
      prop="userMail">
    </el-table-column>
    <el-table-column
      label="手机号"
      prop="userPhone">
    </el-table-column>
    <el-table-column
      label="用户地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="用户地址"
     >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="show(scope.row.id,scope.row.username)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="remove(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  import App from "../App";
    export default {
        name: "showUser",
        components:{App},
        inject:['reload'],
        data() {
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
            return {

                formUser:[
                    {id:'',
                    username:'',
                    userMail:'',
                    userPhone:'',
                    address:''
                }
                ],
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
            show(index,username){
               console.log(index)
                this.$router.push({name:'editUser',params:{id:index,username:username}})
            },
            remove(index){
                console.log('参数'+index);
                let self=this;
                self.$Modal.confirm({
                    title: '管理员您确认要删除此用户',
                    content: '<p>确定删除该用户</p>',
                    onOk: () => {
                        self.$http.post('/api/admin/deleteUser',{id:index},{}).then((response)=>{
                            console.log(response);
                            if (response.status === 200) {
                                console.log('删除成功');
                                this.$message({
                                    message: '管理员您已将此用户删除',
                                    type: 'success'
                                });
                                this.reload();
                            }
                            else{
                                console.log('删除失败')
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            },
            getUser(){
                let self=this;
                self.$http.post('/api/user/getUserInfo',{}, {}).then((response) => {
                    console.log(response);
                    if (response.data === -1) {
                        console.log("用户名不存在");
                    } else if (response.status ===200) {
                        console.log("查找成功");
                       self.formUser = response.data;
                        console.log(this.formUser)
                        let result = response.data;
                        self.formUser.id=result.id;
                        self.formUser.username = result.username;
                        self.formUser.userMail = result.userMail;
                        self.formUser.userPhone = result.userPhone;
                        self.formUser.address = result.address;
                    }
                })
            }
        },
        mounted() {
            this.getUser();
        }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

</style>
