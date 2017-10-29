
# Live2Leave Assignment

* Listening on localhost:4242
* persistency : MongoDb

## Api


### Create a basket

/api/create  -> returns basket identifier


### Get a basket

* Get /api/get/ {id}
* Returns {basket}

### Add/update a basket

* Post /api/add {items}

Items example:  
```
{
  "Banana" : 2,
  "Apple" : 3
}
```

### Checkout

* Post /api/checkout {id}
* Returns {basket, price}


### Add or update product

Post /api/add_replace_product {product}
Product example :
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
