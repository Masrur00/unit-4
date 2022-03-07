const express = require('express');

const app = express();


app.get("/books",logger, (req , res)=>{
     res.send('{ route: "/books"}');
})

app.get("/libraries", logger , (req , res)=>{
    res.send(`{ route: "/libraries", permission: true}`);   
})

app.get("/authors",logger , (req , res)=>{
    res.send(`{ route: "/authors", permission: true}`);           
})

function logger(req, res , next){
    console.log(req.path);
    next();
}

function checkPermission(str){
   
   };
   



app.listen("5234",()=>{
   console.log('App is running on port 5234');
});