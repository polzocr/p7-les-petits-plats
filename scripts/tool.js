class Tool extends Dropdown{
    constructor(thing, value, type){
        super(thing,value,type)
    }

    applyEvents(that, tags){
        const ingreThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                that.tags.push(tagName)
                tags.push(tagName)
                const newTag = new Tag(tagName, 'Ustensiles')
                newTag.displayTag()
                newTag.removeTag(that)
                ingreThis.closeDropdown()
                that.updateDatas()
            })
        })
    }
}