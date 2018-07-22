import { createLogger, format, transports } from 'winston'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'

const {align, colorize, combine, printf, timestamp} = format,
  node_env = process.env.NODE_ENV || 'dev',
  tsFormat = () => new Date().toISOString()

let flag,
  log_dir,
  consoleRequestLogger,
  fileRequestLogger

// setup request logger
if ('dev' !== node_env) {
  log_dir = path.join(process.cwd(), 'log')
  flag = 'a'
  consoleRequestLogger = morgan('combined')

} else {
  log_dir = path.join(process.cwd(), 'log/dev')
  flag = 'w'
  consoleRequestLogger = morgan('dev')
}

fileRequestLogger = morgan('common', {stream: fs.createWriteStream(path.join(log_dir, 'access.log'), {flags: flag})})

// setup application logger
const errorLog = createLogger({
    format: combine(
      colorize(),
      timestamp(),
      align(),
      printf(error => `${error.timestamp} ${error.level}: ${error.message}`)
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(log_dir, 'errors.log'),
        timestamp: tsFormat,
        level: 'info'
      })
    ]
  }),

  infoLog = createLogger({
    format: combine(
      colorize(),
      timestamp(),
      align(),
      printf(error => `${error.timestamp} ${error.level}: ${error.message}`)
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(log_dir, 'application.log'),
        timestamp: tsFormat,
        level: 'info'
      })
    ]
  })

module.exports = {
  consoleRequestLogger: consoleRequestLogger,
  fileRequestLogger: fileRequestLogger,
  errorLog: errorLog,
  infoLog: infoLog
}