<template>
  <div>
    <Header></Header>
  <el-table
    ref="multipleTable"
    :data="cart"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
   >
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      label="商品图片"
      width="200">
      <template slot-scope="scope"><img v-if="scope.row" :src="require(`../../server/${scope.row.image.replace(/\\/g, '\/')}`)" style="width: 120px;height: 120px;"></template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="300">
      <template slot-scope="scope">{{ scope.row.title }}</template>
    </el-table-column>
    <el-table-column
      prop="onlinePrice"
      label="单价"
      width="120">
      <template slot-scope="scope">{{ scope.row.onlinePrice}}</template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="200"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-input type="number" class="input-quantity" v-model="scope.row.quantity"/>
      </template>
    </el-table-column>
    <el-table-column
    label="金额"
    width="150"
    show-overflow-tooltip>
      <template slot-scope="scope">{{(scope.row.onlinePrice)*(scope.row.quantity)}}</template>
    </el-table-column>
    <el-table-column
    label="操作"
   >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="handleBuy( scope.row.title,((scope.row.onlinePrice)*(scope.row.quantity)))">立即购买</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <div class="pay-container">
    <div class="pay-box">
      <p><span>提交订单应付总额：</span> <span class="money"><Icon type="social-yen"></Icon> {{totalPrice.toFixed(2)}}</span></p>
      <div class="pay-btn">
        <div v-if="isPrice"><Button type="error" size="large" @click="Buy()">支付订单</Button></div>
        <div hidden v-else><Button type="error" size="large" @click="Buy()">支付订单</Button></div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
  import App from "../App";
  import Header from "../components/Header";
    export default {
        name: "Cart",
        inject:['reload'],
        components:{App,Header},
        data(){
            return{
                isPrice:false,
                cart:[{
                    id:'',

                  title:'',
                  onlinePrice:'',
                  quantity:'',
                    image:''
              }],
                multipleSelection: []
            }
        },
        computed:{
           totalPrice () {
                let price = 0;
                this.isPrice=false;
                this.multipleSelection.forEach(item => {
                    price += item.onlinePrice * item.quantity;
                });
                if(price>0){
                    this.isPrice=true;
                }
                sessionStorage.setItem('price',price);
                return price;
            }
        },
        methods:{
            getCart:function () {
                let self=this;
                let userName=sessionStorage.getItem("userName")
                console.log(userName)
                self.$http.post('/api/user/getCart',{userName:userName},{}).then((response) => {
                    console.log(response);
                    if(response.data==-1){
                        console.log('购物车为空');
                    }
                    else if(response.status==200){
                        console.log('查找成功');
                        this.cart = response.data;
                        console.log(this.cart)
                        let result = response.data;
                        self.cart.id=result.id;
                        self.cart.title=result.title;
                        self.cart.onlinePrice=result.onlinePrice;
                        self.cart.quantity=result.quantity;
                        self.cart.image=result.image;
                    }
                })
            },
            /*选择多行*/
          /*  toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },*/
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showInfo() {
                this.$message({
                    message: '删除成功，亲~~',
                    type: 'success'
                });
            },
          Buy(title){
                let result=sessionStorage.getItem('price');
               /* console.log("title:"+title)
              self.$http.post('/api/user/getRecGoods',{title:title},{}).then((response) =>{
                  console.log(response);
                  if(response.data===-1){
                      console.log('查找失败');
                  }else if(response.status===200){
                      console.log('查找成功');
                      console.log(response.data[0]);
                      let result=response.data[0];
                      let userName=sessionStorage.getItem('userName')
                      let title=result.title
                     let onlinePrice=result.onlinePrice;
                      let address=result.address;
                     let sendType=result.sendType;
                     let image=result.image;
                     let orderData={
                         userName:userName,
                         title:title,
                         onlinePrice:onlinePrice,
                         address:address,
                         sendType:sendType,
                         image:image
                     }
                    this.$http.post('/api/admin/addOrder',orderData,{}).then((response)=>{
                        if(response){
                            if(response.status===200){
                                console.log("添加order成功")
                            }
                        }
                    })
                  }
              })*/
              this.$router.push({name:'Pay',params:{price:result}});
            },
            handleBuy(title,total){
                console.log("商品名+"+title);
                let self=this
                self.$http.post('/api/user/getRecGoods',{title:title},{}).then((response) =>{
                    console.log(response);
                    if(response.data==='-1'){
                        console.log('推荐物品查找失败查找失败');
                        self.$http.post('/api/admin/getGoodsInfo',{title:title},{}).then((response) =>{
                            if(response){
                                if(response.status===200){
                                    let result=response.data[0];
                                    let userName=sessionStorage.getItem('userName')
                                    let orderData={
                                        userName:userName,
                                        title:title,
                                        onlinePrice:total,
                                        address:result.address,
                                        sendType:result.sendType,
                                        image:result.image
                                    }
                                    console.log("所有商品+"+orderData)
                                    this.$http.post('/api/admin/addOrder',orderData,{}).then((response)=>{
                                        if(response){
                                            if(response.status===200){
                                                console.log("添加order成功")
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }else if(response.status===200){
                        console.log('查找成功');
                        console.log(response.data[0]);
                        let result=response.data[0]
                        console.log(result)
                        let userName=sessionStorage.getItem('userName')
                        let orderData={
                            userName:userName,
                            title:title,
                            onlinePrice:total,
                            address:result.address,
                            sendType:result.sendType,
                            image:result.image
                        }
                        console.log("推荐商品+"+orderData.title+orderData.image+orderData.onlinePrice+orderData.userName+orderData.sendType+orderData.address)
                        this.$http.post('/api/admin/addOrder',orderData,{}).then((response)=>{
                            if(response){
                                if(response.status===200){
                                    console.log("添加order成功")
                                }
                            }
                        })
                    }
                })
                this.$router.push({name:'Pay',params:{price:total}});
            },
            handleDelete(index) {
                console.log('参数' + index);
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确定删除此商品</p>',
                    onOk: () => {
                        this.$http.post('/api/user/deleteGoods', {id: index}, {}).then((response) => {
                            console.log(response);
                            if (response.status === 200) {
                                console.log('删除成功');
                                this.showInfo();
                                this.reload();
                            }
                        })
                    },
                    onCancel: () => {
                        this.$message.info('Clicked cancel');
                    }
                })
            }
        },
        mounted() {
            this.getCart();
        },
    }
</script>

<style scoped>
  .pay-container {
    margin: 15px;
    display: flex;
    justify-content: flex-end;
  }
  .pay-box {
    font-size: 18px;
    font-weight: bolder;
    color: #495060;
  }
  .money {
    font-size: 26px;
    color: #f90013;
  }
  .pay-btn {
    margin: 15px 0px;
    display: flex;
    justify-content: flex-end;
  }
</style>
