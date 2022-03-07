
const express = require('express');

const app = express();

// app.use(allBooks);

app.get("/books",allBooks, (req , res)=>{
      res.send(books);
})


function allBooks(req , res , next){
    console.log('Fetching all books');
    next();
}


let books = [
    {
      "title": "Unlocking Android",
      "isbn": "1933988673",
      "pageCount": 416,
      "publishedDate": { "$date": "2009-04-01T00:00:00.000-0700" },     
    },
    {
      "title": "Android in Action, Second Edition",
      "isbn": "1935182722",
      "pageCount": 592,
      "publishedDate": { "$date": "2011-01-14T00:00:00.000-0800" },     
    },
    {
      "title": "Specification by Example",
      "isbn": "1617290084",
      "pageCount": 0,
      "publishedDate": { "$date": "2011-06-03T00:00:00.000-0700" },     
    },
    {
      "title": "Flex 3 in Action",
      "isbn": "1933988746",
      "pageCount": 576,     
      "publishedDate": { "$date": "2009-02-02T00:00:00.000-0800" },
    },
]

app.listen(5555 , function(){
   console.log('listening on port 5555')
});