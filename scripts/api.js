class Api {
    constructor(url) {
        this._url = url
        this.recipes = {}

        this.ingredients
        this.ingredientsObject = []
        this.ingredientsId = []

        this.devices = []
        this.devicesObject = []
        this.devicesId = []

        this.tools = []
        this.toolsObject = []
        this.toolsId = []

        this.recipesTags = []
        this.recipesQuery = []

    }

    async getRecipes() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => {
                this.recipes = res.recipes;
                return res.recipes
            })
            .catch(err => console.log('an error occurs', err))
    }

    async RecipesQuery(){
        this.recipes.forEach((recipe,index) => {
            this.recipesQuery.push(this.ingredientsObject[index] + ' ' +  recipe.name + ' ' +  recipe.description)
            this.recipesTags.push(this.ingredientsObject[index] + ' ' +  this.devicesObject[index] + ' '  + this.toolsObject[index])
        })
        return [this.recipesQuery, this.recipesTags]
    }

    async getRecipesTags(){
        this.recipes.forEach(recipe => {
            let string = '';
            
        })
    }

    async getIngredients(){
        const recipeIng = []
        const objectIngredients = {}
        this.recipes.forEach((recipe,index) => {
            let string = ""
            recipe.ingredients.forEach(ingredient => {
                string += ingredient.ingredient.toLowerCase() + ' '
                objectIngredients[ingredient.ingredient] = objectIngredients[ingredient.ingredient] ? `${objectIngredients[ingredient.ingredient]}, ${index + 1}` : `${index + 1}` 
                recipeIng.push(ingredient.ingredient)
            })
            this.ingredientsObject.push(string)
        })
        const allKeys = Object.keys(objectIngredients)
        this.ingredientsId = allKeys.map(key => objectIngredients[key])
        this.ingredients = [...new Set(recipeIng)]
        return [this.ingredients, this.ingredientsId, this.ingredientsObject]
    }



    async getDevices(){
        const recipeDevices = []
        const objectDevices = {}
        this.recipes.forEach((recipe, index) => {
            this.devicesObject.push(recipe.appliance.toLowerCase())
            objectDevices[recipe.appliance] = objectDevices[recipe.appliance] ? `${objectDevices[recipe.appliance]}, ${index + 1}` : `${index + 1}`
            recipeDevices.push(recipe.appliance.toLowerCase())
        })
        this.devices = [...new Set(recipeDevices)]
        const allKeys = Object.keys(objectDevices)
        this.devicesId = allKeys.map(key => objectDevices[key])
        
        return [this.devices, this.devicesId, this.devicesObject]
    }



    async getTools(){
        const recipeTools = []
        const objectTools = {}
        this.recipes.forEach((recipe,index) => {
            this.toolsObject.push(recipe.ustensils.join(' ').toLowerCase())
            recipe.ustensils.forEach(ustensil => {
                objectTools[ustensil] = objectTools[ustensil] ? `${objectTools[ustensil]}, ${index + 1}` : `${index + 1}`
                recipeTools.push(ustensil)
            })
        })
        this.tools = [...new Set(recipeTools)]
        const allKeys = Object.keys(objectTools)
        this.toolsId = allKeys.map(key => objectTools[key])
        return [this.tools, this.toolsId, this.toolsObject]
    }
}


