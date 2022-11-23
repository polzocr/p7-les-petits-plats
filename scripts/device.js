class Device extends Dropdown{
    constructor(thing, value, type, that){
        super(thing, value,type, that)
        // this.devices = devices
        // this.dropdown = document.querySelectorAll('.dropdown__all')[1]
        // this.dev = document.querySelector('#devices')
        // this.eventDeviceOpen()
        // this.eventDeviceClose()
    }

  
    applyEvents(that, tags){
        const devThis = this
        this.dropdown.childNodes.forEach(x => {
            x.addEventListener('click', function(e){
                const tagName = x.textContent.toLowerCase()
                devThis.getIdRecipes(that, this)
                that.tags.push(tagName)
                tags.push(tagName)
                const newTag = new Tag(tagName, 'Appareils')
                newTag.displayTag(this.dataset.id)
                newTag.removeTag(that)
                devThis.closeDropdown()
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














    

    // createTemplate(){
    //     this.devices.forEach(x => {
    //         const p = document.createElement('button')
    //         p.setAttribute('class', 'appareil')
    //         p.textContent = x
    //         this.dropdown.appendChild(p)
    //     })
    // }


    // eventDeviceOpen(){
    //     this.dev.addEventListener('click', function(e){
    //         this.removeAttribute('value')
    //         this.nextElementSibling.classList.add('show')
    //         this.nextElementSibling.classList.add('appareil')
    //     })
    // }

    // eventDeviceClose(){
    //     this.dev.addEventListener('blur', function(e){
    //         if(e.relatedTarget == null){
    //             this.setAttribute('value', 'Appareil')
    //             this.nextElementSibling.classList.remove('show')
    //             this.nextElementSibling.classList.remove('appareil')
    //         }
    //     })
        
    // }

    // closeDropdown(){
    //     this.dev.nextElementSibling.classList.remove('show')
    //     this.dev.nextElementSibling.classList.remove('appareil')
    // }
}