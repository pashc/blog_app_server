import articles from './routes/articles'
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import loggers from './loggers'
// =================================================
//                      Config
// =================================================

const port = process.env.SERVER_PORT || 3000,
  db_host = process.env.DB_HOST || 'localhost',
  db_port = process.env.DB_PORT || 27017,
  database = process.env.DATABASE || 'blog'

// =================================================
//                      Setup
// =================================================

// express
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// database
const db_url = `mongodb://${db_host}:${db_port}/${database}`
mongoose.connect(db_url)
  .then(() => {
    console.log('successfully connected to ' + db_url)
  })

// request logging
app.use(loggers.consoleRequestLogger)
app.use(loggers.fileRequestLogger)

// =================================================
//                      Routes
// =================================================

const router = express.Router()

router.get('/', function (req, res) {
  res.json({message: 'Hello World!'})
})

app.use('/api', router)
app.use('/api', articles)

// =================================================
//                      Start Server
// =================================================

loggers.infoLog.info(`starting server on port=[${port}]`)
const server = app.listen(port)

module.exports = server
