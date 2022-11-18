class Api {
    constructor(url) {
        this._url = url
        this.recipes = {}
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

    async getIngredients(){
        const recipeIng = []
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => recipeIng.push(ingredient.ingredient))
        })
        return [...new Set(recipeIng)]
    }

    async getDevices(){
        const recipeDevices = []
        this.recipes.forEach(recipe => {
            recipeDevices.push(recipe.appliance)
        })
        return [...new Set(recipeDevices)]
    }

    async getTools(){
        const recipeTools = []
        this.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => recipeTools.push(ustensil))
        })
        return [...new Set(recipeTools)]
    }
}