//common module js
//Core modules are built-in Node.js modules used to perform common tasks without installation.
//No need to install them using npm.
//Import → require()
//Export → module.exports or exports

const fs = require("fs"); //fs module
const data = fs.writeFileSync("index.html","new file created");//create index.html file 

const data2 = fs.readFileSync("---");
