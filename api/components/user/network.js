const express = require("express");

const response = require("../../../network/response")
const controller = require("./index");

let list = async (req,res) => {
    try{
    const list = await controller.list();
    response.success(req,res,list, 200)
    }catch(error){
        response.error(req,res,error.message,500)
    }
}

let user = async (req,res) => {
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
}

let upsert = async(req,res)=>{
    try{
        const user = await controller.upsert(req.body);
    if(!user){
        const userError = new TypeError("User doesn't exist");
        throw userError
    }
    response.success(req,res,user, 200)
    }catch(error){
        response.error(req,res,error.message,500)
    }
}


const router = express.Router();

router.get("/", list);
router.get("/:id", user);
router.post("/", upsert);
router.put("/", upsert);

module.exports = router;