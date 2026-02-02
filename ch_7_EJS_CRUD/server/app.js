//first add package.json file - npm init -y
//second create this file (app.js)
//npm i express ejs (download package)
import express from "express"

const app = express();

app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
})

app.get("/about",(req,res)=>{
    res.status(200).json("this is about page");
})

app.listen(5001,()=>{
    console.log("server running in port 5001!!!")
})