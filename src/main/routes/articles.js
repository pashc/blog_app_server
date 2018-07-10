import Article from '../models/article'
import express from 'express'

const router = express.Router()

router.route('/articles')
  .get((req, res) => {
    Article.find((err, articles) => {
      if (err)
        res.send(err)

      res.json(articles.map(article => article.toDto()))
    })
  })

router.route('/articles/:slug')
  .get((req, res) => {
    Article.findOne({slug: req.params.slug},
      (err, article) => {
        if (err)
          res.send(err)

        if (article)
          res.json(article.toDto())
        else
          res.status(404).json({error: 'article could not be found'})
      })
  })

module.exports = router