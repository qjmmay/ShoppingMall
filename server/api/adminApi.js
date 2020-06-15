//测试用 API 示例
var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

var fs = require('fs');
var multer=require('multer')
// 连接数据库
var conn = mysql.createConnection(models.mysql);


// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 接收到文件后输出的保存路径（若不存在则需要创建）
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// 创建文件夹
var createFolder = function(folder){
  try{
    // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
    // 如果文件路径不存在将会抛出错误"no such file or directory"
    fs.accessSync(folder);
  }catch(e){
    // 文件夹不存在，以同步的方式创建文件目录。
    fs.mkdirSync(folder);
  }
};

var uploadFolder = './upload/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });



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
//查询所有商品
router.post('/getGoodsInfo',(req, res) => {
  var sql_name = $sql.AllGoods.select_allGoods;
  var params = req.body;
  console.log(params);
  if (params.id) {
    sql_name += " where id ='"+ params.id +"'";
  }
  conn.query(sql_name, params.id, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出商品，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});


//查询所有商品
router.post('/getGoodsInfo',(req, res) => {
  var sql_name = $sql.AllGoods.select_allGoods;
  var params = req.body;
  console.log(params);
  if (params.title) {
    sql_name += " where title ='"+ params.title +"'";
  }
  conn.query(sql_name, params.title, function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出商品，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});
//管理员删除商品信息
router.post('/deleteAllGoods',(req, res) => {
  var sql_name = $sql.AllGoods.delete_allGoods;
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
//更新商品信息
router.post('/UpdateGoods',(req,res)=>{
  var sql_update=$sql.AllGoods.update_allGoods;
  var params=req.body;
  console.log(params);
  if(params.id) {
    sql_update  +=
      " title= '" + params.title +
      "',description = '" + params.description +
      "',price = '" + params.price +
      "',onlinePrice = '" + params.onlinePrice +
      "',inventory = '" + params.inventory +
      "',address = '" + params.address +
      "',sendType = '" + params.sendType +
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
//添加商品
router.post('/addGoods', (req, res) => {
  let sql = $sql.AllGoods.add
  let params = req.body;
  console.log(params);
  conn.query(sql, [params.title, params.description,params.price,params.onlinePrice,params.inventory,params.image,params.address,params.sendType], function(err, result) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result) {
      jsonWrite(res, result);
    }
  })
});
//添加图书封面
router.post('/addPicture',  upload.single('file'), function(req, res) {
  var file = req.file;
  console.log('文件类型：%s', file.mimetype);
  console.log('原始文件名：%s', file.originalname);
  console.log('文件大小：%s', file.size);
  console.log('文件保存路径：%s', file.path);
  res.json({ res_code: '0', name: file.originalname, url: file.path });
});

//用户管理
//删除用户
router.post('/deleteUser',(req, res) => {
  var sql_name = $sql.user.delete_user;
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
router.post('/editUser',(req,res)=>{
  var sql=$sql.user.select_name;
  var params=req.body;
  console.log(params.id);
  if(params.id){
    sql+="where id='"+params.id+"'";
  }
  conn.query(sql,params.id,function (err,result) {
    if(err){
      console.log(err)
    }
    if(result[0]===undefined){
      console.log('查找失败')
      res.send('-1')
    }else{
      console.log(result[0])
      jsonWrite(res,result)
    }
  })
});

//订单查询
router.post('/getOrder',(req, res) => {
  var sql_name = $sql.order.select_order
  var params = req.body;
  console.log(params);
  conn.query(sql_name,  function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result[0] === undefined) {
      console.log('查找失败');
      res.send('-1')   //查询不出商品，data 返回-1
    }
    else{
      console.log('查找成功');
      jsonWrite(res,result);
    }
  })
});

//删除订单
router.post('/deleteOrder',(req, res) => {
  var sql_name = $sql.order.delete_order
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

//生成订单
router.post('/addOrder', (req, res) => {
  let sql_add = $sql.order.add
  let params = req.body;
  console.log("订单数据"+params.title);

  conn.query(sql_add, [ params.userName,params.title,params.image,params.onlinePrice,params.address,params.sendType], function(err, result1) {
    if (err) {
      console.log("添加失败"+err);
    }
    if (result1) {
      jsonWrite(res, result1);
    }
  })
});
module.exports = router;
