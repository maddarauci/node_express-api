// src/node-api/server.js 
// setting the port 
const express = require('express'),
      server = express(),
      users = require('./users');

//setting the port.
server.set('port', process.env.PORT || 3000);

// mongo api 

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://main_node:<P0v2Aoxy>@cluster0.sbgrv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//Adding routes
server.get('/',(request,response)=>{
 response.sendFile(__dirname + '/index.html');
});

server.get('/users',(request,response)=>{
 response.json(users);
});

//Binding to localhost://3000
server.listen(3000,()=>{
 console.log('Express server started at port 3000');
});