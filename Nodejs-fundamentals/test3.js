const fs = require("fs");

fs.copyFile("test.txt", "new_test.txt", (err)=>{
    if(err){
        console.log("Error while file is copied", err)
    }
    else{
        console.log("File is copied successfully")
    }
})


fs.copyFileSync("test.txt", "desh.txt")
console.log("File is copied")


fs.unlink("desh.txt", (err)=>{
    if(err){
        console.log("Error while deleting file", err)
    }
    else{
        console.log("File is deleted successfully")
    }
})

fs.unlinkSync("new_test.txt")
console.log("File is deleted")