class Tool extends Dropdown{
    constructor(thing, value, type, that){
        super(thing,value,type, that)
    }

    applyEvents(that, tags){
        const ingreThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                that.tabIdRecipes = this.dataset.id.split(',').map(x => parseInt(x))
                that.tags.push(tagName)
                tags.push(tagName)
                const newTag = new Tag(tagName, 'Ustensiles')
                newTag.displayTag()
                newTag.removeTag(that)
                ingreThis.closeDropdown()
                that.showRecipes()
                that.showIngredients(tagName)
                that.showDevices(tagName)
                that.showTools(tagName)
            })
        })
    }
}