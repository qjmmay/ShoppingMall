<template>
  <div id="app">
    <!--Body-Parser中间件进行前端请求参数的获取 -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
    provide(){
      return {
          reload:this.reload
      }
    },
    data(){
      return{
          isRouterAlive:true
      }
    },
    methods:{
      reload(){
          this.isRouterAlive=false;
          this.$nextTick(function () {
              this.isRouterAlive=true;
          })
      }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
