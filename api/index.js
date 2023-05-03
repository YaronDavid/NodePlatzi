const express = require("express");

const config = require("../config.js");
const app = express();
const user = require("./components/user/network")

//Routes
app.use(express.json());
app.use("/api/user", user);



app.listen(config.api.port, () =>{
    console.log("API escuchando en el puerto ", config.api.port);
})