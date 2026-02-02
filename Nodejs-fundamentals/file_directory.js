const fs = require("fs");

fs.mkdir("newDirectory", (err) =>{
    if(err) return;
    console.log("Directory created");
});

fs.mkdir("folders/folder1/folder2", {recursive : true}, (err) =>{
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log("Directory is created");
    }
})

fs.readdir("newDirectory", (err, files) =>{
    if(err){
        console.log(err);
        return;
    }
    console.log("files : ", files)
});


// fs.rmdir("newDirectory" , (err) =>{   // For active and empty folder
//      if(err){
//         console.log(err);
//         return;
//     }
//     console.log("Directory is removed");
// });


fs.rm("newDirectory", {recursive : true} ,(err) =>{   // For active and files containing folder
     if(err){
        console.log(err);
        return;
    }
    console.log("Directory is removed");
});

