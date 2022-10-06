
const express = require('express')
const cors = require('cors')
const { expressjwt: expressJwt } = require('express-jwt')
const jwks = require('jwks-rsa')
const axios = require('axios')


const app = express()
app.use(cors())

var verifyJwt = expressJwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-1an5rfjm.us.auth0.com/.well-known/jwks.json'

  }),
  audience: 'unique identifier ',
  issuer: 'https://dev-1an5rfjm.us.auth0.com/',
  algorithms: ['RS256']
})

app.use(verifyJwt)

app.get('/', (req, res) => {
  res.send("hello from index route")
})

app.get('/accesstoken', (req, res) => {
  res.send('acess token live')
})

app.get('/protected', (req, res) => {
  res.send('hello from protected route')
})

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404;
  next(error)

})
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message || 'Internal server error'
  res.status(status).send(message)
})

app.listen(4000, () => console.log('server on port 4000'))