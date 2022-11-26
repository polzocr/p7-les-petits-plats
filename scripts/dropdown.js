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
        for(let i=0; i<this.thing.length; i++){
            
                const p = document.createElement('button')
                p.setAttribute('class', this.type)
                p.setAttribute('data-id', idRecipes[i])
                p.textContent = this.thing[i]
                this.dropdown.appendChild(p)
            
        }
    }

    applyEvents(){
        const This = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                This.getIdRecipes(This.that, this)
                const newTag = new Tag(tagName, This.type)
                newTag.displayTag(this.dataset.id)
                newTag.removeTag(This.that)
                This.closeDropdown()
                This.that.showDatas(tagName)
            })
        })
    }

    getIdRecipes(that, thisEvent){
        if(that.tabIdRecipes == 0){
            that.tabIdRecipes = thisEvent.dataset.id.split(',').map(x => parseInt(x))
        } else {
            const tab = thisEvent.dataset.id.split(',').map(x => parseInt(x))
            that.tabIdRecipes = tab.filter(id => that.tabIdRecipes.includes(id))
        }
    }

    eventOpen(){
        const that = this
        this.ingre.addEventListener('click', function(e){
            const placeholder = this.placeholder
            if(this.value == 'Ingredients' || this.value =='Appareils' || this.value == 'Ustensiles'){
                this.value = ''
            }
            
            this.removeAttribute('value')
            this.setAttribute('placeholder', placeholder)
            this.nextElementSibling.classList.add('show')
            this.nextElementSibling.classList.add(that.type)
        })
    }

    eventClose(){
        const that = this
        this.ingre.addEventListener('blur', function(e){
            if(!e.relatedTarget || e.relatedTarget.tagName !== 'BUTTON'){
                if(this.value == '') {
                this.value = that.type
                this.setAttribute('value', that.type)
                }
                this.nextElementSibling.classList.remove('show')
                this.nextElementSibling.classList.remove(that.type)
            }
            
        })
    }

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