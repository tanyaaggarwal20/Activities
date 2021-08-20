//*************************************************Activity*************************************************//
//main input

//1. input -> node main.js tree "path"
//print -> tree command executed with path "" 

//2. input -> node main.js organize "path"
//print -> organize command executed with path ""

//3. input -> node main.js help
//print -> list of all the commands
         // 1. node main.js tree "path"
         // 2. node main.js organize "path"
         // 3. node main.js help  

let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");

let inputArr = process.argv.slice(2);
let command = inputArr[0];
let path = inputArr[1];

switch(command){
    case "tree" :
        treeObj.treefxn(path);
        break;
     
    case "organize" :    
        organizeObj.organizefxn(path);
        break;

    case "help" :
        helpObj.helpfxn( );
        break;
       
    default :
        console.log("❌ Wrong command! Kindly enter help to see all the commands.");
        break;    
}

