"use strict";
console.log("starting server...");
const Express = require("express");
let app = Express();
app.listen(3000, () => {
    console.log("App ready!");
});
app.get('/', (req, res) => {
    res.send('Hello!');
});
