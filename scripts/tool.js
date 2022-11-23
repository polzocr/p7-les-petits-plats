class Tool extends Dropdown{
    constructor(thing, value, type, that){
        super(thing,value,type, that)
    }

    applyEvents(that, tags){
        const toolThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                toolThis.getIdRecipes(that, this)
                that.tags.push(tagName)
                tags.push(tagName)
                const newTag = new Tag(tagName, 'Ustensiles')
                newTag.displayTag()
                newTag.removeTag(that)
                toolThis.closeDropdown()
                that.showRecipes()
                that.showIngredients(tagName)
                that.showDevices(tagName)
                that.showTools(tagName)
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
}

