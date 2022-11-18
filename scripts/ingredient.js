class Ingredient extends Dropdown {
    constructor(thing, value, type){
        super(thing, value,type)
        // //this.ingredients = ingredients
        // this.dropdown = document.querySelectorAll('.dropdown__all')[0]
        // this.ingre = document.querySelector('#Ingredients')
        // // this.eventIngredientOpen()
        // // this.eventIngredientClose()
    }

    

    applyEvents(that, tags){
        const ingreThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                tags.push(x.textContent)
                const newTag = new Tag(x.textContent, 'Ingredients')
                newTag.displayTag()
                ingreThis.closeDropdown()
                that.displayIngredients()
            })
        })
    }









    


    // createTemplate(){
    //     for(let i=0; i<30; i++){
    //         if(this.ingredients[i]){
    //             const p = document.createElement('button')
    //             p.setAttribute('class', 'ingredients')
    //             p.textContent = this.ingredients[i]
    //             this.dropdown.appendChild(p)
    //         }
    //     }
    // }

    // eventIngredientOpen(){
    //     this.ingre.addEventListener('click', function(e){
    //         this.removeAttribute('value')
    //         this.nextElementSibling.classList.add('show')
    //         this.nextElementSibling.classList.add('ingredients')
    //     })
    // }

    // eventIngredientClose(){
    //     this.ingre.addEventListener('blur', function(e){
    //         if(e.relatedTarget == null){
    //             this.setAttribute('value', 'Ingrédients')
    //             this.nextElementSibling.classList.remove('show')
    //             this.nextElementSibling.classList.remove('ingredients')
    //         }
    //     })
        
    // }

    // closeDropdown(){
    //     this.ingre.nextElementSibling.classList.remove('show')
    //     this.ingre.nextElementSibling.classList.remove('ingredients')
    // }
}