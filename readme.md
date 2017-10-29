
# Live2Leave Assignment

* Listening on localhost:4242
* persistency : MongoDb
* Start server: npm start

## Api


### Create a basket

* /api/create
* Returns basket identifier


### Get a basket

* Get /api/get/
* Params id
* Returns {basket}

### Add/update a basket

* Post /api/add
* Params basket_id, items

Items example:  
```
{
  "Banana" : 2,
  "Apple" : 3
}
```

### Checkout

* Post /api/checkout
* Params id
* Returns {basket, price}


### Add or update product

* Post /api/add_replace_product
* Param product
* Product example :
```
{
    "product": {
        "name": "Green apple",
        "price": 30,
        "pack": {
            "number": 3,
            "for": 2
        }
    }
}
```


## With more time ...

I would like to add more check on values, e.g. in the actual state, is it allowed to add products in the basket with float values, or add unknown products names.
In addition, a data-visualisation of the database would be great.
MongoDb is a wrong choice here, I just toot advantage of the situation to learn the MongoDb-Node driver.
