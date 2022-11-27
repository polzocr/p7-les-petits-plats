class Dropdown {
    constructor(thing, value, type, that){
        this.thing = thing
        this.value = value
        this.type = type
        this.that = that
        this.dropdown = document.querySelectorAll('.dropdown__all')[value]
        this.ingre = document.querySelector('#'+type)
        this.eventOpen()
        this.eventClose()
    }

    //creation du template selon son type
    createTemplate(){
        let idRecipes;
        switch(this.type){
            case 'Ingredients':
                idRecipes = this.that.ingredientsId;
                break;
            case 'Appareils':
                idRecipes = this.that.devicesId;
                break;
            case 'Ustensiles':
                idRecipes = this.that.toolsId;
                break;
        }
        //on créé chaque élement et on y ajout les id des recettes correspondantes dans data-id
        for(let i=0; i<this.thing.length; i++){ 
            
                const p = document.createElement('button')
                p.setAttribute('class', this.type)
                p.setAttribute('data-id', idRecipes[i])
                p.textContent = this.thing[i]
                this.dropdown.appendChild(p)
            
        }
    }

    //evenement qui ajoute un tag et réinintialise le tableau de recette lors du click
    applyEvents(){
        const This = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()//recupération du nom du tag
                This.getIdRecipes(This.that, this)  //creation d'un tableau d'id recette
                const newTag = new Tag(tagName, This.type) //creation du tag
                newTag.displayTag(this.dataset.id) //affichage du tag
                newTag.removeTag(This.that) //evenement qui delete le tag lors du click sur la croix
                This.closeDropdown()    //on ferme le dropdown
                This.that.showDatas(tagName) //on met a jours les datas
            })
        })
    }

    //recupération d'un tableau filtré d'id recettes
    getIdRecipes(that, thisEvent){
        if(that.tabIdRecipes == 0){
            that.tabIdRecipes = thisEvent.dataset.id.split(',').map(x => parseInt(x))
        } else {
            const tab = thisEvent.dataset.id.split(',').map(x => parseInt(x))
            that.tabIdRecipes = tab.filter(id => that.tabIdRecipes.includes(id))
        }
    }

    //ouverture du dropdown lors du click
    eventOpen(){
        const that = this
        this.ingre.addEventListener('click', function(e){
            const placeholder = this.placeholder
            if(this.value == 'Ingredients' || this.value =='Appareils' || this.value == 'Ustensiles'){
                this.value = ''
            }
            
            this.removeAttribute('value')
            this.setAttribute('placeholder', placeholder) //affichage du placeholder lors du click
            this.nextElementSibling.classList.add('show')
            this.nextElementSibling.classList.add(that.type)
        })
    }

    //fermeture du dropdown lors du click
    eventClose(){
        const that = this
        this.ingre.addEventListener('blur', function(e){
            if(!e.relatedTarget || e.relatedTarget.tagName !== 'BUTTON'){//si on click autre part que sur un tag
                if(this.value == '') {
                this.value = that.type
                this.setAttribute('value', that.type)
                }
                this.nextElementSibling.classList.remove('show')
                this.nextElementSibling.classList.remove(that.type)
            }
            
        })
    }
    //on ferme le drop down si on ajoute un tag et on réinitialise les elements
    closeDropdown(){
        this.dropdown.childNodes.forEach(node => node.classList.remove('hidden-query-tag'))
        this.ingre.value = this.type
        this.ingre.setAttribute('value', this.type)
        this.ingre.nextElementSibling.classList.remove('show')
        this.ingre.nextElementSibling.classList.remove(this.type)
    }
}









// const ingre = document.querySelector('#ingredients')
// ingre.addEventListener('click', eventIngredientOpen)
// ingre.addEventListener('blur', eventIngredientClose)

// function eventIngredientOpen(){
//     ingre.removeAttribute('value')
//     ingre.nextElementSibling.classList.add('show')
//     ingre.nextElementSibling.classList.add('ingredients')
// }





// ingre.addEventListener('focusout', function(e) {
//     e.stopImmediatePropagation()
//     this.setAttribute('value', 'Ingrédients')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('ingredients')
// })

// const app = document.querySelector('.dropdown__search.appareil')
// app.addEventListener('click', function(e) {
//     this.removeAttribute('value')
//     this.nextElementSibling.classList.add('show')
//     this.nextElementSibling.classList.add('appareil')
// })

// app.addEventListener('focusout', function(e) {
//     this.setAttribute('value', 'Appareils')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('appareil')
// })

// const ust = document.querySelector('.dropdown__search.ustensile')
// ust.addEventListener('click', function(e) {
//     this.removeAttribute('value')
//     this.nextElementSibling.classList.add('show')
//     this.nextElementSibling.classList.add('ustensile')
// })

// ust.addEventListener('focusout', function(e) {
//     this.setAttribute('value', 'Ustensiles')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('ustensile')
// })