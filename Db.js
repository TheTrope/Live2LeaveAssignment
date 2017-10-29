
var MongoClient = require('mongodb').MongoClient,
    co = require('co'),
    assert = require('assert');
class Db{

  __constructor__(){
  }

  init(){

    return new Promise((resolve, reject) => {
      var ths = this;
      co(function*() {
        let url = 'mongodb://user:pass@ds229435.mlab.com:29435/assignment';
        ths.db = yield MongoClient.connect(url);
        ths.products = ths.db.collection('Product');
        ths.baskets = ths.db.collection('Basket');
        resolve(ths);
      }).catch(function(err) {
        reject(err);
        console.log(err.stack);
      });
    });
  }
}

module.exports = Db;
