const ingre = document.querySelector('#ingredients')
ingre.addEventListener('click', eventIngredientOpen)
ingre.addEventListener('blur', eventIngredientClose)

function eventIngredientOpen(){
    ingre.removeAttribute('value')
    ingre.nextElementSibling.classList.add('show')
    ingre.nextElementSibling.classList.add('ingredients')
}
function eventIngredientClose(e){
    if(e.relatedTarget == null){
        ingre.setAttribute('value', 'Ingrédients')
        ingre.nextElementSibling.classList.remove('show')
        ingre.nextElementSibling.classList.remove('ingredients')
    }
}


// ingre.addEventListener('focusout', function(e) {
//     e.stopImmediatePropagation()
//     this.setAttribute('value', 'Ingrédients')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('ingredients')
// })

// const app = document.querySelector('.dropdown__search.appareil')
// app.addEventListener('click', function(e) {
//     this.removeAttribute('value')
//     this.nextElementSibling.classList.add('show')
//     this.nextElementSibling.classList.add('appareil')
// })

// app.addEventListener('focusout', function(e) {
//     this.setAttribute('value', 'Appareils')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('appareil')
// })

// const ust = document.querySelector('.dropdown__search.ustensile')
// ust.addEventListener('click', function(e) {
//     this.removeAttribute('value')
//     this.nextElementSibling.classList.add('show')
//     this.nextElementSibling.classList.add('ustensile')
// })

// ust.addEventListener('focusout', function(e) {
//     this.setAttribute('value', 'Ustensiles')
//     this.nextElementSibling.classList.remove('show')
//     this.nextElementSibling.classList.remove('ustensile')
// })