<template>
  <div>
  <el-table
    ref="multipleTable"
    :data="orders"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      label="订单编号"
      width="70">
      <template slot-scope="scope">{{ scope.row.id}}</template>
    </el-table-column>
    <el-table-column
      prop="image"
      label="商品"
      width="100">
      <template slot-scope="scope"><img v-if="scope.row" :src="require(`../../server/${scope.row.image.replace(/\\/g, '\/')}`)" style="width: 100px;height: 100px;"></template>
    </el-table-column>

    <el-table-column
      label="买家"
      width="70">
      <template slot-scope="scope">{{ scope.row.userName}}</template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="150"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.title}}</template>
    </el-table-column>
    <el-table-column
      label="已支付的价格"
      width="70">
      <template slot-scope="scope">{{ scope.row.onlinePrice}}</template>
    </el-table-column>

    <el-table-column
      label="发货地址"
      width="120"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.address}}</template>
    </el-table-column>
    <el-table-column
      label="发货方式"
      width="120"
      show-overflow-tooltip>
      <template slot-scope="scope">{{scope.row.sendType}}</template>
    </el-table-column>

    <el-table-column
      label="操作"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleSend()">
          {{isSend}}
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button
    type="primary"
    size="mini"
    @click="handleSend()">
    {{isSend}}
  </el-button>
  </div>
</template>

<script>
    import App from "../App";
    export default {
        name: "showOrder",
        components:{App},
        inject:['reload'],
        data(){
            return{
                orders:[],
                multipleSelection: [],
                isSend:'发货',
                is:false
            }
        },

        methods: {
            getALlOrder: function () {
                let self = this;
                self.$http.post('/api/admin/getOrder', {}, {}).then((response) => {
                    console.log(response);
                    if (response.data == -1) {
                        console.log('没有任何订单');
                        this.$message({
                            message: '没有任何订单',
                            type: "success"
                        })
                    } else if (response.status == 200) {
                        console.log('查找成功');
                        this.orders = response.data;
                        console.log(this.orders)

                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleDelete(id) {
                this.$Modal.confirm({
                    title: '管理员您确认要删除',
                    content: '<p>确定删除此商品</p>',
                    onOk: () => {
                        this.$http.post('/api/admin/deleteOrder', {id: id}, {}).then((response) => {
                            if (response) {
                                if (response.status === 200) {
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success'
                                    })
                                    this.reload();
                                }
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            },
            handleSend(){
                this.$message({
                    message:'发货成功',
                    type:'success'
                })
               this.is=true
                   this.isSend='已发货'

            }
        },
        mounted() {
            this.getALlOrder()
        }
    }
</script>

<style scoped>

</style>
