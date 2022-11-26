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

        this.recipesQuery = []

    }

    //recupération des recettes de l'api
    async getRecipes() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => {
                this.recipes = res.recipes;
                return res.recipes
            })
            .catch(err => console.log('an error occurs', err))
    }

    //creation du tableau qui servira pour la recherche principale
    //avec titre/description/ingredients
    async RecipesQuery(){
        this.recipes.forEach((recipe,index) => {
            this.recipesQuery.push(this.ingredientsObject[index] + ' ' +  recipe.name.toLowerCase() + ' ' +  recipe.description.toLowerCase())
        })
        return [this.recipesQuery]
    }

    //recupération des ingredients
    // creation du tableau avec chaque ingredients par recettes
    async getIngredients(){
        const recipeIng = []//tableau temporaire des ingredients avec doublons
        const objectIngredients = {}
        this.recipes.forEach((recipe,index) => { //pour chaque recette
            let string = ""
            recipe.ingredients.forEach(ingredient => { //on sort les ingredients
                const lowerIngredients = ingredient.ingredient.toLowerCase()
                string += lowerIngredients + ' '
                //on créé un objet avec comme les ingredients en clé et l'index recette en valeur
                objectIngredients[lowerIngredients] = objectIngredients[lowerIngredients] ? `${objectIngredients[lowerIngredients]}, ${index + 1}` : `${index + 1}` 
                recipeIng.push(lowerIngredients)
            })
            this.ingredientsObject.push(string)
        })
        const allKeys = Object.keys(objectIngredients)
        this.ingredientsId = allKeys.map(key => objectIngredients[key])//chaque ingredients est present dans x recettes
        this.ingredients = [...new Set(recipeIng)] //on filtre les doublons
        return [this.ingredients, this.ingredientsId]
    }



    async getDevices(){
        const recipeDevices = []
        const objectDevices = {}
        this.recipes.forEach((recipe, index) => {
            const lowerAppliance = recipe.appliance.toLowerCase()
            this.devicesObject.push(lowerAppliance)
            objectDevices[lowerAppliance] = objectDevices[lowerAppliance] ? `${objectDevices[lowerAppliance]}, ${index + 1}` : `${index + 1}`
            recipeDevices.push(lowerAppliance)
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
                const lowerUstensil = ustensil.toLowerCase()
                objectTools[lowerUstensil] = objectTools[lowerUstensil] ? `${objectTools[lowerUstensil]}, ${index + 1}` : `${index + 1}`
                recipeTools.push(lowerUstensil)
            })
        })
        this.tools = [...new Set(recipeTools)]
        const allKeys = Object.keys(objectTools)
        this.toolsId = allKeys.map(key => objectTools[key])
        return [this.tools, this.toolsId, this.toolsObject]
    }
}


