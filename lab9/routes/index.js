// const resultsRoutes = require("./result");
const path = require("path");

try{
    const constructorMethod =app =>{
        
        let filePath = path.join(__dirname,"../public/index.html");
        // console.log("jsgfsh");
        // console.log(filePath);
        app.get("/",(req,res)=>{
            // res.render('index',{title:'The Best Palindrome Checker in the World!' });
            // res.render(filePath,{title:'The Best Palindrome Checker in the World!' });
            res.sendFile(filePath,{title:'The Best Palindrome Checker in the World!' });
        });

        app.get("*",(req,res)=>{
            
            res.status(400).json({message:"Page not found"});
        });
    
       
    };

    module.exports = constructorMethod;
}
catch(e){
    throw console.log("Problem occured in Displaying Page.");
}




