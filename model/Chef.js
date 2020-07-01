const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
  all(callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      GROUP BY chefs.id
      ORDER BY name ASC`, function(err, results) {
        if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO chefs (
        name,
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(Date.now()).iso
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name as chef_name
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      ORDER BY recipes.created_at DESC`, [id], function(err, results) {
        if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  total(id, callback) {
    db.query(`
      SELECT chefs.*, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
      WHERE chefs.id = $1
      GROUP BY chefs.id`, [id], function(err, results) {
        if(err) throw `Database Error! ${err}`

      callback(results.rows[0])
    })
  },
  findBy(filter, callback) {
    db.query(`
      SELECT *
      FROM chefs
      WHERE chefs.name ILIKE '%${filter}%'
      GROUP BY chefs.id
      ORDER BY name ASC`, function(err, results) {
        if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  },
  update(data, callback) {
    const query = `
      UPDATE chefs SET
        name=($1),
        avatar_url=($2)
      WHERE id = $3
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`

      return callback()
    })
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params

    let query = "",
        filterQuery = "",
        totalQuery = `(
          SELECT count(*) FROM chefs
        ) AS total`

    if(filter) {
      filterQuery = `
        WHERE chefs.name ILIKE '%${filter}%'
      `
      totalQuery = `(
          SELECT count(*) FROM chefs
          ${filterQuery}
        ) AS total
      `
    }

    query = `
      SELECT chefs.*, ${totalQuery}, count(recipes) AS total_recipes
      FROM chefs
      LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
      ${filterQuery}
      GROUP BY chefs.id
      ORDER BY name ASC
      LIMIT $1
      OFFSET $2
    `

    db.query(query, [limit, offset], function(err, results) {
      if(err) throw `Database Error! ${err}`

      callback(results.rows)
    })
  }
}