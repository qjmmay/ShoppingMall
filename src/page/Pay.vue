<template>
  <div>
    <div class="pay-container">
     <Header></Header>
      <Alert show-icon>
        扫码支付
        <Icon type="qr-scanner" slot="icon"></Icon>
        <template slot="desc">请点击右边二维码进行支付</template>
      </Alert>
      <span style="font-size: 30px;text-align: center">待支付:{{this.$route.params.price}}</span>
      <div class="pay-box">
        <div class="pay-demo">
          <img src="../../static/image/pay-demo.png">
        </div>
        <div class="pay-qr-scan">
          <img src="../../static/image/pay-qrscan.png">
          <div class="pay-tips">
            <router-link to="/PaySuccess"><p>点击我, 完成支付</p></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "Pay",
        components:{Header},

    }
</script>

<style scoped>
  .pay-container {
   /* margin: 15px auto;*/
    width: 100%;
    min-width: 1000px;
  }
  .pay-box {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pay-demo {
    width: 50%;
    height: 100%;
    /*"弹性布局*/
    display: flex;
    /*元素在主轴（页面）上的排列元素在主轴（页面）上的排列*/
    justify-content: center;
    /* 弹性盒子元素在该行的侧轴（纵轴）上居中放置*/
    align-items: center;
  }
  .pay-demo img{
    height: 80%;
  }
  .pay-qr-scan {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pay-tips {
    width: 50%;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
  }
  .pay-tips p{
    color: #999999;
  }
  .pay-tips p:hover{
    color:springgreen;
  }
</style>
