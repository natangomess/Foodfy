const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {
  if (currentPage.includes(item.getAttribute("href"))) {
    item.classList.add("active")
  }
}

function paginate(selectedPage, totalPages) {
  let pages = [],
      oldPage

  for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
      if(oldPage && currentPage - oldPage > 2) {
        pages.push("...")
      }

      if(oldPage && currentPage - oldPage == 2) {
        pages.push(currentPage - 1)
      }

      pages.push(currentPage)

      oldPage = currentPage
    }
  }

  return pages
}

function createPagination(pagination) {

  const filter = pagination.dataset.filter
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages = paginate(page, total)

  let elements = ""

  for (let page of pages) {
    if(String(page).includes("...")) {
      elements += `<span>${page}</span>`
    }else{
      if(filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
      }else{
        elements += `<a href="?page=${page}">${page}</a>`
      }
    }
  }

  pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) {
  createPagination(pagination)
}

const blocks = document.querySelectorAll(".block")
const description = document.querySelector(".description")

const showHides = document.getElementsByClassName('block')

for (let showHide of showHides) {
  const buttonH4 = showHide.querySelector('h4')

  buttonH4.addEventListener('click', function() {
    if (buttonH4.innerHTML == "ESCONDER") {
      showHide.querySelector('.description').classList.add('hidden')
      buttonH4.innerHTML = "MOSTRAR"
    } else {
      showHide.querySelector('.description').classList.remove('hidden')
      buttonH4.innerHTML = "ESCONDER"
    }
  })
}
