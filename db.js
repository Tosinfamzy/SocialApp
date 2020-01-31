const mongodb = require('mongodb');
const dotenv = require('dotenv').config()
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-nvrkl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongodb.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology:true},(err, client)=>{
   module.exports = client
   const app = require('./app')
   app.listen(process.env.PORT)

})