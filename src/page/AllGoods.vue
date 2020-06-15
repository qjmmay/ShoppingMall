<template>
  <div class="container">
    <Header></Header>
   <div class="main">
       <ul class="rec-list">
         <li class="rec-card" v-for="(item,key) in AllGoods" :key="key">
           <!--:src="item.cover图片拼接-->
           <img class="rec-media" :src="require(`../../server/${item.image.replace(/\\/g, '\/')}`)">
           <div class="rec-profile">
             <span style="font-size: 16px;font-weight: bold;">{{item.title}}</span>
             <p class="rec-params">
               原价：<span class="rec-price">￥{{item.price}}</span>
               促销价：<span class="rec-online-price">￥{{item.onlinePrice}}</span>
             </p>
             <p>商品数量：{{quantity}}</p>
             <p>{{item.description}}</p>
             <p>发货地址：{{item.address}}</p>
             <p>送货方式：{{item.sendType}}</p>
           </div>
           <div class="banner-operate">
        <span
          class="btn-operate btn-buy"
          @click="addInOrder(item.title,item.onlinePrice)">
          立即购买
        </span>
             <span
               class="btn-operate btn-cart"
               @click="addInCart(item)">
          <i class="fa fa-shopping-cart"></i>
          &nbsp;加入购物车
        </span>
           </div>
         </li>
       </ul>
   </div>
  </div>
</template>

<script>
    import Header from "../components/Header"
    export default {
        name: "AllGoods",
        components:{Header},
        data(){
            return{
                isLogin:false,
                AllGoods:[{
                    title:'',
                    description:'',
                    price:'',
                    onlinePrice:'',
                    inventory:'',
                    address:'',
                    sendType:'',
                    image:'',
                }],
                quantity:1,
                multipleSelection: []
            }
        },
        methods: {
            getALlGoods: function () {
                let self = this;
                self.$http.post('/api/admin/getGoodsInfo', {}, {}).then((response) => {
                    console.log(response);
                    if (response.data == -1) {
                        console.log('没有存储任何物品');
                        this.$message({
                            message: '没有存储任何商品',
                            type: "success"
                        })
                    } else if (response.status == 200) {
                        console.log('查找成功');
                        this.AllGoods = response.data;
                        console.log(this.AllGoods)
                        let result = response.data;
                        self.AllGoods.title = result.title;
                        self.AllGoods.description = result.description;
                        self.AllGoods.price = result.price;
                        self.AllGoods.onlinePrice = result.onlinePrice;
                        self.AllGoods.inventory = result.inventory;
                        self.AllGoods.address = result.address;
                        self.AllGoods.sendType = result.sendType;
                        self.AllGoods.image = result.image;
                    }
                })
            },
            addInOrder: function (title,total) {
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
            addInCart:function (item) {
                let self=this;
                let userName=sessionStorage.getItem("userName")
                console.log('标题'+item.title+'数量+'+self.quantity)
                let result={
                    userName:userName,
                    title:item.title,
                    onlinePrice:item.onlinePrice,
                    quantity: self.quantity,
                    image:item.image
                }
                self.$http.post('/api/user/addCart',result,{}).then(function (response) {
                    console.log(response);
                    console.log('成功');
                    this.$message({
                        message: '添加成功，在购物车查看，亲~~',
                        type: 'success'
                    });
                }).then(function(error) {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.getALlGoods()
        }
    }
</script>

<style scoped>
  .container {
    width: 100%;
   overflow: hidden;
  }
  .main{
  }

  .rec-list{
   /* border-top: 1px solid #cccccc;*/
    list-style: none;
  }
  .rec-card{
    display: inline-block;
    cursor: pointer;
    width:30%;
    text-align: center;
    vertical-align: top;
    border: 1px solid lightgray;
    margin-bottom: 25px;
  }
  .rec-media{
    width:300px;
    height:300px;
  }
  .rec-profile{
    display: inline-block;
    color: #444;
    margin:20px 0;
  }
  .rec-params{
    color:#888;
    font-size: 14px;
    margin: 12px;
  }
  .rec-price{
    text-decoration: line-through;
  }
  .rec-online-price{
    font-size: 16px;
    color:#ff0036;
  }
  .btn-operate {
    width: 150px;
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

</style>
