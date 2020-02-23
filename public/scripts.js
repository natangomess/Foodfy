const cards = document.querySelectorAll('.card')
const blocks = document.querySelectorAll(".block")
const description = document.querySelector(".description")

for (let card of cards) {
  card.addEventListener("click", function() {
    const recipeId = card.getAttribute("id")
    window.location.href = `/recipe/${recipeId}`
  })
}

const showHides = document.getElementsByClassName('block')

for (let showHide of showHides) {
  const buttonH4 = showHide.querySelector('h4')

  buttonH4.addEventListener('click', function() {
    if (buttonH4.innerHTML == "ESCONDER") {
      showHide.querySelector('.description').classList.add('hidden')
      buttonH4.innerHTML = "MOSTRAR"
    } else {
      showHide.querySelector('.description').classList.remove('hidden');
      buttonH4.innerHTML = "ESCONDER"
    }
  })
}
