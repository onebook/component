'use strict'

const bodyParser = require('koa-bodyparser')
const multipart = require('co-multipart')
const serve = require('koa-static')
const mount = require('koa-mount')
const path = require('path')
const koa = require('koa')

let app = koa()
app.use(bodyParser())
app.use(serve(path.join(__dirname, '../../example')))
app.use(mount('/build', serve(path.join(__dirname, '../../build'))))

app.use(function*(next) {
  this.set('Access-Control-Max-Age', '60')
  this.set('Access-Control-Allow-Origin', '*')
  this.set('Access-Control-Allow-Credentials', 'true')
  this.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  this.set('Access-Control-Allow-Headers', 'Accept,Content-Type,Origin,X-Requested-With')
  yield next
})

app.use(function*() {
  if (this.request.is('multipart/*')) {
    var parts = yield * multipart(this)
    this.request.body = parts.field

    parts.files.forEach(function(file) {
      console.log('temp file path: %s', file.path)
    })

    setTimeout(function() {
      parts.dispose()
    }, 30 * 1000)

    this.body = {
      message: 'success'
    }

    return
  }

  this.body = {
    type: this.request.type,
    body: this.request.body,
    headers: this.header,
    method: this.method,
    query: this.query
  }
})

app.listen(3000)
