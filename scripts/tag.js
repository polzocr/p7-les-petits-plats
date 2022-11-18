class Tag{
    constructor(name, type){
        this.name = name
        this.type = type
    }

    displayTag(){
        const element = `<div class="tag ${this.type}">
                            <p>${this.name}</p>
                            <button class="${this.type}"><span>+</span></button>
                        </div>`;
        document.querySelector('#tags').innerHTML += element
    }

    
}