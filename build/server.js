"use strict";
console.log("starting server...");
const Express = require("express");
let app = Express();
let route = Express.Router();
app.use('/', route);
app.listen(3000, () => {
    console.log("App ready!");
});
route.get('/', (req, res) => {
    res.send('Hello!');
});
const connector_1 = require("./mongo/connector");
let url = "mongodb://localhost:27017/";
let options;
let mongo = new connector_1.default;
let connection = mongo.connect(url, options).then().catch((error) => {
    console.log(error.name, error.message);
    process.exit(1);
});
route.get('/api/admin/listdatabases', (req, res) => {
    mongo.getListOfDatabases().then((data) => {
        res.send(data);
    }, (error) => {
        console.log(error);
    });
});
route.get('/api/admin/ping', (req, res) => {
    mongo.ping().then((data) => {
        res.send(data);
    }, (error) => {
        console.log(error);
    });
});
