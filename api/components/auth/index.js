const jwt = require('jsonwebtoken');
const ctr = require("./controller");
const store = require("../../../store/dummy");

function sign(data) {
    return jwt.sign(data, 'secreto');
}

module.exports = {
    ctr(store){

    },
    sign,
};