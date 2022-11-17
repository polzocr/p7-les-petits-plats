const ingre = document.querySelector('.dropdown__search.ingredients')
ingre.addEventListener('click', function(e) {
    this.removeAttribute('value')
    this.nextElementSibling.classList.add('show')
    this.nextElementSibling.classList.add('ingredients')
})

ingre.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
    this.nextElementSibling.classList.remove('show')
    this.nextElementSibling.classList.remove('ingredients')
})

const app = document.querySelector('.dropdown__search.appareil')
app.addEventListener('click', function(e) {
    this.removeAttribute('value')
    this.nextElementSibling.classList.add('show')
    this.nextElementSibling.classList.add('appareil')
})

app.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
    this.nextElementSibling.classList.remove('show')
    this.nextElementSibling.classList.remove('appareil')
})

const ust = document.querySelector('.dropdown__search.ustensile')
ust.addEventListener('click', function(e) {
    this.removeAttribute('value')
    this.nextElementSibling.classList.add('show')
    this.nextElementSibling.classList.add('ustensile')
})

ust.addEventListener('focusout', function(e) {
    this.setAttribute('value', 'Ingrédients')
    this.nextElementSibling.classList.remove('show')
    this.nextElementSibling.classList.remove('ustensile')
})