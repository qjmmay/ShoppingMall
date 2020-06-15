<template>
    <div>
     <!-- <Header></Header>-->
      <div class="container">
      <div class="left">
        <img :src="require(`../../server/${goods.image.replace(/\\/g, '\/')}`)">
      </div>
      <div class="right">
          <Form ref="goods" :model="goods" :label-width="80"class="registerForm">
            <FormItem label="商品名称" prop="title">
              <Input v-model="goods.title" placeholder="请输入用户名称" type="text"/>
            </FormItem>
            <FormItem label="商品描述" prop="description">
              <Input v-model="goods.description" placeholder="请输入商品描述"  type="textarea"/>
            </FormItem>
            <FormItem label="价格" prop="price">
              <Input v-model="goods.price" placeholder="请输入商品价格"  type="number"/>
            </FormItem>
            <FormItem label="折扣价" prop="onlinePrice">
              <Input v-model="goods.onlinePrice" placeholder="请输入折扣价"  type="number"/>
            </FormItem>
            <FormItem label="库存量" prop="inventory">
              <Input v-model="goods.inventory" placeholder="请输入库存量"  type="number"/>
            </FormItem>
            <FormItem label="发货地址" prop="address">
              <Input v-model="goods.address" placeholder="请输入发货地址"  type="text"/>
            </FormItem>
            <FormItem label="发货方式" prop="sendType">
              <Input v-model="goods.sendType" placeholder="请输入发货方式"  type="text"/>
            </FormItem>
        </Form>
      </div>
        <div class="footer">
          <el-button type="primary" size="large" @click="ModifyGoods('goods')" style="margin-top: 400px;margin-right: 30px;">提交修改</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "EditGoods",
        components:{Header},
        data(){
            return{
                goods:{
                    title:'',
                    description:'',
                    price:'',
                    onlinePrice:'',
                    inventory:'',
                    image:'',
                    address:'',
                    sendType:''
                }
            }
        },
        methods:{
            getGoods:function(){
                let id=this.$route.params.id
                console.log('参数'+id);
               this.$http.post('/api/admin/getGoodsInfo',{id:id},{}).then((response) => {
                    console.log(response);
                    if (response.data === -1) {
                        console.log('查找失败');
                    } else if (response.status === 200) {
                        console.log('查询成功');
                        console.log(response.data[0]);
                        let result=response.data[0];
                        let id=result.id;
                        sessionStorage.setItem('id',id);
                        this.goods.title=result.title;
                        this.goods.description=result.description;
                        this.goods.price=result.price;
                        this.goods.onlinePrice=result.onlinePrice;
                        this.goods.inventory=result.inventory;
                        this.goods.image=result.image
                        this.goods.address=result.address
                        this.goods.sendType=result.sendType
                    }
                })
            },
            ModifyGoods(formName){
                const self=this;
                let goodsData={
                    id:sessionStorage.getItem('id'),
                    title:this.goods.title,
                    description:this.goods.description,
                    price:this.goods.price,
                    onlinePrice:this.goods.onlinePrice,
                    inventory:this.goods.inventory,
                    address:this.goods.address,
                    sendType:this.goods.sendType
                }
                self.$http.post('/api/admin/UpdateGoods',goodsData).then(function(response){
                    console.log(response);
                    console.log('更新成功');
                    this.$message({
                        message:'更新成功',
                        type:"success"
                    })
                    self.$router.push('/AdminPage');
                }).then(function (error) {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.getGoods()
        }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 500px;
    background-image: url("../../static/image/shop1.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
  }
.left{
  float: left;
  width: 40%;
 padding: 30px 80px;
  margin-left: -70px;
}
.left,.right{

}
.footer{
  float: right;
}
.left img{
  width: 300px;
  height: 300px;
}
  .right{
    float: left;
    width: 50%;
    padding: 30px;
  }
</style>
