<template>
  <div>
  <!--  <Header></Header>-->
    <div class="form">
      <label>封面照：</label>
      <input type="file" value="" />
    <Form ref="Goods" :model="Goods" :label-width="80"class="form-add" >
      <FormItem label="商品名称" prop="title">
        <Input v-model="Goods.title" placeholder="请输入商品名称" type="text"/>
      </FormItem>
      <FormItem label="商品描述" prop="description">
        <Input v-model="Goods.description" placeholder="请给商品做描述"  type="textarea"/>
      </FormItem>
      <FormItem label="价格" prop="price">
        <Input v-model="Goods.price" placeholder="请输入原先商品价格"  type="number"/>
      </FormItem>
      <FormItem label="折扣价" prop="onlinePrice">
        <Input v-model="Goods.onlinePrice" placeholder="请输入折扣价"  type="number"/>
      </FormItem>
      <FormItem label="库存量" prop="inventory">
        <Input v-model="Goods.inventory" placeholder="请输入库存量"  type="number"/>
      </FormItem>
      <FormItem label="图片" prop="image">
      <Input type="text" v-model="Goods.image" placeholder="请输入图片的相对地址"></Input>
      </FormItem>
      <FormItem label="发获地址" prop="address">
        <Input type="text" v-model="Goods.address" placeholder="请输入地址"></Input>
      </FormItem>
      <FormItem label="送货方式" prop="sendType">
        <Input type="text" v-model="Goods.sendType" placeholder="请输入送货方式"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" style="width: 300px" @click="addGoods('Goods')">确认添加此商品</Button>
      </FormItem>
    </Form>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
    export default {
        name: "AddGoods",
        components:{Header},
        data(){
            return{
                Goods:{
                 title:'',
                 description:'',
                 price:'',
                 onlinePrice:'',
                 inventory:'',
                 image:''
                },

            }
        },
        methods:{
            addGoods(goods){
                this.Goods.image=sessionStorage.getItem('picture')
               this.$http.post('/api/admin/addGoods',this.Goods).then(function(response){
                    console.log(response);
                    console.log('添加成功');
                    this.$message({
                        message:'恭喜您，商品添加成功~~~~~,请查看',
                        type:"success"
                    })
                   this.reload()
                    this.$router.push('/AddGoods');
                }).then(function (error) {
                    console.log(error);
                })
            }

        },
        mounted: function () {
            // js
            var Input = document.querySelector("input");
            Input.onchange = function upload(){
                var files = !!this.files ? this.files : [];
                if (!files.length || !window.FileReader) {
                    console.log("浏览器不支持HTML5");
                    return false;
                };
                // 创建一个FormData对象,用来组装一组用 XMLHttpRequest发送请求的键/值对
                var fd = new FormData();
                // 把 input 标签获取的文件加入 FromData 中
                fd.append('file', files[0]);


                /* this.$http.post('/api/upload/load', fd, {}).then((response) => {
                         if (response.status === 200) {
                             console.log('上传成功')
                         } else {
                             console.log('上传失败')
                         }
                     });*/
                var request = new XMLHttpRequest();
                request.open("POST", "/api/admin/addPicture");
                request.send(fd);
                request.onreadystatechange = function(){
                    if(request.readyState === 4 & request.status === 200){
                        console.log("上传成功");
                        var response = JSON.parse(request.responseText);
                        console.log(response);
                        sessionStorage.setItem('picture',response.url)
                    }
                }
            }

        },
    }
</script>

<style scoped>
.form-add{
  width: 500px;
  margin-top: 20px;
  margin-left: 250px;
}
  .form{
   background-image: url("../../static/image/shop1.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
  }
</style>
