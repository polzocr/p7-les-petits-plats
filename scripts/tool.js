class Tool extends Dropdown{
    constructor(thing, value, type){
        super(thing,value,type)
    }

    applyEvents(that, tags){
        const ingreThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                that.tags.push(x.textContent)
                tags.push(x.textContent)
                const newTag = new Tag(x.textContent, 'Ustensiles')
                newTag.displayTag()
                newTag.removeTag(that)
                ingreThis.closeDropdown()
                that.updateDatas()
            })
        })
    }
}