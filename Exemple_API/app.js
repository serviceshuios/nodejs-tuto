require('babel-register')

const express = require('express')
const morgan = require('morgan')
const app = express()


//middelware
// il sera lu à chaque requête et on peut y intégrer des node_modules
/*app.use((req,res, next) => {
  console.log('URL : '+ req.url)
  next()
})*/
app.use(morgan('dev'))
app.get('/api', (req,res) => {
  res.send('Root API')
})

app.get('/api/v1', (req,res) => {
  res.send('API Version 1')
})

app.get('/api/v1/books/:id/:nom', (req,res) => {
  res.send(req.params)
})

app.listen(9090,() => {
  console.log("Started on port 9090")
})
