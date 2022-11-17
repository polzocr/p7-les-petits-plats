const ingre = document.querySelector('.dropdown__search.ingredients')
ingre.addEventListener('click', function(e) {
    this.removeAttribute('value')
})

ingre.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
})

const app = document.querySelector('.dropdown__search.appareil')
app.addEventListener('click', function(e) {
    this.removeAttribute('value')
})

app.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
})

const ust = document.querySelector('.dropdown__search.ustensile')
ust.addEventListener('click', function(e) {
    this.removeAttribute('value')
})

ust.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
})