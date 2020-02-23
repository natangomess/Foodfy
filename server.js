const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require("./data")

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
})

server.get('/index', function(req, res) {
  const index = {
    title_box: "As melhores receitas",
    text_box: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
    img_box: "assets/chef.png",
    title_more: "Mais acessadas",
    mores: [
      { id: "burger.png", img_more: "/assets/burger.png", name: "Triplo bacon burger", cooker: "Jorge Relato" },
      { id: "pizza.png", img_more: "/assets/pizza.png", name: "Pizza 4 estações", cooker: "Fabiana Melo" },
      { id: "espaguete.png", img_more: "/assets/espaguete.png", name: "Espaguete ao alho", cooker: "Júlia Kinoto" },
      { id: "lasanha.png", img_more: "/assets/lasanha.png", name: "Lasanha mac n' cheese", cooker: "Juliano Vieira" },
      { id: "doce.png", img_more: "/assets/doce.png", name: "Docinhos pão-do-céu", cooker: "Ricardo Golvea" },
      { id: "asinha.png", img_more: "/assets/asinhas.png", name: "Asinhas de frango ao barbecue", cooker: "Vania Steroski" }
    ]
  }

  return res.render('index', { index })
})

server.get('/about', function(req,res) {
  const about = {
    title_about: "Sobre o Foodfy",
    paragraph1_about: "Nullam feugiat metus est, ut tempor est pellentesque non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc sit amet nisl lobortis, malesuada enim sed, consequat tellus. Mauris eu urna ut neque tempor pellentesque quis id erat. Nam lobortis scelerisque dui, sed varius urna aliquam quis. Maecenas consequat, est ut pellentesque pellentesque, est felis elementum sem, vitae blandit justo diam a urna. Vestibulum eleifend, erat quis tincidunt varius, arcu diam convallis erat, vitae sagittis enim augue a nunc. Proin quis quam et tortor lobortis maximus imperdiet sed massa. Cras urna massa, malesuada sed tellus in, blandit pulvinar sapien. Duis feugiat nunc est, a auctor lorem efficitur sit amet. Cras ut metus et urna auctor rhoncus ac et quam. Curabitur mauris est, mollis sed fermentum nec, dapibus ac augue.",
    paragraph2_about: "Suspendisse fermentum eros nec ante ullamcorper, et viverra nisl rhoncus. Curabitur faucibus ultricies velit, at congue diam rutrum id. Mauris porta, ligula ut rhoncus fringilla, velit orci imperdiet tortor, ut vulputate dui orci vitae turpis. Nam nec leo mauris. Pellentesque sed euismod mi, ac efficitur quam. Nulla auctor vel nunc lobortis auctor. Mauris sapien mi, efficitur at lectus eget, finibus vestibulum enim. Integer vel hendrerit nulla. Nam enim urna, posuere vitae dapibus ac, pretium ac felis.",
    title_started: "Como Tudo Começou",
    paragraph1_started: "Proin maximus ex vitae orci pretium, varius aliquam ligula ultricies. Integer sed ex at ligula sagittis convallis sed ut mi. Donec magna ex, viverra ac diam in, faucibus dictum mi. In hac habitasse platea dictumst. Donec sodales mauris nunc, at vehicula sapien dignissim quis. Morbi nisi neque, faucibus id faucibus et, accumsan eget urna. Duis sagittis lacinia nisi vitae bibendum. Nunc sed ornare lorem, vel fringilla massa. Proin iaculis eleifend auctor. Integer lacinia sodales nisl, sit amet volutpat lorem lacinia eget. Praesent scelerisque quis elit eu ornare.",
    paragraph2_started: "Donec vestibulum semper nibh rhoncus sollicitudin. Cras tincidunt odio eget tellus molestie placerat. Donec aliquet mi tincidunt dolor aliquam, vitae hendrerit elit tempus. Integer ullamcorper felis mauris, vel volutpat risus feugiat ut. Nam neque arcu, pretium porttitor dui vel, faucibus dictum dolor. Sed id malesuada nibh, eu laoreet urna. Etiam a finibus ante. Sed nec mi nibh. Maecenas imperdiet sed massa eu iaculis.",
    title_recipes: "Nossas Receitas",
    paragraph_recipes: "Cras vel imperdiet quam. Maecenas scelerisque justo at odio finibus, sed cursus libero venenatis. Integer metus neque, accumsan vitae fermentum et, maximus sed lacus. Nam aliquet dolor non velit faucibus scelerisque. Mauris quis egestas odio, non commodo nulla. Nullam et suscipit mi. Vestibulum ut quam at sem eleifend scelerisque.",
  }

  return res.render('about', { about })
})

server.get('/recipes', function(req, res) {
  return res.render('recipes', { items: recipes })
})

server.get("/recipe/:index", function(req, res) {
  const recipeIndex = req.params.index
  const pageRecipe = recipes[recipeIndex]

  return res.render("recipe", { recipe: pageRecipe })
})

server.listen(5000, function() {
  console.log('Server is running')
})