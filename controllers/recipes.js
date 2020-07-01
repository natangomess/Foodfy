const Recipe = require('../model/Recipe')

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 6
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

        return res.render('adminRecipes/index', { recipes, pagination, filter })
      }
    }

    Recipe.paginate(params)
  },
  create(req, res) {
    Recipe.chefSelectOptions(function(options) {
      return res.render('adminRecipes/create', { chefOptions: options })
    })
  },
  post(req, res) {
    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/adminRecipes/${recipe.id}`)
    })
  },
  show(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send('Recipe not found!')

      return res.render('adminRecipes/show', { recipe })
    })
  },
  edit(req, res) {
    Recipe.find(req.params.id, function(recipe) {
      if(!recipe) return res.send('Recipe not found!')

      Recipe.chefSelectOptions(function(options) {
        return res.render('adminRecipes/edit', { recipe, chefOptions: options })
      })
    })
  },
  put(req, res) {
    Recipe.update(req.body, function() {
      return res.redirect(`/adminRecipes/${req.body.id}`)
    })
  },
  delete(req, res) {
    Recipe.delete(req.body.id, function() {
      return res.redirect('/adminRecipes')
    })
  }
}