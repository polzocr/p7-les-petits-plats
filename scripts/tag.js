class Tag{
    constructor(name, type){
        this.name = name
        this.type = type
    }

    displayTag(){
        // const element = `<div class="tag ${this.type}">
        //                     <p>${this.name}</p>
        //                     <button class="${this.type}"><span>+</span></button>
        //                 </div>`;
        // document.querySelector('#tags').innerHTML += element
        const divTag = document.createElement('div')
        divTag.setAttribute('class', 'tag')
        divTag.classList.add(this.type)
        const p = document.createElement('p')
        p.textContent = this.name
        const button = document.createElement('button')
        button.setAttribute('class', this.type)
        const span = document.createElement('span')
        span.textContent = '+'
        button.appendChild(span)
        divTag.appendChild(p)
        divTag.appendChild(button)


        document.querySelector('#tags').appendChild(divTag)
    }

    removeTag(that){
        const thisTag = this
        const tags = document.querySelectorAll('#tags .tag p')
        tags.forEach(tag => {
            tag.nextElementSibling.addEventListener('click', function(e){
                this.parentElement.remove()
                thisTag.rebuildDatas(that)
                that.displayData()
            })
        })
    }

    rebuildDatas(that){
        that.newRecipes = that.recipes
        that.newIngredients = that.ingredients
        that.newDevices = that.devices
        that.newTools = that.tools
        that.tagsIng = that.tagsIng.filter(tag => tag !== this.name)
        that.tagsDev = that.tagsDev.filter(tag => tag !== this.name)
        that.tagsTool = that.tagsTool.filter(tag => tag !== this.name)
        that.tags = that.tags.filter(tag => tag !== this.name)
    }
}