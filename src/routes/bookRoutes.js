const { ObjectId } = require('bson')
const { ObjectID } = require('bson')
const express = require('express')
const { MongoClient } = require('mongodb')
const bookRouter = express.Router()
const debug=require('debug')
function router(nav) {


bookRouter.route('/')
.get((req, res) => {
    //res.send('Hello Books using express router')
    const url='mongodb://localhost:27017'
    const dbName='bookLib';

   
    (async function mongo(){
      let client
      try{
        client=await MongoClient.connect(url)
        debug(`Connected to mongodb server....`)
        const db=client.db(dbName)
        const col=await db.collection('books')
        const books=await col.find().toArray()
        res.render('books', {
          nav,
          title: 'Books-Library',
          books
      })
      }
      catch(err){
        debug(err.stack)
      }

    })()
    
})

bookRouter.route('/:id')
.get((req, res) => {
    //const id = req.params.id //old ES5 syntax
    //or
    const {id} = req.params //This is called object destructuring (introduced with ES6 syntax)
    const url='mongodb://localhost:27017'
    const dbName='bookLib';

    (async function mongo(){
      let client
      try{
        client=await MongoClient.connect(url)
        debug(`connected to mongo database`)
        const db=client.db(dbName)
        const col=await db.collection('books')
        const book=await col.findOne({_id:new ObjectId(id)})
      }
      catch(err){
        debug(err.stack)
      }
      res.render(
        'singleBook', 
        {
           nav,
           title: 'Books-Library',
           book: books[id]
        }
    )
    })()
  
})
  return bookRouter 
}

module.exports = router