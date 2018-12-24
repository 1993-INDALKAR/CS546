const connection = require("./mongoConnection");
const express = require('express');
const bodyParser = require('body-parser');
const mongoUpdate = require("./mongoUpdate");

try{
const app = express();
let router = express.Router();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

app.use(router);
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

router.post('/recipes', jsonParser, async (req, res) => {

    if (req.body.constructor.name.toLowerCase() == "object") {
        let createRecipe = await mongoUpdate.createRecipe(req.body);
        res.json(createRecipe);
    }
    else {
        res.json({ message: "The requested body is not a json" });
    }

});



router.get('/recipes', async (req, res) => {

    try {
        let getRecipes = await mongoUpdate.getAllRecipes();

        if (getRecipes.length == 0) {
            res.json({ message: "There is no Recipes in Database" });
        }
        else {
            res.status(200).json(getRecipes);
        }
    }
    catch (e) {

        res.status(500).json({ message: "Problem occured in reading the Recipes from Database" });

    }


});

router.get('/recipes/:id', async (req, res) => {

    try {
        let getRecipe = await mongoUpdate.getRecipe(req.params.id);
        res.json(getRecipe);
    }
    catch (e) {
        res.status(500).json({ message: "Problem occured in reading the Recipe from Database" });

    }


});

router.put('/recipes/:id', jsonParser, async (req, res) => {


    if (req.body.constructor.name.toLowerCase() == "object") {

        let getRecipe = await mongoUpdate.replaceRecipe(req.params.id, req.body);

        res.json(getRecipe);

    }
    else {
            res.json({message : "The requested body is not a json"})
    }


});

router.delete('/recipes/:id', async (req, res) => {


    let deleteRecipe = await mongoUpdate.deleteRecipe(req.params.id);

    if (deleteRecipe) {
        res.json(deleteRecipe);
    }
    else {
        res.sendStatus(204);
    }






});


router.patch('/recipes/:id', jsonParser, async (req, res) => {

    if (!req.params.id) {
        res.json({ message: "Please pass an Id." });
    }

    if(req.body.constructor.name.toLowerCase() == "object"){
        
        let patchRecipe = await mongoUpdate.updateRecipe(req.params.id, req.body);

    res.json(patchRecipe);
    }
    else{

        res.json({message: "The requested body is not a json"});

    }


    

});


app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found *" });
});


app.listen(3000, () => {
    console.log("Server is on now");
})

}
catch(e){
    res.json({message : "Sorry something whent wrong"});
}