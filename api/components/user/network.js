const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/follow/:id', secure('follow'), follow);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal functions
function list(req, res, next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}
// let list = async (req,res,next) => {
//     try{
//         let list = await Controller.list();
//         response.success(req,res,list,200);
//     }catch(error){
//         next;
//     }
// }

function get(req, res, next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}
// let get = async (req,res,next) => {
//     try{
//         let user = await Controller.get(req.params.id)
//         response.success(req,res,user,200)
//     }catch(error){
//         next;
//     }
// }

function upsert(req, res, next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

// let upsert = async (req,res,next) => {
//     try{
//         let user = await Controller.upsert(req.body);
//         response.success(req,res,user,200)
//     }catch(error){
//         next;
//     }
// }

function follow(req,res,next){
    Controller.follow(req.body.id, req.params.id)
    .then((data)=>{
        response.success(req,res,data,201)
    })
    .catch(next);
}

module.exports = router;