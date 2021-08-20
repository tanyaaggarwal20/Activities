let fs = require("fs");
let path = require("path");

function treeFnPrint(srcPath) {
    if(srcPath == undefined)
      srcPath = process.cwd();

    // console.log("tree command executed with path " + src);
    let content = fs.readdirSync(srcPath);
    let parentFolderName = path.basename(srcPath);
    let completePath = "└───" + parentFolderName + "\n";
    for(let i = 0 ; i < content.length ; i++){
        completePath = completePath + "\n\t" + "├───" + content[i];
    }
    console.log(completePath);
}

module.exports = {
    treefxn : treeFnPrint
}