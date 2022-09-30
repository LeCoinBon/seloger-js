mysql = require('mysql');
const { Sequelize } = require('sequelize');

class MySQLConnection {

  MYSQL_ADDON_HOST="bqmh6k01zfi0hetzlfgk-mysql.services.clever-cloud.com"
  MYSQL_ADDON_DB="bqmh6k01zfi0hetzlfgk"
  MYSQL_ADDON_USER="u9liidobdogzasgx"
  MYSQL_ADDON_PORT=3306
  MYSQL_ADDON_PASSWORD="CuRW2ZRyUwjDvOHteqoC"
  MYSQL_ADDON_URI="mysql://u9liidobdogzasgx:CuRW2ZRyUwjDvOHteqoC@bqmh6k01zfi0hetzlfgk-mysql.services.clever-cloud.com:3306/bqmh6k01zfi0hetzlfgk"
  
  constructor (){
    this.connection = new Sequelize(this.MYSQL_ADDON_DB, this.MYSQL_ADDON_USER, this.MYSQL_ADDON_PASSWORD, {
      dialect: "mysql", host: this.MYSQL_ADDON_HOST
    });

    this.get_tables();
  };
  
  get_tables() {
    this.connection.query('SHOW TABLES', function (error, results, fields) {
      this.tables = results

      if (error) throw error;
      console.log(error);
    });
  };

  create_table(table_name) {
    this.connection.query(`CREATE TABLE IF NOT EXISTS ${table_name} (
        appart_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        zipcode VARCHAR(10),
        area INT,
        rooms INT NOT NULL,
        level INT,
        price INT NOT NULL,
        photo VARCHAR(255)
      )`, function (error, results, fields) {
      this.tables = results
      if (error) throw error;
      console.log(error);
    });
  };

  drop_table(table_name){
    this.connection.query(`DROP TABLE ${table_name}`, function (error, results, fields) {
      this.tables = this.get_tables();
      if (error) throw error; {
        console.log(error);
      }
    })
  };
  
  async get_content(table_name) {
    const request = await this.connection.query(`SELECT * FROM ${table_name}`, function (error, results, fields) {
      return results;
      if (error) throw error;
      console.log(error);
    });
    return request;
  };

  insert_content(table, object) {
    this.connection.query(`INSERT INTO ${table} (title, city, zipcode, area, rooms, level, price, photo)
                            VALUES('${object.title}', '${object.city}', '${object.zipcode}', ${object.area}, ${object.rooms}, ${object.level}, ${object.price}, '${object.photo}')`, function (error, results, fields) {
      if (error) throw error;
      console.log(error);
    });
  };

  disconnect() {
    connection.end();
  };
};

module.exports = MySQLConnection