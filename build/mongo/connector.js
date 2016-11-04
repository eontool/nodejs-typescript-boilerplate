"use strict";
const mongodb = require("mongodb");
class MongoConnector {
    constructor() {
    }
    connect(url, options) {
        if (this.database === undefined) {
            console.log("database undefined, connecting...");
        }
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(url, options).then((response) => {
                this.database = response;
                resolve(response);
                if (this.database != undefined) {
                    console.log("database connection created!");
                }
                this.database.on('close', () => {
                    console.log("mongo closed!");
                    process.exit(1);
                });
            }, (error) => {
                reject(error);
            }).catch((ex) => {
                reject(ex);
            });
        });
    }
    callMethod(fn) {
        return new Promise((resolve, reject) => {
            fn.then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    getListOfDatabases() {
        return this.callMethod(this.database.admin().listDatabases());
    }
    ping() {
        return this.callMethod(this.database.admin().ping());
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MongoConnector;
