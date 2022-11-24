class Tool extends Dropdown{
    constructor(thing, value, type, that){
        super(thing,value,type, that)
    }

    applyEvents(that){
        const toolThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                toolThis.getIdRecipes(that, this)
                const newTag = new Tag(tagName, 'Ustensiles')
                newTag.displayTag(this.dataset.id)
                newTag.removeTag(that)
                toolThis.closeDropdown()
                that.showDatas(tagName)
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

