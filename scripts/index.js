class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.recipes = [] 
        this.section = document.getElementById('cards')
        this.dropdowns =  document.querySelectorAll('.dropdown__all')
        this.ingredients = []
        this.devices = []
        this.tools = []
        
        
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

        this.search()

    }


    async fetchData(){
        this.recipes = await this.api.getRecipes()
        
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



    async createRecipes(recipes){
        this.section.innerHTML =  null
        recipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }



    async createIngredients(ingredients){
        document.querySelectorAll('.dropdown__all')[0].innerHTML = null
        const dropIng = new Ingredient(ingredients ,0, 'Ingredients' , this)
        dropIng.createTemplate()
        dropIng.events(this, this.tagsIng)
    }



    async createDevices(devices){
        document.querySelectorAll('.dropdown__all')[1].innerHTML = null
        const dropDev = new Device(devices,1, 'Appareils', this)
        dropDev.createTemplate()
        dropDev.events(this, this.tagsDev)
    }



    async createTools(tools){
        document.querySelectorAll('.dropdown__all')[2].innerHTML = null
        const dropTool = new Tool(tools, 2, 'Ustensiles', this)
        dropTool.createTemplate()
        dropTool.events(this, this.tagsTool)
    }

    


    async createDatas(){
        this.createRecipes(this.recipes)
        this.createIngredients(this.ingredients)
        this.createDevices(this.devices)
        this.createTools(this.tools)
    }

    async showRecipes(){
        if(this.recipesNodes == 0){
            this.section.childNodes.forEach(sec => {
                if(this.tabIdRecipes.includes(parseInt(sec.dataset.id))){
                    sec.classList.remove('hidden')
                    this.recipesNodes.push(sec)
                } else {
                    sec.classList.add('hidden')
                }
            })
        } else {
            const temporaryNodes = []
            this.recipesNodes.forEach(recipe => {
                if(this.tabIdRecipes.includes(parseInt(recipe.dataset.id))){
                    temporaryNodes.push(recipe)
                } else {
                    recipe.classList.add('hidden')
                }
            })
            this.recipesNodes = temporaryNodes
        }
    }

    async showIngredients(tagName){
        if(this.ingredientsNodes == 0) {
            this.dropdowns[0].childNodes.forEach(ingredient => {
                const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && ingredient.textContent.toLowerCase() !== tagName){
                    //ingredient.classList.remove('hidden')
                    this.ingredientsNodes.push(ingredient)
                } else {
                    ingredient.classList.add('hidden')
                }
            })
        } else {
            const temporaryNodes = []
            this.ingredientsNodes.forEach(ingredient => {
                const datasetId = ingredient.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && ingredient.textContent.toLowerCase() !== tagName){
                    temporaryNodes.push(ingredient)
                } else {
                    ingredient.classList.add('hidden')
                }
            })
            this.ingredientsNodes = temporaryNodes
        }
    }

    async showDevices(tagName){
        if(this.devicesNodes == 0){
            this.dropdowns[1].childNodes.forEach(device => {
                const datasetId = device.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && device.textContent.toLowerCase() !== tagName){
                    //device.classList.remove('hidden')
                    this.devicesNodes.push(device)
                } else {
                    device.classList.add('hidden')
                }
            })
        } else {
            const temporaryNodes = []
            this.devicesNodes.forEach(device => {
                const datasetId = device.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && device.textContent.toLowerCase() !== tagName){
                    temporaryNodes.push(device)
                } else {
                    device.classList.add('hidden')
                }
            })
            this.devicesNodes = temporaryNodes
        }
    }

    async showTools(tagName){
        if(this.toolsNodes == 0){
            this.dropdowns[2].childNodes.forEach(tool => {
                const datasetId = tool.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && tool.textContent.toLowerCase() !== tagName){
                    //tool.classList.remove('hidden')
                    this.toolsNodes.push(tool)
                } else {
                    tool.classList.add('hidden')
                }
            })
        } else {
            const temporaryNodes = []
            this.toolsNodes.forEach(tool => {
                const datasetId = tool.dataset.id.split(',').map(id => parseInt(id))
                const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))
                if(tab.length > 0 && tool.textContent.toLowerCase() !== tagName){
                    temporaryNodes.push(tool)
                } else {
                    tool.classList.add('hidden')
                }
            })
            this.toolsNodes = temporaryNodes
        }
    }

    async removeTags(){
        this.tabIdRecipes = []
        const tags = document.querySelectorAll('.tag')
        this.showEverything()
        this.resetNodes()
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
        } else {

        }      
    }

    async showEverything(){
        this.section.childNodes.forEach(recipe => {
            recipe.classList.remove('hidden')
        })
        this.dropdowns[0].childNodes.forEach(ingredient => {
            ingredient.classList.remove('hidden')
        })
        this.dropdowns[1].childNodes.forEach(device => {
            device.classList.remove('hidden')
        })
        this.dropdowns[2].childNodes.forEach(tool => {
            tool.classList.remove('hidden')
        })
    }

    async eventsInput(element, dropdown){
        const that = this
        document.querySelector('.dropdown__search.'+ element).addEventListener('input', function(e){
            let nodes; 
            element == 'Ingredients' ? nodes = that.ingredientsNodes : element == 'Appareils' ? nodes = that.devicesNodes : nodes = that.toolsNodes
            const query = this.value.trim().toLowerCase()
            if(query.length > 2){
                if(nodes.length > 0){
                    nodes.forEach(node => !node.textContent.includes(query)? node.classList.add('hidden-tag') : node.classList.remove('hidden-tag'))
                } else {
                    dropdown.childNodes.forEach(node => !node.textContent.includes(query) ? node.classList.add('hidden-tag'): node.classList.remove('hidden-tag'))
                }
                
            } else {
               if(nodes.length > 0){
                nodes.forEach(node => node.classList.remove('hidden-tag'))
               } else {
                dropdown.childNodes.forEach(node => node.classList.remove('hidden-tag'))
               }
            }
        })
    }

    eventRecipes(){
        const that = this;
        document.querySelector('#Recherche').addEventListener('input', function(e){
        const query = this.value.trim().toLowerCase()
            if(query.length > 2){
                const tabQuery = []
                if(that.recipesNodes.length > 0){
                    that.tabIdRecipes.forEach(id => {
                        if(that.recipesQuery[id-1].includes(query)){
                            tabQuery.push(id)
                        }
                    })
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
                } else {
                    that.recipesQuery.forEach((recipe, index) => {
                        if(recipe.includes(query)){
                            tabQuery.push(index + 1)
                        }
                    })
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
                }
            } else {
                if(that.recipesNodes.length > 0){
                    that.section.childNodes.forEach(sec => sec.classList.remove('hidden-query'))
                    that.dropdowns[0].childNodes.forEach(node => node.classList.remove('hidden-query'))
                    that.dropdowns[1].childNodes.forEach(node => node.classList.remove('hidden-query'))
                    that.dropdowns[2].childNodes.forEach(node => node.classList.remove('hidden-query'))
                } else {
                     that.section.childNodes.forEach(sec => sec.classList.remove('hidden-query'))
                     that.dropdowns[0].childNodes.forEach(node => node.classList.remove('hidden-query'))
                     that.dropdowns[1].childNodes.forEach(node => node.classList.remove('hidden-query'))
                     that.dropdowns[2].childNodes.forEach(node => node.classList.remove('hidden-query'))
                }
            }
        })
    }

    async search(){
        this.eventRecipes()
        this.eventsInput('Ingredients', this.dropdowns[0])
        this.eventsInput('Appareils', this.dropdowns[1])
        this.eventsInput('Ustensiles', this.dropdowns[2])
    }

    async resetNodes(){
        this.recipesNodes = []
        this.ingredientsNodes = []
        this.devicesNodes = []
        this.toolsNodes = []
    }


    async showDatas(tagName){
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


    



