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
                this.newRecipes = this.newRecipes.filter(recipe =>  recipe.ingredients.some(ing => ing.ingredient == tag ) == true)
            })
        }
        if(this.tagsDev.length > 0){
            this.tagsDev.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe => recipe.appliance == tag)
            })
        } 
        if(this.tagsTool.length > 0){
            this.tagsTool.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe => recipe.ustensils.some(ust => ust == tag) == true)
            })
        }
    }

    async displayCards(){
        this.section.innerHTML =  null
        this.newRecipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }

    async getNewIngredients(){
        const recipeIng = []
        this.newRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => recipeIng.push(ingredient.ingredient))
        })
        this.newIngredients =  [...new Set(recipeIng)]
    }

    async displayIngredients(query){
        document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        const dropIng = new Ingredient(this.newIngredients,0, 'Ingredients')
        dropIng.createTemplate()
        dropIng.events(this, this.tagsIng)
    }

    async getNewDevices(){
        const recipeDevices = []
        this.newRecipes.forEach(recipe => {
            recipeDevices.push(recipe.appliance)
        })
        this.newDevices =  [...new Set(recipeDevices)]
    }

    async displayDevices(){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Device(this.newDevices,1, 'Appareils')
        dropDev.createTemplate()
        dropDev.events(this, this.tagsDev)
    }

    async getNewTools(){
        const recipeTools = []
        this.newRecipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => recipeTools.push(ustensil))
        })
        this.newTools = [...new Set(recipeTools)]
    }

    async displayTools(){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Tool(this.newTools, 2, 'Ustensiles')
        dropTool.createTemplate()
        dropTool.events(this, this.tagsTool)
    }

    
    async updateDatas(){
        this.getNewRecipes()
        this.displayCards()
        this.getNewIngredients()
        this.displayIngredients()
        this.getNewDevices()
        this.displayDevices()
        this.getNewTools()
        this.displayTools()
    }

    async displayDatas(){
        this.displayCards()
        this.displayIngredients()
        this.displayDevices()
        this.displayTools()
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

    










    

    

    // async searchRecipes(query){
    //     this.newRecipes = this.newRecipes.filter(recipe => {
    //         return recipe.name.toLowerCase().includes(query.toLowerCase()) || recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(query.toLowerCase()) == true) || recipe.description.toLowerCase().includes(query.toLowerCase())
    //     })
    // }

    // async eventRecipes(){
    //     const that = this;
    //     document.querySelector('#Recherche').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.newRecipes = that.recipes
    //             that.getNewRecipes()
    //             that.searchRecipes(query)
    //             that.displayCards()
    //         } else {
    //             if(that.tags == 0){
    //                 that.newRecipes = that.recipes
    //                 that.displayCards()
    //             } else {
    //                 that.newRecipes = that.recipes
    //                 that.getNewRecipes()
    //                 that.displayCards()
    //             }
    //         }
    //     })
    // }



    // async searchIng(query){
    //     this.newIngredients = this.newIngredients.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    // }

    // async eventIngredients(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Ingredients').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.newIngredients = that.ingredients
    //             that.getNewIng()
    //             that.searchIng(query)
    //             that.displayIngredients()
    //         } else {
    //             if(that.tags == 0){
    //                 that.newIngredients = that.ingredients
    //                 that.displayIngredients()
    //             } else {
    //                 that.getNewIng()
    //                 that.displayIngredients()
    //             }
                
    //         }
    //     })
    // }






    // async searchDev(query){
    //     this.newDevices = this.newDevices.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    // }

    // async eventDevices(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Appareils').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.newDevices = that.devices
    //             that.getNewDev()
    //             that.searchDev(query)
    //             that.displayDevices()
    //         } else {
    //             if(that.tags == 0){
    //                 that.newDevices = that.devices
    //                 that.displayDevices()
    //             } else {
    //                 that.getNewDev()
    //                 that.displayDevices()
    //             }
                
    //         }
    //     })
    // }





    // async searchTool(query){
    //     this.newTools = this.newTools.filter(x => x.toLowerCase().includes(query.toLowerCase()))
    // }

    // async eventTools(){
    //     const that = this;
    //     document.querySelector('.dropdown__search.Ustensiles').addEventListener('input', function(e){
    //         const query = this.value
    //         if(query.length > 2){
    //             that.newTools = that.tools
    //             that.getNewTool()
    //             that.searchTool(query)
    //             that.displayTools()
    //         } else {
    //             if(that.tags == 0){
    //                 that.newTools = that.tools
    //                 that.displayTools()
    //             } else {
    //                 that.getNewTool()
    //                 that.displayTools()
    //             }
                
    //         }
    //     })
    // }



    

    async search(){
        this.eventIngredients()
        this.eventDevices()
        this.eventTools()
        this.eventRecipes()
        this.displayData()
       
        
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