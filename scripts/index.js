class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.recipes = [] 
        this.newRecipes = [] 
        this.section = document.getElementById('cards')
        this.dropdowns =  document.querySelectorAll('.dropdown__all')
        this.ingredients = []
        this.newIngredients = []
        this.devices = []
        this.newDevices = []
        this.tools = []
        this.newTools = []
        this.tagsIng = []
        this.tagsDev = []
        this.tagsTool = []
        this.tags = []
        
        this.queryRecipes = []
        this.queryIngredients = []
        this.queryDevices = []
        this.queryTools = []
        //this.search()


        this.ingredientsObject = []
        this.devicesObject = []
        this.toolsObject = []

        this.recipesTags = []
        this.recipesQuery = []

        this.ingredientsId = []
        this.devicesId = []
        this.toolsId = []

        this.tabIdRecipes = []

        this.recipesNodes = []
        this.ingredientsNodes = []
        this.devicesNodes = []
        this.toolsNodes = []

    }


    async fetchData(){
        this.recipes = await this.api.getRecipes()
        this.newRecipes = this.recipes
        
        const apiIngredients = await this.api.getIngredients()
        this.ingredients = apiIngredients[0]
        this.ingredientsId = apiIngredients[1]
        this.ingredientsObject = apiIngredients[2]
        
        
        const apiDevices = await this.api.getDevices()
        this.devices = apiDevices[0]
        this.devicesId = apiDevices[1]
        this.devicesObject = apiDevices[2]
        
        
        const apiTools = await this.api.getTools()
        this.tools = apiTools[0]
        this.toolsId = apiTools[1]
        this.toolsObject = apiTools[2]

        const apiRecipes = await this.api.RecipesQuery()
        this.recipesQuery = apiRecipes[0]
        this.recipesTags = apiRecipes[1]

    }



    async displayRecipes(recipes){
        this.section.innerHTML =  null
        recipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }



    async displayIngredients(ingredients){
        document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        const dropIng = new Ingredient(ingredients ,0, 'Ingredients' , this)
        dropIng.createTemplate()
        dropIng.events(this, this.tagsIng)
    }



    async displayDevices(devices){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Device(devices,1, 'Appareils', this)
        dropDev.createTemplate()
        dropDev.events(this, this.tagsDev)
    }



    async displayTools(tools){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Tool(tools, 2, 'Ustensiles', this)
        dropTool.createTemplate()
        dropTool.events(this, this.tagsTool)
    }

    


    async displayDatas(){
        this.displayRecipes(this.recipes)
        this.displayIngredients(this.ingredients)
        this.displayDevices(this.devices)
        this.displayTools(this.tools)
    }

    async showRecipes(){
        this.section.childNodes.forEach(sec => {
            if(this.tabIdRecipes.includes(parseInt(sec.dataset.id))){
                this.recipesNodes.push(sec)
            } else {
                sec.classList.add('hidden')
            }
        })
    }

    async showIngredients(tagName){
        this.dropdowns[0].childNodes.forEach(ingredient => {
            const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
            const tab = this.tabIdRecipes.filter(id => datasetId.includes(id))
            if(tab.length > 0 && ingredient.textContent !== tagName){
                this.ingredientsNodes.push(ingredient)
            } else {
                ingredient.classList.add('hidden')
            }
        })
    }

    async showDevices(tagName){
        this.dropdowns[1].childNodes.forEach(device => {
            const datasetId = device.dataset.id.split(',').map(id => parseInt(id))
            const tab = this.tabIdRecipes.filter(id => datasetId.includes(id))
            console.log(device.textContent)
            if(tab.length > 0 && device.textContent !== tagName){
                this.devicesNodes.push(device)
            } else {
                device.classList.add('hidden')
            }
        })
        console.log(this.devicesNodes)
    }

    async showTools(tagName){
        this.dropdowns[2].childNodes.forEach(tool => {
            const datasetId = tool.dataset.id.split(',').map(id => parseInt(id))
            const tab = this.tabIdRecipes.filter(id => datasetId.includes(id))
            if(tab.length > 0 && tool.textContent !== tagName){
                this.toolsNodes.push(tool)
            } else {
                tool.classList.add('hidden')
            }
        })
    }



    


    



    async main(){
        await this.fetchData()
        this.displayDatas()
        
    }

    
}

const rec = new Index()
rec.main()

    // async search(){
    //     this.eventRecipes()
    //     this.eventIngredients()
    //     this.eventDevices()
    //     this.eventTools()
    // }


    // async resetDatas(){
    //     this.newRecipes = this.recipes
    //     this.newIngredients = this.ingredients
    //     this.newDevices = this.devices
    //     this.newTools = this.tools
    // }

    // async resetTags(name){
    //     this.tagsIng = this.tagsIng.filter(tag => tag !== name)
    //     this.tagsDev = this.tagsDev.filter(tag => tag !== name)
    //     this.tagsTool = this.tagsTool.filter(tag => tag !== name)
    //     this.tags = this.tags.filter(tag => tag !== name)
    // }

    // async updateDatas(){
    //     this.getNewRecipes()
    //     this.displayRecipes(this.newRecipes)
    //     this.getNewIngredients()
    //     this.displayIngredients(this.newIngredients)
    //     this.getNewDevices()
    //     this.displayDevices(this.newDevices)
    //     this.getNewTools()
    //     this.displayTools(this.newTools)
    // }

    // async getNewRecipes(){
    //     if(this.tagsIng.length > 0){
    //         this.tagsIng.forEach(tag => {
    //             this.newRecipes = this.newRecipes.filter(recipe =>  recipe.ingredients.some(ing => ing.ingredient == tag ) == true)
    //         })
    //     }
    //     if(this.tagsDev.length > 0){
    //         this.tagsDev.forEach(tag => {
    //             this.newRecipes = this.newRecipes.filter(recipe => recipe.appliance == tag)
    //         })
    //     } 
    //     if(this.tagsTool.length > 0){
    //         this.tagsTool.forEach(tag => {
    //             this.newRecipes = this.newRecipes.filter(recipe => recipe.ustensils.some(ust => ust == tag) == true)
    //         })
    //     }
    // }

    //     async getNewDevices(){
    //     const recipeDevices = []
    //     this.newRecipes.forEach(recipe => {
    //         recipeDevices.push(recipe.appliance)
    //     })
    //     this.newDevices =  [...new Set(recipeDevices)]
    // }
    // async getNewTools(){
    //     const recipeTools = []
    //     this.newRecipes.forEach(recipe => {
    //         recipe.ustensils.forEach(ustensil => recipeTools.push(ustensil))
    //     })
    //     this.newTools = [...new Set(recipeTools)]
    // }

      // async getNewIngredients(){
    //     const recipeIng = []
    //     this.newRecipes.forEach(recipe => {
    //         recipe.ingredients.forEach(ingredient => recipeIng.push(ingredient.ingredient))
    //     })
    //     this.newIngredients =  [...new Set(recipeIng)]
    // }

    // async searchIng(query){
    //     const search = this.newIngredients.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    //     this.queryIngredients = [...new Set(search)]
    // }

    // async eventIngredients(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Ingredients').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.searchIng(query)
    //             that.displayIngredients(that.queryIngredients)
    //         } else {
    //             if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
    //                 that.displayIngredients(that.ingredients)
    //             } else {
    //                 that.displayIngredients(that.newIngredients)
    //             }
                
    //         }
    //     })
    // }

    // async searchDev(query){
    //     const search = this.newDevices.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    //     this.queryDevices = [...new Set(search)]
    // }

    // async eventDevices(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Appareils').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.searchDev(query)
    //             that.displayDevices(that.queryDevices)
    //         } else {
    //             if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
    //                 that.displayDevices(that.devices)
    //             } else {
    //                 that.displayDevices(that.newDevices)
    //             }
                
    //         }
    //     })
    // }

    // async searchTool(query){
    //     const search = this.newTools.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    //     this.queryTools = [...new Set(search)]
    // }

    // async eventTools(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Ustensiles').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.searchTool(query)
    //             that.displayTools(that.queryTools)
    //         } else {
    //             if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
    //                 that.displayTools(that.tools)
    //             } else {
    //                 that.displayTools(that.newTools)
    //             }
                
    //         }
    //     })
    // }

    // async searchRecipes(query){
    //     this.queryRecipes = this.newRecipes.filter(recipe => {
    //         return recipe.name.toLowerCase().includes(query.toLowerCase()) || recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query.toLowerCase()) == true) || recipe.description.toLowerCase().includes(query.toLowerCase())
    //     })
    // }

    // async eventRecipes(){
    //     const that = this;
    //     document.querySelector('#Recherche').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.searchRecipes(query)
    //             that.displayRecipes(that.queryRecipes)
    //         } else {
    //             if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
    //                 that.displayRecipes(that.recipes)
    //             } else {
    //                 that.displayRecipes(that.newRecipes)
    //             }
                
    //         }
    //     })
    // }

    



