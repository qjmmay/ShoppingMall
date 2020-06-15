<template>
  <div class="container">
    <Header></Header>
    <span v-if="errorInfo" v-show="showInfo"></span>
    <div class="container-left" >
      <img :src="require(`../../server/${goodList.image.replace(/\\/g, '\/')}`)">
      <span hidden>{{goodList.image}}</span>
    </div>

    <div class="container-right">
    <h2>{{ goodList.title }}</h2>
    <div class="banner-price">
      <p class="params-item">
        <span class="params-label">价格</span>
        <span class="price-delete">￥{{ goodList.price }}</span>
      </p>
      <p>
        <span class="params-label">促销价</span>
        <span class="price-strong">￥{{ goodList.onlinePrice }}</span>
      </p>
    </div>
    <div class="banner-params">
      <p class="params-item"><span class="params-label">发货地</span>{{ goodList.address }}</p>
      <p class="params-item"><span class="params-label">快递方式</span>{{ goodList.sendType }}</p>
    </div>
    <div class="banner-quantity">
      <label style="margin-right: 20px;">数量</label>
      <input
        class="ipt-quantity"
        v-model="quantity"
        type="number"
        min=1
        >
    </div>
    <div class="banner-operate">
        <span
          class="btn-operate btn-buy"
          @click="addInOrder(goodList.title,goodList.onlinePrice)">
          立即购买
        </span>
      <span
        class="btn-operate btn-cart"
        @click="addInCart">
          <i class="fa fa-shopping-cart"></i>
          &nbsp;加入购物车
        </span>
    </div>
    <br>
    <div class="banner-state">
      <p class="params-item">
        <span class="params-label">服务承诺</span>
        <span class="params-label deep-gray">正品保证</span>
        <span class="params-label deep-gray">极速退款</span>
        <span class="params-label deep-gray">赠运费险</span>
        <span class="params-label deep-gray">七天无理由退换</span>
      </p>
    </div>
  </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "GoodList",
        components:{Header},
        data(){
            return{
                errorInfo: false,
                errInfo:'',
              goodList:{
                    id:'',
                  title:'',
                  price:'',
                  onlinePrice:'',
                  address:'',
                  sendType:'',
                  image:''
              },
                quantity:1
            }
        },
        computed:{

        },
        methods:{
            getGoodList:function () {
                console.log('参数')
                let self=this;
                let title=this.$route.params.title
                console.log(title);
                self.$http.post('/api/user/getRecGoods',{title:title},{}).then((response) =>{
                  console.log(response);
                  if(response.data===-1){
                      console.log('查找失败');
                  }else if(response.status===200){
                      console.log('查找成功');
                      console.log(response.data[0]);
                      let result=response.data[0];
                      this.goodList.id=result.id;
                      this.goodList.title=result.title
                      this.goodList.price=result.price;
                      this.goodList.onlinePrice=result.onlinePrice;
                      this.goodList.address=result.address;
                      this.goodList.sendType=result.sendType;
                      this.goodList.image=result.image;
                  }
                })
            },
            addInOrder:function (title,total) {
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
           showInfo() {
                this.$message({
                    message: '添加成功，在购物车查看，亲~~',
                    type: 'success'
                });
            },

            addInCart:function () {
                let userName=sessionStorage.getItem("userName")
              let result={
                title:this.goodList.title,
                 userName:userName,
                quantity:this.quantity,
                onlinePrice:this.goodList.onlinePrice,
                  image:this.goodList.image
              };
              this.$http.post('/api/user/addCart',result,{}).then(function (response) {
                  console.log(response);
                  console.log('成功');
                  this.errorInfo=true;
                  this.showInfo();
              }).then(function(error) {
                  console.log(error);
              })
            }
        },
        mounted() {
            this.getGoodList();
        }
    }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 500px;
  }
  .container-left{
    padding-top: 50px;
    width: 42%;
    float: left;

  }
  .container-left img{
    height: 450px;
  }
  .container-right {
    padding-top: 50px;
    overflow: hidden;
    float:right;
  }
  .banner-price,
  .banner-params,
  .banner-quantity,
  .banner-operate,
  .banner-state {
    padding: 5px 12px;
    margin-top: 18px;
  }
  .banner-price {
    margin-right: 80px;
    color: #333;
    background-color: #e9e9e9;
  }
  .price-delete {
    text-decoration: line-through;
  }
  .price-strong {
    font-weight: 600;
    font-size: 24px;
    color: #ff0036;
  }
  .params-item {
    line-height: 24px;
  }
  .params-label {
    display: inline-block;
    min-width: 75px;
    color: #999;
    font-size: 12px;
  }
  .ipt-quantity {
    width: 120px;
    padding-left: 10px;
    line-height: 32px;
    outline: none;
    border: 1px solid #ccc;
  }
  .btn-operate {
    width: 200px;
    display: inline-block;
    cursor: pointer;
    line-height: 36px;
    text-align: center;
    border: 1px solid #95bf47;
    user-select: none;
    /*控制页面文字不能被选中,html防止被复制*/
  }
  .btn-cart {
    color: #fff;
    background-color: #95bf47;
  }
  .btn-buy {
    color: #95bf47;
    background-color: rgba(149, 191, 103, .1);
  }
  .deep-gray {
    color: #777;
  }

</style>
