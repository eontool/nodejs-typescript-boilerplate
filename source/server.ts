console.log("starting server...");

import * as Express from "express";

let app: Express.Express = Express();
let route: Express.Router = Express.Router();

app.use('/', route);

app.listen(3000, () => {
    console.log("App ready!");
});

route.get('/', (req, res) => {
    res.send('Hello!');
});


import MongoConnector from './mongo/connector';

let url: string = "mongodb://localhost:27017/";
let options: string[];
let mongo = new MongoConnector;
let connection = mongo.connect(url, options).then().catch(
    (error) => {
        console.log(error.name, error.message);
        process.exit(1);
    }
);

route.get('/api/admin/listdatabases', (req, res) => {
    mongo.getListOfDatabases().then(
        (data) => {
            res.send(data);
        },
        (error) => {
            console.log(error);
        }
    );
});


route.get('/api/admin/ping', (req, res) => {

    mongo.ping().then(
        (data) => {
            res.send(data);
        },
        (error) => {
            console.log(error);
        }
    );
});
