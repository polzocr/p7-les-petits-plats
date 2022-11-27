class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.recipes = [] 
        this.newRecipes = [] 
        this.section = document.getElementById('cards')
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
        this.search()
    }


    async fetchData(){
        this.recipes = await this.api.getRecipes()
        this.newRecipes = this.recipes

        this.ingredients = await this.api.getIngredients()
        this.newIngredients = this.ingredients

        this.devices = await this.api.getDevices()
        this.newDevices = this.devices

        this.tools = await this.api.getTools()
        this.newTools = this.tools
    }

    async getNewRecipes(){
        if(this.tagsIng.length > 0){
            this.tagsIng.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe =>  recipe.ingredients.some(ing => ing.ingredient.toLowerCase() == tag ) == true)
            })
        }
        if(this.tagsDev.length > 0){
            this.tagsDev.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe => recipe.appliance.toLowerCase() == tag)
            })
        } 
        if(this.tagsTool.length > 0){
            this.tagsTool.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe => recipe.ustensils.some(ust => ust.toLowerCase() == tag) == true)
            })
        }
    }

    async displayRecipes(recipes){
        this.section.innerHTML =  null
        recipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }

    async getNewIngredients(){
        const recipeIng = []
        this.newRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if(!this.tagsIng.includes(ingredient.ingredient.toLowerCase())){
                    recipeIng.push(ingredient.ingredient.toLowerCase())
                }
            })
        })
        this.newIngredients =  [...new Set(recipeIng)]
    }

    async displayIngredients(ingredients){
        document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        const dropIng = new Ingredient(ingredients ,0, 'Ingredients')
        dropIng.createTemplate()
        dropIng.events(this, this.tagsIng)
    }

    async getNewDevices(){
        const recipeDevices = []
        this.newRecipes.forEach(recipe => {
            if(!this.tagsDev.includes(recipe.appliance.toLowerCase())){
                recipeDevices.push(recipe.appliance.toLowerCase())
            }
        })
        this.newDevices =  [...new Set(recipeDevices)]
    }

    async displayDevices(devices){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Device(devices,1, 'Appareils')
        dropDev.createTemplate()
        dropDev.events(this, this.tagsDev)
    }

    async getNewTools(){
        const recipeTools = []
        this.newRecipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                if(!this.tagsTool.includes(ustensil.toLowerCase())){
                    recipeTools.push(ustensil.toLowerCase())
                }
            })
        })
        this.newTools = [...new Set(recipeTools)]
    }

    async displayTools(tools){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Tool(tools, 2, 'Ustensiles')
        dropTool.createTemplate()
        dropTool.events(this, this.tagsTool)
    }

    
    async updateDatas(){
        this.getNewRecipes()
        this.displayRecipes(this.newRecipes)
        this.getNewIngredients()
        this.displayIngredients(this.newIngredients)
        this.getNewDevices()
        this.displayDevices(this.newDevices)
        this.getNewTools()
        this.displayTools(this.newTools)
    }

    async displayDatas(){
        this.displayRecipes(this.newRecipes)
        this.displayIngredients(this.newIngredients)
        this.displayDevices(this.newDevices)
        this.displayTools(this.newTools)
    }

    async resetDatas(){
        this.newRecipes = this.recipes
        this.newIngredients = this.ingredients
        this.newDevices = this.devices
        this.newTools = this.tools
    }

    async resetTags(name){
        this.tagsIng = this.tagsIng.filter(tag => tag !== name)
        this.tagsDev = this.tagsDev.filter(tag => tag !== name)
        this.tagsTool = this.tagsTool.filter(tag => tag !== name)
        this.tags = this.tags.filter(tag => tag !== name)
    }

    
    async searchIng(query){
        const search = this.newIngredients.filter(x => x.toLowerCase().includes(query.toLowerCase()))
        this.queryIngredients = [...new Set(search)]
    }

    async eventIngredients(){
        const that = this;
        document.querySelector('.dropdown__search.Ingredients').addEventListener('input', function(e){
            const query = this.value
            if(query.length > 2){
                that.searchIng(query)
                that.displayIngredients(that.queryIngredients)
            } else {
                if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
                    that.displayIngredients(that.ingredients)
                } else {
                    that.displayIngredients(that.newIngredients)
                }
                
            }
        })
    }

    async searchDev(query){
        const search = this.newDevices.filter(x => x.toLowerCase().includes(query.toLowerCase()))
        this.queryDevices = [...new Set(search)]
    }

    async eventDevices(){
        const that = this;
        document.querySelector('.dropdown__search.Appareils').addEventListener('input', function(e){
            const query = this.value
            if(query.length > 2){
                that.searchDev(query)
                that.displayDevices(that.queryDevices)
            } else {
                if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
                    that.displayDevices(that.devices)
                } else {
                    that.displayDevices(that.newDevices)
                }
                
            }
        })
    }

    async searchTool(query){
        const search = this.newTools.filter(x => x.toLowerCase().includes(query.toLowerCase()))
        this.queryTools = [...new Set(search)]
    }

    async eventTools(){
        const that = this;
        document.querySelector('.dropdown__search.Ustensiles').addEventListener('input', function(e){
            const query = this.value
            if(query.length > 2){
                that.searchTool(query)
                that.displayTools(that.queryTools)
            } else {
                if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
                    that.displayTools(that.tools)
                } else {
                    that.displayTools(that.newTools)
                }
                
            }
        })
    }

    async searchRecipes(query){
        this.queryRecipes = this.newRecipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(query.toLowerCase()) || recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query.toLowerCase()) == true) || recipe.description.toLowerCase().includes(query.toLowerCase())
        })
    }

    async eventRecipes(){
        const that = this;
        document.querySelector('#Recherche').addEventListener('input', function(e){
            const query = this.value
            if(query.length > 2){
                that.searchRecipes(query)
                that.displayRecipes(that.queryRecipes)
            } else {
                if(that.tagsIng == 0 && that.tagsDev == 0 && that.tagsTool == 0){
                    that.displayRecipes(that.recipes)
                } else {
                    that.displayRecipes(that.newRecipes)
                }
                
            }
        })
    }

    

    async search(){
        this.eventRecipes()
        this.eventIngredients()
        this.eventDevices()
        this.eventTools()
    }








    async main(){
        await this.fetchData()
        this.displayDatas()
        
    }

    
}

const rec = new Index()
rec.main()








        // for(let i=0; i<30; i++){
        //     if(this.newIngredients[i]){
        //         const p = document.createElement('button')
        //         p.textContent = this.newIngredients[i]
        //         document.querySelectorAll('.dropdown__all')[0].appendChild(p)
        //     }
        // }
        // const that = this
        // const drop = document.querySelectorAll('.dropdown__all')[0]
        // drop.childNodes.forEach(x => {
        //     x.addEventListener('click', function(e){
        //         that.tags.push(x.textContent)
        //         that.displayTag(x.textContent, 'ingredients')

        //         document.getElementById('ingredients').nextElementSibling.classList.remove('show')
        //         document.getElementById('ingredients').nextElementSibling.classList.remove('ingredients')
        //         that.displayIngredients()
        //     })
        // })