//first add package.json file - npm init -y
//second create this file (app.js)
//npm i express ejs (download package)

// import express from "express"

// const app = express();
// app.set("view engine","ejs");

// const name = "vaishali";

// app.get("/",(req,res)=>{
//     res.render("index2",{name})
// })

// const port = 5002

// app.listen(5002,()=>{
//     console.log("server running in port 5002!!!")
// })

// import express from "express"

// const app = express();
// app.set("view engine","ejs");

// let studentList = [
//     {   id:"01",
//         name:"vaishali"  
//     },
//     {   id:"02",
//         name:"Bhoomi"  
//     },
//     {   id:"03",
//         name:"Krishna"  
//     },
// ]

// app.get("/",(req,res)=>{
//     res.render("index",{studentList})
// })

// const port = 5001

// app.listen(port,()=>{
//     console.log("server running in port!!!",port)
// })

import express from "express"
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

console.log("filename",__fileName);
console.log("folder",__dirName);

app.use(express.static(path.join(__dirName,"public")));
app.set("view engine","ejs");

let studentList = [
    {   id:1,
        name:"vaishali"  
    },
    {   id:2,
        name:"Bhoomi"  
    },
    {   id:3,
        name:"Krishna"  
    },
]

app.get("/",(req,res)=>{
    res.render("index3",{studentList})
})
app.get("/add", (req, res) => {
    res.render("add");
});


app.post("/add",(req,res)=>{
    const {name}= req.body;

    const newStudent = {
        id:new Date().getTime(),
        name
    }

    studentList.push(newStudent);
    res.redirect("/");//when we submit data redirect home page
});

app.get("/edit/:id",(req,res)=>{
    const id = parseInt(req.params.id);

    let student = studentList.find((s)=>s.id===id);
    console.log(student);
    if(!student){
        return res.status(404).json("not found");
    }
    res.render("edit",{student});

})
app.post("/edit/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const student = studentList.find((s)=>s.id===id);
    if(!student){
        return res.status(404).json("student not found");
    }
    const {name} = req.body;
    student.name = name;
    res.redirect("/")
});
app.get("/delete/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const student = studentList.find((s)=>s.id===id);
    if(!student){
        return res.status(404).json("not found");
    }
    studentList = studentList.filter((s)=>s.id !== id);
    res.redirect("/");
})
const port = 5001

app.listen(port,()=>{
    console.log("server running in port!!!",port)
})

