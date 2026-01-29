//ES_module js
// ES Modules are the official JavaScript standard (ES6 / ES2015)
// Used in modern JavaScript, browsers, and Node.js
// Modules are loaded before execution (asynchronously)
//Import → import
//Export → export

//export single value
// import { add } from "./app.js";
// console.log(add(4,7));

//export multiple value

import {add , sub} from "./app.js";
console.log("multiple value",sub(20,4));