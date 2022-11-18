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





    async displayData(){
        this.displayCards();
        this.displayIngredients();
        this.displayDevices();
        this.displayTools();
    }

    async displayCards(){
        this.section.innerHTML =  null
        this.newRecipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }



    async displayIngredients(value){
        const recipeIng = []

        if(value){
            this.newIngredients = this.ingredients.filter(x => x.toLowerCase().includes(value.toLowerCase()))
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        } else if(this.tagsIng.length > 0) {
            this.tagsIng.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe =>  recipe.ingredients.some(ing => ing.ingredient == tag ) == true)
            })
            this.newRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    let validation = true
                    for(let i=0;i < this.tagsIng.length; i++){
                        if(ingredient.ingredient == this.tagsIng[i]){
                            validation = false
                        }
                    }
                    if(validation == true){
                        recipeIng.push(ingredient.ingredient)
                    }
                })
            })
            
            this.newIngredients = [...new Set(recipeIng)]
            console.log(this.newIngredients)
            this.displayCards()
            
            
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        } else {
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        }

        const dropIng = new Ingredient(this.newIngredients,0, 'Ingredients')
        dropIng.createTemplate()
        dropIng.events(this, this.tagsIng)
    }

    async search(){
        const that = this;
        document.querySelector('.dropdown__search.Ingredients').addEventListener('input', function(e){
            const query = this.value
            if(query.length > 2){
                that.displayIngredients(query)
            } else {
                that.displayIngredients()
            }
        })
        this.displayData()
       
        
    }





  
    async displayDevices(){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Device(this.newDevices,1, 'Appareils')
        dropDev.createTemplate()
        dropDev.events(this, this.tagsDev)
    }

    async displayTools(){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Tool(this.newTools, 2, 'Ustensiles')
        dropTool.createTemplate()
        dropTool.events(this, this.tagsTool)
    }


   

   










    async main(){
        await this.fetchData()
        this.search()
        
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