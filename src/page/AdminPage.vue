<template>

<div>
  <el-table
    ref="multipleTable"
    :data="AllGoods"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="image"
      label="商品"
      width="100">
      <template slot-scope="scope"><img v-if="scope.row" :src="require(`../../server/${scope.row.image.replace(/\\/g, '\/')}`)" style="width: 100px;height: 100px;"></template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="70">
      <template slot-scope="scope">{{ scope.row.title }}</template>
    </el-table-column>
    <el-table-column
      label="商品描述"
      width="150"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.description}}</template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="70">
      <template slot-scope="scope">{{ scope.row.price}}</template>
    </el-table-column>
    <el-table-column
      label="折扣价"
      width="70">
      <template slot-scope="scope">{{ scope.row.onlinePrice}}</template>
    </el-table-column>

    <el-table-column
      label="库存"
      width="70"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.inventory}}</template>
    </el-table-column>
    <el-table-column
      label="发获地址"
      width="70"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.address}}</template>
    </el-table-column>
    <el-table-column
      label="送货方式"
      width="70"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.sendType}}</template>
    </el-table-column>
    <el-table-column
      label="库存"
      width="70"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.inventory}}</template>
    </el-table-column>
    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleEdit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!--<div class="pay-container">
      <p><Button to="/AddGoods" long type="primary" size="large">添加更多的商品.......</Button>
      </p>
  </div>-->
</div>

</template>

<script>
  import Header from "../components/Header";
  import App from "../App";
    export default {
        name: "AdminPage",
        components:{Header,App},
        inject:['reload'],
        data(){
            return{
                isLogin:false,
                AllGoods:[{
                    title:'',
                    description:'',
                    price:'',
                    onlinePrice:'',
                    inventory:'',
                    image:'',
                }],
                multipleSelection: []
            }
        },
        methods:{
            getALlGoods:function () {
                let self=this;
                self.$http.post('/api/admin/getGoodsInfo',{},{}).then((response) => {
                    console.log(response);
                    if(response.data==-1){
                        console.log('没有存储任何物品');
                        this.$message({
                            message:'没有存储任何商品',
                            type:"success"
                        })
                    }
                    else if(response.status==200){
                        console.log('查找成功');
                        this.AllGoods = response.data;
                        console.log(this.AllGoods)
                        let result = response.data;
                        self.AllGoods.title=result.title;
                        self.AllGoods.description=result.description;
                        self.AllGoods.price=result.price;
                        self.AllGoods.onlinePrice=result.onlinePrice;
                        self.AllGoods.inventory=result.inventory;
                        self.AllGoods.image=result.image;
                    }
                })
            },
            handleEdit(id){
              console.log('编辑参数'+id);
              this.$router.push({name:'EditGoods',params:{id:id}})
            },
            handleDelete(id){
                console.log('参数' + id);
                this.$Modal.confirm({
                    title: '管理员您确认要删除',
                    content: '<p>确定删除此商品</p>',
                    onOk: () => {
                        this.$http.post('/api/admin/deleteAllGoods', {id: id}, {}).then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                console.log('删除成功');
                                this.$message({
                                    message: '管理员您已将此商品删除，亲~~',
                                    type: 'success'
                                });
                                this.reload();
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        },
        mounted() {
            this.getALlGoods()
        }
    }
</script>

<style scoped>
  *{
    padding-top: 15px;
  }
.pay-container{
  padding: 20px;
  font-size: 20px;

}
</style>
