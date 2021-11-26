const express = require('express')
const { MongoClient } = require('mongodb')
const authRouter = express.Router()
const debug=require('debug')

function router(){
    authRouter.route('./signUp').post((req,res)=>{
        debug(req.body)
        res.json(req.body)
    })
    return router
}
module.exports=router