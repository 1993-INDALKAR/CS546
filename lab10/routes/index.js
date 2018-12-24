// const resultsRoutes = require("./result");
const path = require("path");
const users = require("../users");
const data = require("../data");
const bcrypt = require('bcrypt');
try {
    const constructorMethod = app => {

        let details = {};
        let message = "";

        // let filePath = path.join(__dirname,"../public/index.html");

        app.get("/", (req, res) => {

            // res.clearCookie('AuthCookie');
            // console.log(req.cookies);
            if (req.cookies.name == "AuthCookie") {
                res.redirect('/private');
            }
            else {
                // let filePath = path.join(__dirname, "../public/index.html");

                // res.sendFile(filePath);
                res.render('index',{title:'Login Page',message:message});
                message = "";
            }

        });

        app.use("/login", async (req, res, next) => {
            // console.log(req.body);
            // console.log(req.body["password"]);

            // console.log(JSON.stringify(users));

            // let databaseDetails = JSON.stringify(users);
            let databaseDetails = users.users;

            // res.clearCookie('AuthCookie');
            // console.log(databaseDetails["users"]);
            // console.log(users.users);

            // console.log("dgb");
            for (var i = 0; i < databaseDetails.length; i++) {
                if(databaseDetails[i]["username"] === req.body["username"]){
                    // let hashStatus = await bcrypt.compare(req.body["password"], "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm");
                   
                    // let hashStatus = await bcrypt.compare(req.body["password"], databaseDetails[i]["hashedPassword"]);
                    let hashStatus = await data.hashChecking(req.body["password"], databaseDetails[i]["hashedPassword"]);
                    // console.log(hashStatus);
                    if (hashStatus) {
                        
                        res.cookie('name', 'AuthCookie'); //.send('cookie set'); //Sets name = AuthCookie
                        // console.log("Cookie set");
                        details.username = databaseDetails[i]["username"];
                        details.firstName = databaseDetails[i]["firstName"];
                        details.lastName = databaseDetails[i]["lastName"];
                        details.profession = databaseDetails[i]["profession"];
                        details.bio = databaseDetails[i]["bio"];
                        return res.redirect('/private');
                    }
                    // else {
        
                    //     console.log("ggetg");
                    //     // res.redirect("/");
                    //     return res.status(200).redirect('/');
        
                    // }
                } 
            }

            message = "Username or Password is not Valid.";

            res.status(200).redirect('/');

            
            // console.log(hashStatus);



            // let auth = await data.hashing(req.body["password"]);
            // if (auth) {
            // if (hashStatus) {
            //     console.log("Cookie set");
            //     res.cookie('name', 'AuthCookie'); //.send('cookie set'); //Sets name = AuthCookie
            //     res.redirect('/private');
            // }
            // else {

            //     console.log("ggetg");
            //     // res.redirect("/");
            //     return res.status(200).redirect('/');

            // }

            next();


        });

        app.get("/private", (req, res) => {

            // console.log(req.cookies);

            if (req.cookies.name) {
                // let filePath = path.join(__dirname, "../public/private.html");
                // console.log(filePath);
                // res.sendFile(filePath);

                res.render('private',{title:'Private Details', details : details});
            }
            else {

                let filePath = path.join(__dirname, "../public/error.html");
                // console.log(filePath);
                res.status(403).sendFile(filePath);

            }
        });

        app.use("/logout", (req, res, next) => {
            message = "Cookie is been Expired";
            res.clearCookie('name');                           //https://www.youtube.com/watch?v=mdvQ74KL-fU
            // console.log(req.cookies);
            res.clearCookie('AuthCookie', { path: '/' });
            res.status(200).redirect('/');
        });

        app.get("*", (req, res) => {
            res.status(400).json({ message: "Page not found" });
        });


    };

    module.exports = constructorMethod;
}
catch (e) {
    throw console.log("Problem occured in Displaying Page.");
}