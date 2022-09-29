const express = require('express');
const SeLoger = require("./api/seloger");
const app = express()
const port = 3000
var seloger = new SeLoger()

app.get('/', async(req, res) => {
  list = await seloger.get_list()
  res.send(list)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})