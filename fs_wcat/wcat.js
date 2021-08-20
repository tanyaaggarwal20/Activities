let fs = require("fs");
let path = require("path");

//take input
let inputArr = process.argv.slice(2);

//segregate -> - -> option
//segregate ->   -> filePath
let optionArr = [];
let filesArr = [];

//make different array for filePath and Options
for(let i = 0 ; i < inputArr.length ; i++) {
    if(inputArr[i].charAt(0) == "-") {
        optionArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

//check if files exists or not
for(let i = 0 ; i < filesArr.length ; i++){
    if(fs.existsSync(filesArr[i]) == false) {
        console.log("Error! Files doesnot exist.");
        return;
    }
}

// 1- node wcat.js filepath => displays content of the file in the terminal ✔
// 2- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order. ✅

//content append
let content = "";
for(let i = 0 ; i < filesArr.length ; i++){
    content = content + fs.readFileSync(filesArr[i]) + "\r\n"; 
}
console.log("Content Before Commands:\n" + content); 


let contentArr = content.split("\r\n");
// console.log("content arr before: " , contentArr);

let isSPresent = optionArr.includes("-s");
let isNPresent = optionArr.includes("-n");
let isBPresent = optionArr.includes("-b");

if(isSPresent){
    modifyContentBys();
}

if(isNPresent && isBPresent){

    let indexOfN = optionArr.indexOf("-n");
    let indexOfB = optionArr.indexOf("-b");
    // console.log("n->", indexOfN);
    // console.log("b->", indexOfB);

    if(indexOfN < indexOfB){
        modifyContentByn();
    }else{
        modifyContentByb();
    }

}else if(isNPresent){
    modifyContentByn();
}else if(isBPresent){
    modifyContentByb();
}


// -s functioning => convert big line breaks into a singular line break
function modifyContentBys() {
    for(let i = 1 ; i < contentArr.length ; i++) {
        if(contentArr[i] == '' && contentArr[i-1] == ''){
            contentArr.splice(i, 1);
            i--;
        }   
    }
    // console.log("content arr after: ",contentArr);
    content = contentArr.join("\r\n");
}


// -n functioning => give numbering to all the lines 
function modifyContentByn() {
    for(let i = 0 ; i < contentArr.length ; i++) {
        contentArr[i] = (i+1) + ". " + contentArr[i];
    }
    content = contentArr.join("\r\n");
}

// -b functioning => give numbering to non-empty lines
function modifyContentByb() {
    let count = 1;
    for(let i = 0 ; i < contentArr.length ; i++) {
        if(contentArr[i] != ""){
            contentArr[i] = count + ". " + contentArr[i];
            count++;
        }
    }
    content = contentArr.join("\r\n");
}

console.log("Content After Commands:\n" + content);