const express = require("express");

const response = require("../../../network/response")
const controller = require("./controller");

const router = express.Router();

let login = async (req,res)=>{
    try{
        let session = await controller.login(req.body.username, req.body.password);
        if(!session){
            const loginError = new TypeError("Wrong credentials");
            throw loginError 
        }
        
        response.success(req,res,user, 200)
    }catch(error){
        response.error(req,res,error.message,400)
    }
    
}

router.post("/login", login);

module.exports = router;