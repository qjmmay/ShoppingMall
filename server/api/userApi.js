//测试用 API 示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');


// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {

  if (typeof ret === 'undefined') {
    res.send('err');
  } else {
    console.log(ret);
    res.send(ret);
  }
};
var dateStr = function(str) {
  return new Date(str.slice(0,7));
}
// 增加用户接口
router.post('/register', (req, res) => {
  let sql = $sql.user.add;
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.username, params.password,params.userMail,params.userPhone,params.address], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//用户登录
router.post('/login', (req, res) => {
  var sql_name = $sql.user.select_name;
  var params = req.body;
  console.log(params);
  if (params.username) {
    sql_name += " where username ='"+ params.username +"'";
  }
  conn.query(sql_name, params.username, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      res.send('-1')   //查询不出username，data 返回-1
    } else {
      var resultArray = result[0];
     console.log(result[0]);
      if(resultArray.password=== params.password) {
        console.log(resultArray.username);
        if(resultArray.username==='覃金梅'){
          res.send('1');
        }else {
          jsonWrite(res, result);
        }
      } else {
        res.send('0')   //username
      }
    }
  })
});
//获取用户信息
router.post('/getUserInfo',(req, res) => {
  var sql_name = $sql.user.select_name;
  var params = req.body;
  console.log(params);
  if (params.username) {
    sql_name += " where username ='"+ params.username +"'";
  }
  conn.query(sql_name, params.username, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出username，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});
//更新用户信息
router.post('/UpdateUser',(req,res)=>{
  var sql_update=$sql.user.update_user;
  var params=req.body;
  console.log(params);
  if(params.id) {
    sql_update  +=
      " userMail= '" + params.userMail +
      "',userPhone = '" + params.userPhone +
      "',address = '" + params.address +
      "' where id ='"+ params.id + "'";

  }
  conn.query(sql_update,params.id,function (err,result) {
    if(err){
      console.log(err);
    }
    console.log(result);
    if(result.affectedRows===undefined){
      res.send('更新失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});
//更改密码
router.post('/modifyPassword',(req,res)=>{
  var sql_modify=$sql.user.update_user;
  var params=req.body;
  console.log(params);
  if(params.id){
    sql_modify+=" password = '" + params.password +
      "' where id ='"+ params.id + "'";
  }
  conn.query(sql_modify,params.id,function(err,result){
    if(err){
      console.log(err);
    }
    if(result.affectedRows===undefined){
      res.send('修改密码失败，请联系管理员');
    }
    else{
      res.send('OK');
    }
  })
});
//获取推荐商品信息
router.post('/getRecGoods',(req,res)=>{
  var sql_name = $sql.recGoods.select_recGoods;
  var param = req.body;
  console.log(param);

  if (param.title) {
    sql_name += " where title ='"+ param.title +"'";
  }
  conn.query(sql_name,param.title,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出username，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});
//添加物品进入购物车
router.post('/addCart', (req, res) => {
  let sql = $sql.cart.select_cart;
  let params =req.body;
  console.log('所有加入购物车'+params);
  console.log("物品名字"+params.title)
  if(params.title){
    sql += " where title ='"+ params.title +"'";
  }
  conn.query(sql, params.title, function(err, result) {
    if (err) {
      console.log("失败" + err);
    }
    console.log(result)
     /* console.log('result不为空')
      console.log('params标题'+params.title)
      console.log('result标题'+result[0].title)*/
     console.log("是否存在"+result[0]===undefined)
      if(result[0]===undefined){
        let sql_add=$sql.cart.add;
        conn.query(sql_add, [ params.userName,params.title,params.onlinePrice,params.quantity,params.image], function(err, result1) {
          if (err) {
            console.log("添加失败"+err);
          }
          if (result1) {
            jsonWrite(res, result1);
          }
        })
      }
      else {
        console.log('存在')
        let sql_update = $sql.cart.update_cart;
        result[0].quantity += params.quantity;
        console.log('quantity:'+result[0].quantity)
        if (result[0].title) {
          sql_update += " quantity = '" + result[0].quantity +
            "' where title='" + result[0].title + "'";
        }
        conn.query(sql_update, result[0].title, function (err, result2) {
          if (err) {
            console.log('失败'+err);
          }
          if (result2.affectedRows === undefined) {
            res.send('加入购物车失败，请联系管理员');
          } else {
            res.send('OK');
          }
        })
      }

  })
});
//获得购物车信息
router.post('/getCart',(req, res) => {
  var sql_name = $sql.cart.select_cart;
  var params = req.body;
  console.log(params);
  if (params.userName) {
    sql_name += " where userName='"+ params.userName +"'";
  }
  conn.query(sql_name, params.userName, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出username，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});
//删除购物车信息
router.post('/deleteGoods',(req, res) => {
  var sql_name = $sql.cart.delete_cart;
  var params = req.body;
  console.log(params);
  console.log(params.id);
  if (params.id) {
    sql_name += " where id ='"+ params.id +"'";
  }
  conn.query(sql_name, params.id, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log('删除成功');
      jsonWrite(res, result);
    }
  })
});
module.exports = router;
