
import http from "http";
import fs from "fs";

const server = http.createServer((req,res)=>{
    fs.readFile("index.html",(err,data)=>{
        if(err){
            res.writeHead(404);
            res.end("file not found");
        }else{
            res.writeHead(200,{"content-type":"text/html"})
            res.end(data);
        }
    })
})
server.listen(5001,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("server created on port 5001");
    }
})