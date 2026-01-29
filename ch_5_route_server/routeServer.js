
import http from "http";

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.end("this is home page");
    }else if(req.url === "/about"){
        res.end("this is about page");
    }else{
        res.end("this page not found");
    }
})

server.listen(5002,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("success port 5002");
    }
})