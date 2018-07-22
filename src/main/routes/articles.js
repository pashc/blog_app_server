import Article from '../models/article'
import express from 'express'
import loggers from '../loggers'

const router = express.Router()

router.route('/articles')
  .get((req, res) => {
    Article.find((err, articles) => {
      if (err) {
        loggers.errorLog.info(err)
        res.status(500).json({error: 'Internal Server Error'})
      }

      res.json(articles.map(article => article.toDto()))
    })
  })

router.route('/articles/:slug')
  .get((req, res) => {
    Article.findOne({slug: req.params.slug},
      (err, article) => {
        if (err) {
          loggers.errorLog.info(err)
          res.status(500).json({error: 'Internal Server Error'})
        }

        if (article)
          res.json(article.toDto())
        else {
          loggers.infoLog.error(`article for slug=[${req.params.slug}] could not be found.`)
          res.status(404).json({error: 'article could not be found'})
        }
      })
  })

module.exports = router