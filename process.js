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
      let id = db.baskets.findOne({_id : new ObjectId(basket_id)}, (err, result) => {
        if (err)
          reject(err);
        resolve(result);
      });
    }).then((basket) =>{
      console.log(basket);

      // TODO : Secure check if item exists
      for (var it in items){
        if (basket.items.hasOwnProperty(it))
          basket.items[it] += items[it];
        else
          basket.items[it] = items[it];
      }
      db.baskets.updateOne({_id : new ObjectId(basket_id)}, {$set : {items: basket.items}}, (err, result) =>{
        if (err)
          rej(err);
        res(basket);
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
  init
  };
