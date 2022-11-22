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
        for(let i=0; i<30; i++){
            if(this.thing[i]){
                const p = document.createElement('button')
                p.setAttribute('class', this.type)
                p.setAttribute('data-id', idRecipes[i])
                p.textContent = this.thing[i]
                this.dropdown.appendChild(p)
            }
        }
    }
    events(that, tags){
        return this.applyEvents(that, tags)
    }

    eventOpen(){
        const that = this
        this.ingre.addEventListener('click', function(e){
            this.removeAttribute('value')
            this.nextElementSibling.classList.add('show')
            this.nextElementSibling.classList.add(that.type)
        })
    }

    eventClose(){
        const that = this
        this.ingre.addEventListener('blur', function(e){
            if(e.relatedTarget == null){
                this.setAttribute('value', that.type)
                this.nextElementSibling.classList.remove('show')
                this.nextElementSibling.classList.remove(that.type)
            }
        })
        
    }

    closeDropdown(){
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