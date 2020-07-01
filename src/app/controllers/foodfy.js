const Recipe = require('../model/Recipe')
const Chef = require('../model/Chef')

module.exports = {
  index(req, res) {
    const index = {
      title_box: "As melhores receitas",
      text_box: "Aprenda a construir os melhores pratos com receitas criadas por profissionais do mundo inteiro.",
      img_box: "assets/chef.png",
      title_more: "Mais acessadas",
    } 
  
    let { limit } = req.query

    limit = limit || 6

    const params = {
      limit,
      callback(recipes) {

        return res.render('foodfy/index', { recipes, index })
      }
    }

    Recipe.paginate(params)
  },
  about(req, res) {
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
  
    return res.render('foodfy/about', { about })
  },
  recipes(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 12
    let offset = limit * (page - 1)

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(recipes) {
        
        const pagination = {
          total: Math.ceil(recipes[0].total / limit),
          page
        }

        return res.render('foodfy/recipes', { recipes, pagination, filter })
      }
    }

    Recipe.paginate(params)
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send('Recipe not found!')

      return res.render('foodfy/show', { recipe })
    })
  },
  chefs(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 24
    let offset = limit * (page - 1)
    
    const params = {
      filter,
      page,
      limit,
      offset,
      callback(chefs) {
        
        const pagination = {
          total: Math.ceil(chefs[0].total / limit),
          page
        }
        
        return res.render('foodfy/chefs', { chefs, pagination, filter })
      }
    }

    Chef.paginate(params)
  }
}