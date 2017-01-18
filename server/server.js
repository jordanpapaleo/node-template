import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import http from 'http'
import morgan from 'morgan'

const app = express()
const server = http.createServer(app)
module.exports = server

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(morgan('dev'))

app.get('/test', (req, res) => {
  res
    .status(200)
    .send('Success Connection')
})

app.get('*', (req, res) => {
  res
    .status(404)
    .send('Not a endpoint')
})
