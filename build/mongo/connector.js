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
    getListOfDatabases() {
        return new Promise((resolve, reject) => {
            this.database.admin().listDatabases().then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            }).catch((error) => {
                console.log(error);
            });
        });
    }
    ping() {
        return new Promise((resolve, reject) => {
            this.database.admin().ping().then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            }).catch((error) => {
                console.log(error);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MongoConnector;
