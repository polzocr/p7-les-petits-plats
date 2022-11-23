class Ingredient extends Dropdown {
    constructor(thing, value, type, that){
        super(thing, value,type, that)
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
                const tagName = x.textContent.toLowerCase()
                ingreThis.getIdRecipes(that, this)
                that.tags.push(tagName)
                tags.push(tagName)
                const newTag = new Tag(tagName, 'Ingredients')
                newTag.displayTag()
                newTag.removeTag(that)
                ingreThis.closeDropdown()
                that.showRecipes()
                that.showIngredients(tagName)
                that.showDevices(tagName)
                that.showTools(tagName)
                //that.updateDatas()
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