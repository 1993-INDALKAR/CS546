const mongoCollections = require("./mongoCollection");
const recipes = mongoCollections.recipes;


module.exports = {



    async getAllRecipes() {

        try {

            const recipeCollection = await recipes();

            const recp = await recipeCollection.find({}).toArray();

            const arr = [];
            for (let i = 0; i < recp.length; i++) {
                const obj = {};
                obj._id = recp[i]._id;
                obj.title = recp[i].title;
                arr.push(obj);
            }


            return arr;

        }
        catch (e) {

            return { message: "Problem in Reading From Database." };

        }



    },

    async getRecipe(id) {

        try {

            if(typeof id != "string"){
                return {message : "id is not a string in getRecipe function"};
            }

            if (!id) return { message: "Please Provide an ID." };

            const recipeCollection = await recipes();

            const recp = await recipeCollection.findOne({ _id: id });

            if (recp === null) return { message: `There is no such recipe with the ID "${id}" in database.` };

            return recp;

        }
        catch (e) {
            return { message: "Ther is problem reading from database" };
        }

    },

    async deleteRecipe(id) {

        try {

            if (!id) return { message: "Please Provide an ID." };

            if(typeof id != "string"){
                return {message : "id is not a string in deleteRecipe function"};
            }

            const recipeCollection = await recipes();

            let recipeExist = {};
            recipeExist = await this.getRecipe(id);

            if (recipeExist.message) {
                return recipeExist;
            }


            const recp = await recipeCollection.removeOne({ _id: id });

            if (recp === null) return { message: `Could not delete recipe with the ID "${id}" from database.` };

        }
        catch (e) {
            return { message: "Problem in deleting from Database." }
        }




    },

    async replaceRecipe(id, updateRecipe) {

        try {

            if(updateRecipe.constructor.name.toLowerCase() != "object" ){
                return {message : "Provided data to create is not an Object"};
            }

            const updateRecipeData = {};

            if (!id) return { message: "Please Provide an ID." };

            if(typeof id != "string"){
                return {message : "id is not a string in replaceRecipe function"};
            }

            const recipeCollection = await recipes();

            if (!updateRecipe) return { message: "Please provide a DATA for Update." }

            if (updateRecipe.title) {

                updateRecipeData.title = updateRecipe.title;

            }
            else {

                return { message: "Please provide a Title for the Recipe" };

            }

            if (updateRecipe.steps) {

                if (updateRecipe.steps.length > 0) {
                    updateRecipeData.steps = updateRecipe.steps;

                }
                else {

                    return { message: "There are no Steps for the Recipe." };

                }
            }
            else {

                return { message: "Please provide the steps for the Recipe" };

            }

            if (updateRecipe.ingredients) {

                if (updateRecipe.ingredients.length > 0) {
                    updateRecipeData.ingredients = updateRecipe.ingredients;
                }
                else {

                    return { message: "There are no Ingredients for the Recipe" };

                }

            }
            else {

                return { message: "Please provide the ingredients for the Recipe" };

            }

            let updateCommand = {
                $set: updateRecipeData
            };

            const query = {
                _id: id
            };

            let recp = await recipeCollection.updateOne(query, updateCommand);

            if (recp == null) {
                return { message: "Could notUpdate Recipe" };
            }

            return await this.getRecipe(id);

        }
        catch (e) {

            return { message: "Problem in replacing the recipe" };

        }



    },

    async updateRecipe(id, data) {

        try{
            if(data.constructor.name.toLowerCase() != "object" ){
                return {message : "Provided data to update recipe is not an Object"};
            }
    
            if (!id) return { message: "Please Provide an ID." };

            if(typeof id != "string"){
                return {message : "id is not a string in updateRecipe function"};
            }
    
            if (!data) return { message: "Request Body is Empty." };
    
            const recipeCollection = await recipes();
    
            let update = {};
            let flag = 0;
            let str = "";
    
            Object.keys(data).forEach(function (key) {   //https://stackoverflow.com/questions/684672/how-do-i-loop-through-or-enumerate-a-javascript-object
    
                if (data[key].length > 0) {
                    update[key] = data[key];
                }
                else {
                    flag++;
                    str = key;
                }
            });
    
            if (flag) {
                return { message: `There is no ${str} passed for the recipe` };
            }
    
            let updateCommand = {
                $set: update
            };
    
            const query = {
                _id: id
            };
    
            let recp = await recipeCollection.updateOne(query, updateCommand);
    
            if (recp == null) {
                return { message: "Could notUpdate Recipe" };
            }
    
            return await this.getRecipe(id);
        }
        catch(e){
            return {message : "Problem occured while updating the Recipe."};
        }
        

 



    },

    async  createRecipe(recipe_data) {
       
        try{
            if(recipe_data.constructor.name.toLowerCase() != "object" ){
                return {message : "Provided data to create recipe is not an Object"};
            }
    
            if (!recipe_data) return { message: "Please Provide The Recipe." };

            
    
            const uuidv1 = require('uuid/v1');  //https://stackoverflow.com/questions/23327010/how-to-generate-unique-id-with-node-js 
    
            if (!uuidv1) return { message: "Sorry could not generate Unique Id for New Recipe}" };
    
            const recipeCollection = await recipes();
    
    
            let newRecipe = {
                _id: uuidv1(),
    
            }
    
            if (recipe_data.title) {
                newRecipe.title = recipe_data.title;
            }
            else {
                return { message: "Please provide a Title for the Recipe" };
            }
    
            if (recipe_data.steps) {
                if (recipe_data.steps.length > 0) {
                    newRecipe.steps = recipe_data.steps;
                }
                else {
                    return { message: "There are no Steps for the Recipe." };
                }
    
            }
            else {
                return { message: "Please provide Steps for the Recipe" };
            }
    
            if (recipe_data.ingredients) {
                if (recipe_data.ingredients.length > 0) {
                    newRecipe.ingredients = recipe_data.ingredients;
                }
                else {
                    return { message: "There are no Ingredients for the Recipe." };
                }
    
            }
            else {
                return { message: "Please provide Ingredients for the Recipe" };
            }
    
    
    
            const insertInfo = await recipeCollection.insertOne(newRecipe);
    
            if (insertInfo.insertedCount === 0) return { message: "Could not Insert Recipe into Database." };
            const newId = insertInfo.insertedId;
            const recipe = await this.getRecipe(newId);
    
            return recipe;
    
    
        }
        catch(e){
            return {message : "Problem occured while creating Recipe"};
        }

       
    },

}