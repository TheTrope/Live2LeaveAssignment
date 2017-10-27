/** INIT **/

let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json());


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


/** END  INIT **/




app.post('/api/create', (req, res) => {
    let arr_name = ["file"];
    let arr_err = [];
    let dataCollector = collect(arr_name, arr_err, req.body);
    if (!arr_err.length){
        console.log(dataCollector.file)
    } else {
        /* Err handler */
        res.status(500).send('Something broke!');
    }
});


app.post('/api/get', (req, res) => {
    let arr_name = ["basket_id"];
    let arr_err = [];
    let dataCollector = collect(arr_name, arr_err, req.body);
    if (!arr_err.length){
        res.status(200).send();
        id = dataCollector.id;
    } else {
        /* Err handler */
        res.status(500).send('Something broke!');
    }
});
