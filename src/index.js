const express = require('express');
const SeLoger = require("./api/seloger");
const MySQLConnection = require("./db/mysql_connection");
const Housing = require("./model/housing");

const app = express()
const port = 3000
var seloger = new SeLoger()

const table_name = "seloger_annonces"

connector = new MySQLConnection();
connector.create_table(table_name);

app.get('/', async(req, res) => {

  // Get data from SeLoger API
  seloger_data = await seloger.get_list()
  var data = JSON.parse(seloger_data)

  // Push data as Objects to the database
  data.items.forEach(element => {
    advert = new Housing(element.title, element.city, element.zipCode, element.livingArea, element.rooms, element.level, element.price, element.photos[0]);
    connector.insert_content(table_name, advert)
  });

  const result = await connector.get_content(table_name)
  console.log(result)
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
