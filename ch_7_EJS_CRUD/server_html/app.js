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

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended :true}));

app.set("view engine","ejs");

let studentList = [
    {   id:"01",
        name:"vaishali"  
    },
    {   id:"02",
        name:"Bhoomi"  
    },
    {   id:"03",
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
    res.redirect("/")//when we submit data redirect home page
})

const port = 5001

app.listen(port,()=>{
    console.log("server running in port!!!",port)
})

