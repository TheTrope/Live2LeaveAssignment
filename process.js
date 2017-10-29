let Basket = require("./Dbo/Basket.js")
let Db = require('./Db.js');
let ObjectId = require('mongodb').ObjectId;
let db = new Db();

function init(){
  return db.init();
}

function createBasket(){
  return function(resolve, reject){
    let id = db.baskets.insertOne({items: [], checkout: false}, function(err, result){
      if (err)
        reject(err);
      resolve({basketId: result.insertedId});
    });
  }
}



function getBasket(basket_id){
  return function(resolve, reject){
    let id = db.baskets.findOne({_id : new ObjectId(basket_id)}, function(err, result){
      if (err)
        reject(err);
      resolve({basketId: result});
    });
  }
}


module.exports = {
  createBasket,
  getBasket,
  init
  };
