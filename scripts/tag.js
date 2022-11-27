class Tag{
    constructor(name, type){
        this.name = name
        this.type = type
    }

    displayTag(dataId){
        // creation d'un tag une fois l'élément cliqué
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

    //evenement de suppresion du tag et appelle de la fonction removeTags()
    removeTag(that){
        const tags = document.querySelectorAll('#tags .tag p')
        tags.forEach(tag => {
            tag.nextElementSibling.addEventListener('click', function(e){
                this.parentElement.remove() //suppression
                that.removeTags()   //reaffichage des bons elements
            })
        })
    }
}