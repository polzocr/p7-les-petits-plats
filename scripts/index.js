class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.section = document.getElementById('cards')
        this.dropdowns =  document.querySelectorAll('.dropdown__all')

        this.recipes = [] 
        this.tabIdRecipes = []
        this.recipesNodes = []
        this.recipesQuery = []

        this.ingredients = []
        this.ingredientsId = []
        this.ingredientsNodes = []

        this.devices = []
        this.devicesId = []
        this.devicesNodes = []

        this.tools = []
        this.toolsId = []
        this.toolsNodes = []

        this.search()

    }


    async fetchData(){
        this.recipes = await this.api.getRecipes()
        
        const apiIngredients = await this.api.getIngredients()
        this.ingredients = apiIngredients[0]
        this.ingredientsId = apiIngredients[1]
        
        
        const apiDevices = await this.api.getDevices()
        this.devices = apiDevices[0]
        this.devicesId = apiDevices[1]
        
        
        const apiTools = await this.api.getTools()
        this.tools = apiTools[0]
        this.toolsId = apiTools[1]

        const apiRecipes = await this.api.RecipesQuery()
        this.recipesQuery = apiRecipes[0]

    }



    createRecipes(recipes){
        this.section.innerHTML =  null
        recipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }



    createIngredients(ingredients){
        document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        const dropIng = new Dropdown(ingredients ,0, 'Ingredients' , this)
        dropIng.createTemplate()
        dropIng.applyEvents(this)
    }



    createDevices(devices){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Dropdown(devices,1, 'Appareils', this)
        dropDev.createTemplate()
        dropDev.applyEvents(this)
    }



    createTools(tools){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Dropdown(tools, 2, 'Ustensiles', this)
        dropTool.createTemplate()
        dropTool.applyEvents(this)
    }

    


    createDatas(){
        this.createRecipes(this.recipes)
        this.createIngredients(this.ingredients)
        this.createDevices(this.devices)
        this.createTools(this.tools)
    }

    showRecipes(){
        this.section.childNodes.forEach(sec => {
            if(!this.tabIdRecipes.includes(parseInt(sec.dataset.id))){
                sec.classList.add('hidden')
            }
        })
    }

    showIngredients(tagName){
        this.dropdowns[0].childNodes.forEach(ingredient => {
            const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
            const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
            if(tab.length == 0 || ingredient.textContent.toLowerCase() == tagName){
                ingredient.classList.add('hidden')
            } 
        })
    }
    

    showDevices(tagName){
        this.dropdowns[1].childNodes.forEach(ingredient => {
            const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
            const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
            if(tab.length == 0 || ingredient.textContent.toLowerCase() == tagName){
                ingredient.classList.add('hidden')
            } 
        })
    }

    showTools(tagName){
        this.dropdowns[2].childNodes.forEach(ingredient => {
            const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
            const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
            if(tab.length == 0 || ingredient.textContent.toLowerCase() == tagName){
                ingredient.classList.add('hidden')
            } 
        })
    }

    removeTags(){
        this.tabIdRecipes = []
        let tabQuery = []
        const tags = document.querySelectorAll('.tag')
        const querySearch = document.querySelector('#Recherche').value
        this.showEverything()
        this.recipesQuery.forEach((recipe, index) => {
            if(recipe.includes(querySearch)){
                tabQuery.push(index + 1)
            }
        })
        if(tags.length > 0){
            tags.forEach((tag,index) => {
                const datasetId = tag.dataset.id.split(',').map(id => parseInt(id))
                if(index == 0){
                    this.tabIdRecipes = datasetId
                } else {
                    this.tabIdRecipes = datasetId.filter(id => this.tabIdRecipes.includes(id))
                }
                this.showDatas(tag.firstChild.textContent)
            })
        }  
        if(querySearch.length > 2){
            this.section.childNodes.forEach(sec => {
                tabQuery.includes(parseInt(sec.dataset.id)) ? sec.classList.remove('hidden-query') : sec.classList.add('hidden-query')
            })
            this.dropdowns[0].childNodes.forEach(node => {
                const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => tabQuery.includes(id))
                tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
            })
            this.dropdowns[1].childNodes.forEach(node => {
                const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => tabQuery.includes(id))
                tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
            })
            this.dropdowns[2].childNodes.forEach(node => {
                const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => tabQuery.includes(id))
                tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
            })
        }
    }

    showEverything(){
        this.section.childNodes.forEach(recipe => {
            recipe.classList.remove('hidden')
            recipe.classList.remove('hidden-query-tag')
            recipe.classList.remove('hidden-query')
        })
        this.dropdowns[0].childNodes.forEach(ingredient => {
            ingredient.classList.remove('hidden')
            ingredient.classList.remove('hidden-query-tag')
            ingredient.classList.remove('hidden-query')
        })
        this.dropdowns[1].childNodes.forEach(device => {
            device.classList.remove('hidden')
            device.classList.remove('hidden-query-tag')
            device.classList.remove('hidden-query')
        })
        this.dropdowns[2].childNodes.forEach(tool => {
            tool.classList.remove('hidden')
            tool.classList.remove('hidden-query-tag')
            tool.classList.remove('hidden-query')
        })
    }

    eventsInput(element, dropdown){
        const that = this
        document.querySelector('.dropdown__search.'+ element).addEventListener('input', function(e){
            const query = this.value.trim().toLowerCase()
            let count = 0
            if(query.length > 2){
                dropdown.childNodes.forEach(node => {
                    if(!node.textContent.includes(query) ){
                        if(node.textContent !== 'Aucun filtre disponible'){
                            node.classList.add('hidden-query-tag')
                        }
                        
                    } else {
                        if(node.textContent !== 'Aucun filtre disponible'){
                            node.classList.remove('hidden-query-tag') 
                            count++ 
                        }
                    } 
                })
                const noElement = document.getElementById('no-element')
                if(count == 0){
                    if(!noElement){
                        const textNoElement = document.createElement('p')
                        textNoElement.setAttribute('id', 'no-element')
                        textNoElement.textContent = 'Aucun filtre disponible'
                        dropdown.appendChild(textNoElement)
                    }
                } else {
                    noElement ? noElement.remove():0
                }
            } else {
                const noElement = document.getElementById('no-element')
                noElement ? noElement.remove():0
                dropdown.childNodes.forEach(node => node.classList.remove('hidden-query-tag'))
            }
            
        })
    }

    eventRecipes(){
        const that = this;
        
        document.querySelector('#Recherche').addEventListener('input', function(e){
        const query = this.value.trim().toLowerCase()
            if(query.length > 2){
                let tabQuery = []
                //let tabTags = []
                that.recipesQuery.forEach((recipe, index) => {
                    if(recipe.includes(query)){
                        tabQuery.push(index + 1)
                    }
                })
                //const tags = document.querySelectorAll('.tag')
                // if(tags.length > 0){
                //     tags.forEach((tag,index) => {
                //         const datasetId = tag.dataset.id.split(',').map(id => parseInt(id))
                //         if(index == 0){
                //             tabTags = datasetId
                //         } else {
                //             tabTags = datasetId.filter(id => tabTags.includes(id))
                //         }
                //     })
                // tabQuery = tabQuery.filter(id => tabTags.includes(id))
                // }
                if(that.tabIdRecipes.length > 0){
                    tabQuery = tabQuery.filter(id => that.tabIdRecipes.includes(id))
                } 
                that.section.childNodes.forEach(sec => {
                    tabQuery.includes(parseInt(sec.dataset.id)) ? sec.classList.remove('hidden-query') : sec.classList.add('hidden-query')
                })
                that.dropdowns[0].childNodes.forEach(node => {
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                that.dropdowns[1].childNodes.forEach(node => {
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                that.dropdowns[2].childNodes.forEach(node => {
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                const noResult = document.getElementById('no-result')
                if(tabQuery.length == 0){
                    if(!noResult){
                        const noRecipeText = document.createElement('p')
                        noRecipeText.setAttribute('id', 'no-result')
                        noRecipeText.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.'
                        document.querySelector('main').appendChild(noRecipeText)
                    }
                } else {
                    noResult? noResult.remove():0
                }
            } else {
                const noResult = document.getElementById('no-result')
                noResult? noResult.remove():0
                that.section.childNodes.forEach(sec => sec.classList.remove('hidden-query'))
                that.dropdowns[0].childNodes.forEach(node => node.classList.remove('hidden-query'))
                that.dropdowns[1].childNodes.forEach(node => node.classList.remove('hidden-query'))
                that.dropdowns[2].childNodes.forEach(node => node.classList.remove('hidden-query'))
            }
        })
    }

    search(){
        this.eventRecipes()
        this.eventsInput('Ingredients', this.dropdowns[0])
        this.eventsInput('Appareils', this.dropdowns[1])
        this.eventsInput('Ustensiles', this.dropdowns[2])
    }


    showDatas(tagName){
        this.showRecipes()
        this.showIngredients(tagName)
        this.showDevices(tagName)
        this.showTools(tagName)
    }

    async main(){
        await this.fetchData()
        this.createDatas()
        
    }

    
}

const rec = new Index()
rec.main()


    


// that.recipesNodes.forEach(node => {
                    //     tabQuery.includes(parseInt(node.dataset.id)) ? node.classList.remove('hidden-query'): node.classList.add('hidden-query')
                    // })
                    // that.ingredientsNodes.forEach(node => {
                    //     const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    //     const tab = datasetId.filter(id => tabQuery.includes(id))
                    //     tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                    // })
                    // that.devicesNodes.forEach(node => {
                    //     const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    //     const tab = datasetId.filter(id => tabQuery.includes(id))
                    //     tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                    // })
                    // that.toolsNodes.forEach(node => {
                    //     const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    //     const tab = datasetId.filter(id => tabQuery.includes(id))
                    //     tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                    // })
