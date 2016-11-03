console.log("starting server...");

import * as Express from "express";

let app: Express.Express = Express();

app.listen(3000, () => {
    console.log("App ready!");
});

app.get('/', (req,res)=>{
    res.send('Hello!');
});
