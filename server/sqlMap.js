//sql语句
//SQL 语句映射文件，供 API 调用
var sqlMap = {
  // 用户
  user: {
    add: 'insert into LoginMall(id,username,password,userMail,userPhone,address) values(0,?,?,?,?,?)',
    select_name: 'select * from LoginMall',
    update_user: 'update LoginMall set',
    delete_user:'delete from LoginMall'
  },
  recGoods:{
    add:'insert into recommand(id,title,price,onlinePrice) values(0,?,?,?)',
    select_recGoods:'select * from recommand',
    update_recGoods:'update recommand set',
  },
  cart:{
    add:'insert into goodsCart(id,userName,title,onlinePrice,quantity,image) value(0,?,?,?,?,?)',
    select_cart:'select * from goodsCart',
    update_cart:'update goodsCart set',
    delete_cart:'delete from goodsCart'
  },
  AllGoods:{
    add:'insert into AllGoods(id,title,description,price,onlinePrice,inventory,image,address,sendType) values(0,?,?,?,?,?,?,?,?)',
    select_allGoods:'select * from AllGoods',
    update_allGoods:'update AllGoods set',
    delete_allGoods:'delete from AllGoods'
  },
  order:{
    add:'insert into oder(id,userName,title,image,onlinePrice,address,sendType) value(0,?,?,?,?,?,?)',
    select_order:'select * from oder',
    delete_order:'delete from oder',
  }
}
module.exports = sqlMap;
