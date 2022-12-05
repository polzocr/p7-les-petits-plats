class Index{
    constructor(){
        this.api = new Api('../data/recipe.json') //data appelées ici
        this.section = document.getElementById('cards')
        this.dropdowns =  document.querySelectorAll('.dropdown__all')

        this.recipes = []   //toutes les recettes
        this.tabIdRecipes = []  //id des recettes voulues
        this.recipesQuery = [] //titre,description et ingredients de chaque recette rassemblés

        this.ingredients = [] //les ingredients
        this.ingredientsId = [] //ingredients par recettes

        this.devices = []   //appareils
        this.devicesId = [] //appareils par recette

        this.tools = [] //ustensiles
        this.toolsId = []   //ustensiles par recettes

        this.search()   //events bar de recherche et recherche de tag

    }


    //on recupère les données de l'api ainsi que les nouveau objets et tableaux
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


    //creation des cards recette au lancement
    createRecipes(recipes){
        this.section.innerHTML =  null
        recipes.forEach(recipe => {
            const card = new Recipe(recipe)
            const templateFinal = card.createTemplate()
            this.section.innerHTML += templateFinal
        })
    }


    //creation du dropdown ingredient au lancement
    createIngredients(ingredients){
        const dropIng = new Dropdown(ingredients ,0, 'Ingredients' , this) //creation de chaque tag ingredients
        dropIng.createTemplate() //creation des templates
        dropIng.applyEvents(this) //application des events aux clicks sur les tags
    }


    //creation du dropdown appareil au lancement
    createDevices(devices){
        const dropDev = new Dropdown(devices,1, 'Appareils', this)
        dropDev.createTemplate()
        dropDev.applyEvents(this)
    }


    //creation du dropdown ustensile au lancement
    createTools(tools){
        const dropTool = new Dropdown(tools, 2, 'Ustensiles', this)
        dropTool.createTemplate()
        dropTool.applyEvents(this)
    }

    

    //creation du html
    createDatas(){
        this.createRecipes(this.recipes)
        this.createIngredients(this.ingredients)
        this.createDevices(this.devices)
        this.createTools(this.tools)
    }

    //affichage des bonnes recettes
    //pour chaque recettes on regarde si l'id correspond
    showRecipes(){
        this.section.childNodes.forEach(sec => {
            if(!this.tabIdRecipes.includes(parseInt(sec.dataset.id))){
                sec.classList.add('hidden')
            }
        })
    }

    //filtre les differents id des ingredients par rapports aux id des recettes
    //et retourne un tableau 
    getFilterIdRecipes(element){
        const datasetId = element.dataset.id.split(',').map(id => parseInt(id))//recupération des data-id
        const tab = datasetId.filter(id => this.tabIdRecipes.includes(id))//filter avec les id des recttes
        return tab
    }

    //affichage des bons ingredients
    showIngredients(tagName){
        this.dropdowns[0].childNodes.forEach(ingredient => {
            const tab = this.getFilterIdRecipes(ingredient) //filtrage
            //si le tableau est non null et on affiche pas le tag selectionné
            if(tab.length == 0 || ingredient.textContent.toLowerCase() == tagName){
                ingredient.classList.add('hidden')
            } 
        })
    }    

    //affichage des bons appareils
    showDevices(tagName){
        this.dropdowns[1].childNodes.forEach(device => {
            const tab = this.getFilterIdRecipes(device)
            if(tab.length == 0 || device.textContent.toLowerCase() == tagName){
                device.classList.add('hidden')
            } 
        })
    }

    //affichage des bons ustensiles
    showTools(tagName){
        this.dropdowns[2].childNodes.forEach(tool => {
            const tab = this.getFilterIdRecipes(tool)
            if(tab.length == 0 || tool.textContent.toLowerCase() == tagName){
                tool.classList.add('hidden')
            } 
        })
    }

    
    //suppression des tags
    //on réaffiche tout
    //on parcours chaque tag en affichange ceux qui correspondent aux recettes
    //on affiche ou cache en fonction de la barre de recherche
    removeTags(){
        this.tabIdRecipes = []
        let tabQuery = []
        const tags = document.querySelectorAll('.tag')
        const querySearch = document.querySelector('#Recherche').value //valeur de la recherche
        this.showEverything()
        this.recipesQuery.forEach((recipe, index) => { //on sort les id correspondant a la recherche
            if(recipe.includes(querySearch)){
                tabQuery.push(index + 1) //index + 1 car notre tableau commence a 0
            }
        })
        if(tags.length > 0){ //s'il y a des tags, on affiche les données correspondantes
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
        if(querySearch.length > 2){ //s'il y a une recheche on affiche ou cache les elements
            this.section.childNodes.forEach(sec => {
                tabQuery.includes(parseInt(sec.dataset.id)) ? sec.classList.remove('hidden-query') : sec.classList.add('hidden-query')
            })
            this.dropdowns[0].childNodes.forEach(node => {
                this.getFilterTabQuery(node, tabQuery)
            })
            this.dropdowns[1].childNodes.forEach(node => {
                this.getFilterTabQuery(node, tabQuery)
            })
            this.dropdowns[2].childNodes.forEach(node => {
                this.getFilterTabQuery(node, tabQuery)
            })
        }
    }

    //filtre les dataset-id par rapport a notre tableau d'id recettes
    getFilterTabQuery(node, tabQuery){
        const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
        const tab = datasetId.filter(id => tabQuery.includes(id))
        tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
    }

    //enleve les classes qui cachent les elements
    removeHidden(element){
        element.classList.remove('hidden')
        element.classList.remove('hidden-query-tag')
        element.classList.remove('hidden-query')
    }

    //affichages de toutes les datas
    showEverything(){
        this.section.childNodes.forEach(recipe => {
            this.removeHidden(recipe)
        })
        this.dropdowns[0].childNodes.forEach(ingredient => {
            this.removeHidden(ingredient)
        })
        this.dropdowns[1].childNodes.forEach(device => {
            this.removeHidden(device)
        })
        this.dropdowns[2].childNodes.forEach(tool => {
            this.removeHidden(tool)
        })
    }

    /*
    evenements pour les tags
    on créer un tableau par rapport a la recherche
    et on affiche ou pas les elements
    s'il n'y a pas de resultat à la recherche, on affiche un message d'erreur
    */
    eventsInput(element, dropdown){
        const that = this
        document.querySelector('.dropdown__search.'+ element).addEventListener('input', function(e){
            const query = this.value.trim().toLowerCase()
            let count = 0
            if(query.length > 2){ //valeur recherche > 2
                dropdown.childNodes.forEach(node => { //pour chaque tag
                    if(!node.textContent.includes(query) ){ //s'il ny a pas de tags correspondant
                        if(node.textContent !== 'Aucun filtre disponible'){
                            node.classList.add('hidden-query-tag') //on cache
                        }
                        
                    } else {
                        if(node.textContent !== 'Aucun filtre disponible'){//s'il y en a
                            node.classList.remove('hidden-query-tag') //on affiche
                            count++ //compteur pour savoir combien d'element correspondent
                        }
                    } 
                })
                const noElement = document.getElementById('no-element')
                if(count == 0){ //aucun element ne correspond ?
                    if(!noElement){
                        const textNoElement = document.createElement('p') //creation message 'Aucun filtre'
                        textNoElement.setAttribute('id', 'no-element')
                        textNoElement.textContent = 'Aucun filtre disponible'
                        dropdown.appendChild(textNoElement)
                    }
                } else {
                    noElement ? noElement.remove():0 //on supprime le message si des tags sont restants
                }
            } else { // recherche < 2 
                const noElement = document.getElementById('no-element')
                noElement ? noElement.remove():0 //supprime le message 'Aucun filtre'
                //reaffiche les tags cachés par la recherche
                dropdown.childNodes.forEach(node => node.classList.remove('hidden-query-tag'))
            }
            
        })
    }

    /**Evenement de recherche de recette avec la barre principale
     * s'il y a des tags, on recupère un tableau filtrer des id des recettes
     * on affiche les bons elements en regadant les id des recettes et des tags
     * ou on affiche un message d'erreur
     */
    eventRecipes(){
        const that = this;
        
        document.querySelector('#Recherche').addEventListener('input', function(e){
            const query = this.value.trim().toLowerCase()
            if(query.length > 2){ //recherche > 2
                let tabQuery = []
                //let tabTags = []
                that.recipesQuery.forEach((recipe, index) => { //recupère les recettes correspondantes
                    if(recipe.includes(query)){
                        tabQuery.push(index + 1)
                    }
                })
            
                if(that.tabIdRecipes.length > 0){ //s'il y a un ou des tags
                    tabQuery = tabQuery.filter(id => that.tabIdRecipes.includes(id))
                } 
                that.section.childNodes.forEach(sec => { //affichage recettes
                    tabQuery.includes(parseInt(sec.dataset.id)) ? sec.classList.remove('hidden-query') : sec.classList.add('hidden-query')
                })
                that.dropdowns[0].childNodes.forEach(node => { //affichages ingredients
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                that.dropdowns[1].childNodes.forEach(node => { //affichage appareils
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                that.dropdowns[2].childNodes.forEach(node => { //affichage ustensiles
                    const datasetId = node.dataset.id.split(',').map(id => parseInt(id))
                    const tab = datasetId.filter(id => tabQuery.includes(id))
                    tab.length > 0 ? node.classList.remove('hidden-query') : node.classList.add('hidden-query')
                })
                const noResult = document.getElementById('no-result')
                if(tabQuery.length == 0){ // s'il n'y a aucun element
                    if(!noResult){
                        const noRecipeText = document.createElement('p')//creation message 'Aucune recette'
                        noRecipeText.setAttribute('id', 'no-result')
                        noRecipeText.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.'
                        document.querySelector('main').appendChild(noRecipeText)
                    }
                } else {
                    noResult? noResult.remove():0 //suppression du message s'il existe et qu'il y a des elements a afficher
                }
            } else { // recherche < 2
                const noResult = document.getElementById('no-result')
                noResult? noResult.remove():0
                //reaffichage de tous les éléments cachés par la recherche
                that.section.childNodes.forEach(sec => sec.classList.remove('hidden-query'))
                that.dropdowns[0].childNodes.forEach(node => node.classList.remove('hidden-query'))
                that.dropdowns[1].childNodes.forEach(node => node.classList.remove('hidden-query'))
                that.dropdowns[2].childNodes.forEach(node => node.classList.remove('hidden-query'))
            }
        })
    }

    //evenements de recherche recettes et tags
    search(){
        this.eventRecipes()
        this.eventsInput('Ingredients', this.dropdowns[0])
        this.eventsInput('Appareils', this.dropdowns[1])
        this.eventsInput('Ustensiles', this.dropdowns[2])
    }


    //affichage de touts les bons éléments d'un coup
    showDatas(tagName){
        this.showRecipes()
        this.showIngredients(tagName)
        this.showDevices(tagName)
        this.showTools(tagName)
    }

    //appelle des data et creation du html
    async main(){
        await this.fetchData()
        this.createDatas()
    }

    
}

const rec = new Index()
rec.main()


    
