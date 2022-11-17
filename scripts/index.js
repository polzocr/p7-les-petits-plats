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
        this.tags = []

    }


    async fetchData(){
        const dataApi = await this.api.get()
        this.recipes = dataApi
        this.newRecipes = this.recipes
        
        const recipeIng = []
        this.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => recipeIng.push(ingredient.ingredient))
        })
        this.ingredients = [...new Set(recipeIng)]
        this.newIngredients = this.ingredients
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
            const card = new Template(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }

    async displayIngredients(value){
        let test = ""
        const recipeIng = []
        if(value){
            this.newIngredients = this.ingredients.filter(x => x.toLowerCase().includes(value.toLowerCase()))
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        } else if(this.tags.length > 0) {
            this.tags.forEach(tag => {
                this.newRecipes = this.newRecipes.filter(recipe =>  recipe.ingredients.some(ing => ing.ingredient == tag ) == true)
            })
            this.newRecipes.forEach(recipe => {
                recipe.ingredients.forEach(ingredient => {
                    let validation = true
                    for(let i=0;i < this.tags.length; i++){
                        if(ingredient.ingredient == this.tags[i]){
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
            // console.log('la',this.newRecipes)
            // console.log('la',this.newIngredients)
            
            
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        } else {
            document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        }
        for(let i=0; i<30; i++){
            if(this.newIngredients[i]){
                const p = document.createElement('button')
                p.textContent = this.newIngredients[i]
                document.querySelectorAll('.dropdown__all')[0].appendChild(p)
            }
        }
        const that = this
        const drop = document.querySelectorAll('.dropdown__all')[0]
        drop.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                that.tags.push(x.textContent)
                that.displayTag(x.textContent, 'ingredients')

                document.getElementById('ingredients').nextElementSibling.classList.remove('show')
                document.getElementById('ingredients').nextElementSibling.classList.remove('ingredients')
                that.displayIngredients()
            })
        })
    }

    async search(){
        const that = this;
        document.querySelector('.dropdown__search.ingredients').addEventListener('input', function(e){
            if(this.value.length > 2){
                that.displayIngredients(this.value)
            } else {
                that.displayIngredients()
            }
        })
        this.displayData()
       
        
    }





    async displayTag(value, type){
        const element = `<div class="tag ${type}">
                            <p>${value}</p>
                            <button class="${type}"><span>+</span></button>
                        </div>`;
        document.querySelector('#tags').innerHTML += element
    }




    async displayDevices(){
        const recipeDevices = []
        this.recipes.forEach(x => {
            recipeDevices.push(x.appliance)
        })
        this.devices = [...new Set(recipeDevices)]
        this.devices.forEach(x => {
            const p = document.createElement('p')
            p.textContent = x
            document.querySelectorAll('.dropdown__all')[1].appendChild(p)
        })
    }

    async displayTools(){
        const recipeTools = []
        this.recipes.forEach(x => {
            x.ustensils.forEach(ustensil => recipeTools.push(ustensil))
        })
        this.tools = [...new Set(recipeTools)]
        this.tools.forEach(x => {
            const p = document.createElement('p')
            p.textContent = x
            document.querySelectorAll('.dropdown__all')[2].appendChild(p)
        })
    }










    async main(){
        await this.fetchData()
        this.search()
        
    }

    
}

const rec = new Index()
rec.main()

