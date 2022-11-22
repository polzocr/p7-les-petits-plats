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
                that.tags.push(x.textContent)
                tags.push(x.textContent)
                const newTag = new Tag(x.textContent, 'Appareils')
                newTag.displayTag()
                newTag.removeTag(that)
                devThis.closeDropdown()
                that.updateDatas()
            })
        })
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