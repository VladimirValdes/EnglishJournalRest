const { response } = require('express');

const userGet = ( req, res = response ) => {
    res.json({
        msg: 'From userGet'
    });
}


const userPost = ( req, res = response ) => {
    res.json({
        msg: 'From userPost'
    });
}

const userPut = ( req, res = response ) => {
    res.json({
        msg: 'From userPut'
    });
}

const userDelete = ( req, res = response ) => {
    res.json({
        msg: 'From userDelete'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}