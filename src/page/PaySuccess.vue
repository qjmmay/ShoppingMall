<template>
  <div class="contain">
    <Header></Header>
    <div class="pay-done-box">
      <span style="text-align: center;font-size: 24px;font-weight: bold">恭喜你，支付成功</span>
      <img src="../../static/image/pay-success.png">
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "PaySuccess",
        components:{Header}
    }
</script>

<style scoped>
  .pay-done-box {
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
