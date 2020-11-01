const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users/:id', db.getUserById)
app.get('/:orderlist', db.getOrderList)
app.post('/:insert', db.insertorder)
app.get('/order/:getorder', db.getOrder)
app.get('/schedule/:getschedule', db.getschedule)
app.get('/detail/:getdetail', db.getdetail)
app.get('/result/:getresult', db.getresult)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})