const express = require("express");

const response = require("../../../network/response")
const controller = require("./index")

const router = express.Router();

router.get("/", async (req,res) => {
    try{
    const list = await controller.list();
    response.success(req,res,list, 200)
    }catch(error){
        response.error(req,res,error.message,500)
    }
})

router.get("/:id", async (req,res) => {
    try{
    const user = await controller.get(req.params.id);
    if(!user){
        const userError = new TypeError("User doesn't exist");
        throw userError
    }
    response.success(req,res,user, 200)
    }catch(error){
        response.error(req,res,error.message,500)
    }
})

module.exports = router;