class Tag{
    constructor(name, type){
        this.name = name
        this.type = type
    }

    displayTag(dataId){
        // const element = `<div class="tag ${this.type}">
        //                     <p>${this.name}</p>
        //                     <button class="${this.type}"><span>+</span></button>
        //                 </div>`;
        // document.querySelector('#tags').innerHTML += element
        const divTag = document.createElement('div')
        divTag.setAttribute('class', 'tag')
        divTag.classList.add(this.type)
        divTag.setAttribute('data-id', dataId)
        const p = document.createElement('p')
        p.textContent = this.name
        const button = document.createElement('a')
        button.setAttribute('class', this.type)
        const span = document.createElement('span')
        span.textContent = '+'
        button.appendChild(span)
        divTag.appendChild(p)
        divTag.appendChild(button)


        document.querySelector('#tags').appendChild(divTag)
    }

    removeTag(that){
        const tags = document.querySelectorAll('#tags .tag p')
        tags.forEach(tag => {
            tag.nextElementSibling.addEventListener('click', function(e){
                this.parentElement.remove()
                that.removeTags()
            })
        })
    }
}