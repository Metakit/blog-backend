const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
const verify = util.promisify(jwt.verify)
const fs = require('fs')
const crypto = require('crypto')
const error_list = require('./modules/error').error_list

let pem = fs.readFileSync(path.join(__dirname, 'key.pem'))
let key = pem.toString('ascii')
const hmac = crypto.createHmac('sha1', key)
const secret = hmac.digest('hex')

const login = require('./routes/login')
const register = require('./routes/register')
const add = require('./routes/add')

global.userlist = new Array()

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(jwtKoa({secret:secret, cookie:"token"}).unless({
  path:[/^\/api\/login/, /^\/api\/register/]
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(login.routes(), login.allowedMethods())
app.use(register.routes(), register.allowedMethods())
app.use(add.routes(), register.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
