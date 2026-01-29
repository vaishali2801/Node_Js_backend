//nodemon is a development utility that automatically restarts a Node.js
//server when file changes are detected, improving developer productivity.
import http from "http";
const server = http.createServer((req,res)=>{
    res.end("hello i am vaishali");
})

const port = 5001;

server.listen(port,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("success!!!,server running on port",port);
    } 
})