
let Db = require("../Db.js");
class Basket{
  __contructor__(){
    this.id = null;
    this.items = [];
    this.checkout = false;
  }

  init(id, items, chk){
    this.id = id;
    this.items = items;
    this.checkout = chk;
  }

  fromDb(data){
    this.id = data.id;
    this.items = data.items;
    this.checkout = data.checkout;
  }

  getData(){
    return {_id : this.id, items: this.items, checkout: this.checkout};
  }


}


module.exports = Basket;
