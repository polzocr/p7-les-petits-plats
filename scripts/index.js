class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.recipes = [] 
        this.section = document.getElementById('cards')

    }


    async fetchData(){
        const dataApi = await this.api.get()
        this.recipes = dataApi
    }

    async displayData(){
        this.recipes.forEach(recipe => {
            const card = new Template(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }

    async main(){
        await this.fetchData()
        this.displayData()
        
    }

    
}

const rec = new Index()
rec.main()

