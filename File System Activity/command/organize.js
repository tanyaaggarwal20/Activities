let fs = require("fs");
const { type } = require("os");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organizeFnPrint(srcPath){
    if(srcPath == undefined)
       srcPath = process.cwd();

    //1. create organized_files directory
    let organizedFilesPath = path.join(srcPath, "Organized Files");
    if(fs.existsSync(organizedFilesPath) == false){
        fs.mkdirSync(organizedFilesPath);
    }

    //2. scan whole srcPath
    let allTheFiles = fs.readdirSync(srcPath);   //read all the files in that path -> it will form an array

    //3. extension check -> classify
    for(let i = 0 ; i < allTheFiles.length ; i++) {
        //check if the content recieved is file, if yes then work
        let fullOriginalPath = path.join(srcPath, allTheFiles[i]);
        if(fs.lstatSync(fullOriginalPath).isFile() == true) {
            let folderName = checkExtensionAndTellFolder(allTheFiles[i]);
            //4. copy to that folder to which it belongs
            copyFileToDestination(folderName, fullOriginalPath, organizedFilesPath);
        }
    }
}

function copyFileToDestination(folderName, fullOriginalPath, organizedFilesPath){
    let destFolderPath = path.join(organizedFilesPath, folderName);
    if(fs.existsSync(destFolderPath) == false) {
        fs.mkdirSync(destFolderPath);
    }

    let originalFileName = path.basename(fullOriginalPath);
    let destFilePath = path.join(destFolderPath, originalFileName);
    fs.copyFileSync(fullOriginalPath, destFilePath);
    console.log(originalFileName, " copied to ", folderName);
}

function checkExtensionAndTellFolder(fileName){
    let extName = path.extname(fileName);             //it will give in form or .txt
    extName = extName.slice(1);                       //we need in form of txt that's why we used slice

    for(let key in types){
        for(let i = 0 ; i < types[key].length ; i++) {
            if(types[key][i] == extName){
                return key;
            }
        }
    }
    return "others";
}

module.exports = {
    organizefxn : organizeFnPrint
}