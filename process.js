let Db = require('./Db.js');
let ObjectId = require('mongodb').ObjectId;
let db = new Db();

function init(){
  return db.init();
}

function createBasket(){
  return function(resolve, reject){
    let id = db.baskets.insertOne({items: {}, checkout: false}, (err, result) => {
      if (err)
        reject(err);
      resolve({basketId: result.insertedId});
    });
  }
}



function getBasket(basket_id){
  return function(resolve, reject){
    let id = db.baskets.findOne({_id : new ObjectId(basket_id)}, (err, result) => {
      if (err)
        reject(err);
      resolve({basketId: result});
    });
  }
}

function addToBasket(basket_id, items){
  return function(res, reject){
    let p = new Promise((resolve, reject) =>{
      db.baskets.findOne({_id : new ObjectId(basket_id)}, (err, result) => {
        if (err)
          reject(err);
        if (result.checkout)
          resolve({"Error" : "Basket is already checkout"});
        resolve(result);
      });
    }).then((basket) =>{

      // TODO : Secure check if item exists, quantity is int
      for (var it in items){
        if (basket.items.hasOwnProperty(it))
          basket.items[it] += items[it];
        else
          basket.items[it] = items[it];
      }
      db.baskets.updateOne({_id : new ObjectId(basket_id)}, {$set : {"items": basket.items}}, (err, result) =>{
        if (err)
        rej(err);
        res(basket);
      });

    }).catch((err) =>{
      console.log(err);
    })
  }
}




function addOrReplaceProduct(product){
  return function(resolve, reject){
    db.products.update({name : product.product.name}, product, {upsert: true}, function(err, val){
      if (err)
      reject(err);
      resolve(val)
    });
  }
}


function checkoutBasket(basket_id){
  return function(res, rej){
    let basket_promise = new Promise((resolve, reject) =>{
      db.baskets.findOne({_id : new ObjectId(basket_id)}, (err, result) => {
        if (err)
          reject(err);
        resolve(result);
      });
    });
    let product_promise = new Promise((resolve, reject) =>{
      db.products.find({}).toArray((err, result) => {
        if (err)
          reject(err);
        resolve(result);
      });
    });

    Promise.all([basket_promise, product_promise]).then((values) =>{
      let basket = values[0];
      let products = values[1];
      let product_obj = {};
      let totalprice = 0;
      for (var p in products){
        product_obj[products[p].product.name] = products[p].product;
      }
      // TODO : Secure check if item exists, quantity is int
      for (var it in basket.items){
        if (product_obj.hasOwnProperty(it)){
          let price = product_obj[it].price;
          let pack = product_obj[it].pack;
          let nb = basket.items[it];
          let pricepromo = Math.floor(nb / pack.number) * (pack.for * price);
          pricepromo += (nb % pack.number) * price;
          totalprice += pricepromo;
        }
      }
      db.baskets.updateOne({_id : new ObjectId(basket_id)}, {$set : {checkout: true}}, (err, result) =>{
        if (err)
          rej(err);
        basket.checkout = true;
        res({"basket": basket, "totalPrice" : totalprice});
      });

    }).catch((err) =>{
      console.log(err);
    })
  }

}

module.exports = {
  createBasket,
  getBasket,
  addToBasket,
  checkoutBasket,
  addOrReplaceProduct,
  init
};
