/** INIT **/

let express = require('express');
let app = express();

let myProcess = require("./process.js");

let bodyParser = require('body-parser');
app.use(bodyParser.json());



/* Collect arr_name data and check if all fields exists */
function collect(arr_name, arr_err, jsonData){
    let dataCollector = {};
    arr_name.forEach(function (name) {
        dataCollector[name] = jsonData[name];
    });
    for (let data in dataCollector){
        if (dataCollector.hasOwnProperty(data) && (dataCollector[data] === undefined || dataCollector[data] === null))
            arr_err.push(data);
    }
    return dataCollector;
}

myProcess.init().then((val) => {
  handleRequests();
}).catch((val)=>{
  console.log("Err ->" + val);
});
/** END  INIT **/



function handleRequests(){

  console.log("Server ready");
  app.listen(4242);

  app.post('/api/create', (req, res) => {
      let p = new Promise(myProcess.createBasket()).then((ret) =>{
        res.status(200).send(ret);
      }).catch((err) =>{
        /* Err handler */
        console.log("Err")
      });
  });


  app.get('/api/get', (req, res) => {
      let arr_name = ["basket_id"];
      let arr_err = [];
      let dataCollector = collect(arr_name, arr_err, req.query);
      if (!arr_err.length){
          let p = new Promise(myProcess.getBasket(dataCollector.basket_id)).then((ret) =>{
            res.status(200).send(ret);
          }).catch((err) =>{
          /* Err handler */
            console.log("Err");
          });
      } else {
          /* Err handler */
          res.status(500).send('Something broke!');
      }
  });

  app.post('/api/add', (req, res) => {
      let arr_name = ["basket_id", "items"];
      let arr_err = [];
      let dataCollector = collect(arr_name, arr_err, req.query);
      if (!arr_err.length){
        let p = new Promise(myProcess.addToBasket(dataCollector.basket_id, JSON.parse(dataCollector.items))).then((ret) =>{
          res.status(200).send(ret);
        }).catch((err) =>{
          /* Err handler */
          console.log("Err");
        });
      } else {
          /* Err handler */
          res.status(500).send('Something broke!');
      }
  });

}
