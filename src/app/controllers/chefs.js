const Chef = require('../model/Chef')

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query

    page = page || 1
    limit = limit || 8
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

        return res.render('adminChefs/index', { chefs, pagination, filter })
      }
    }

    Chef.paginate(params)
  },
  create(req, res) {
    return res.render('adminChefs/create')
  },
  post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == "") {
        return res.send('Please, fill all fields!')
      }
    }

    Chef.create(req.body, function(chef) {
      return res.redirect(`/adminChefs/${chef.id}`)
    })
  },
  show(req, res) {
    Chef.find(req.params.id, function(recipes) {
      Chef.total(req.params.id, function(chef) {
        if(!chef) return res.send('Chef not found!')

        return res.render('adminChefs/show', { recipes, chef })
      })
    })
  },
  edit(req, res) {
    Chef.find(req.params.id, function(chef) {
      if(!chef) return res.send('Chef not found!')

      return res.render('adminChefs/edit', { chef })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == "") {
        return res.send('Please, fill all fields!')
      }
    }

    Chef.update(req.body, function() {
      return res.redirect(`/adminChefs/${req.body.id}`)
    })
  },
  delete(req, res) {
    Chef.delete(req.body.id, function() {
      return res.redirect('/adminChefs')
    })
  }
}