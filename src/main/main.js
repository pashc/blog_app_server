import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import morgan from 'morgan'

// =================================================
//                      Config
// =================================================

const node_env = process.env.NODE_ENV || 'dev',
  port = process.env.SERVER_PORT || 3000,
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
let flag,
  log_dir

if ('dev' !== node_env) {
  log_dir = path.join(process.cwd(), 'log/access.log')
  flag = 'a'
  app.use(morgan('combined'))

} else {
  log_dir = path.join(process.cwd(), 'log/dev/access.log')
  flag = 'w'
  app.use(morgan('dev'))
}

app.use(morgan('common', {stream: fs.createWriteStream(log_dir, {flags: flag})}))


// =================================================
//                      Routes
// =================================================

const router = express.Router()
const articles = require('./routes/articles')

router.get('/', function (req, res) {
  res.json({message: 'Hello World!'})
})

app.use('/api', router)
app.use('/api', articles)

// =================================================
//                      Start Server
// =================================================

const server = app.listen(port)

module.exports = server
