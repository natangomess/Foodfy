const express = require('express')
const routes = express.Router()
const foodfy = require('./app/controllers/foodfy')
const adminRecipes = require('./app/controllers/recipes')
const adminChefs = require('./app/controllers/chefs')

routes.get('/', function(req, res) {
  return res.redirect("/index")
})

routes.get('/index', foodfy.index)
routes.get('/about', foodfy.about)
routes.get('/recipes', foodfy.recipes)
routes.get('/chefs', foodfy.chefs)
routes.get("/recipes/:id", foodfy.show)

routes.get('/adminRecipes', adminRecipes.index)
routes.get('/adminRecipes/create', adminRecipes.create)
routes.get('/adminRecipes/:id', adminRecipes.show)
routes.get('/adminRecipes/:id/edit', adminRecipes.edit)
routes.post('/adminRecipes', adminRecipes.post)
routes.put('/adminRecipes', adminRecipes.put)
routes.delete('/adminRecipes', adminRecipes.delete)

routes.get('/adminChefs', adminChefs.index)
routes.get('/adminChefs/create', adminChefs.create)
routes.get('/adminChefs/:id', adminChefs.show)
routes.get('/adminChefs/:id/edit', adminChefs.edit)
routes.post('/adminChefs', adminChefs.post)
routes.put('/adminChefs', adminChefs.put)
routes.delete('/adminChefs', adminChefs.delete)

module.exports = routes