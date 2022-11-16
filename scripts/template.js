class Template {
    constructor(recipe){
        recipe && Object.assign(this, recipe)
    }

    createTemplate(){
        let ingredients = ''
        const ingre = this.ingredients.forEach(x => {
            if(x.quantity){
                if(x.unit){
                    ingredients += `<p><span>${x.ingredient}</span>: ${x.quantity} ${x.unit}</p> \n`
                }else {
                    ingredients += `<p><span>${x.ingredient}</span>: ${x.quantity}</p> \n`
                }
            } else {
                ingredients += `<p><span>${x.ingredient}</span></p> \n`
            }
            
        })
        
        const article = `<article class="card">
                            <div class="card__image">
                                
                            </div>
                            <div class="card__infos">
                                <div class="card__infos__header">
                                    <h2>${this.name}</h2>
                                    <div class="card__infos__header__timer">
                                        <i class="fa fa-clock"></i>
                                        <p>${this.time} min</p>
                                    </div>
                                </div>
                                <div class="card__infos__recipe">
                                    <div class="card__infos__recipe__ingredients">
                                    ${ingredients}
                                    </div>
                                    <div class="card__infos__recipe__description">
                                        <p>${this.description}</p>
                                    </div>
                                </div>
                            </div>
                        </article>`;
        
        
        
        // const article = document.createElement('article')
        // article.classList.add('card')

        // const divImage = document.createElement('div')
        // divImage.classList.add('card__image')

        // const divInfos = document.createElement('div')
        // divInfos.classList.add('card__infos')

        // article.appendChild(divImage)
        // article.appendChild(divInfos)

        // const infoHeader = document.createElement



        return article
                           
    }
}


