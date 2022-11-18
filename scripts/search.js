class Search{
    constructor(recipe){
        this.recipe = recipe
    }


    search(query){
        return this.filterRecipe(query)
    }
}

class RecipeSearch extends Search{
    constructor(recipe){
        super(recipe)
    }

    filterRecipe(query){
        
    }
}


class IngSearch extends Search{
    constructor(recipe){
        super(recipe)
    }

    filterRecipe(query){
        
    }
}