const DB = require('../database/database');
const sql = require('mssql');

class ProductService {

static async get(id) {
  try {
    let qry = "SELECT * FROM vwGetProducts WHERE idproduct = CASE WHEN @id IS NULL THEN idproduct ELSE @id END";
    let pool = await DB.connect();
    let products = await pool.request()
    .input('id', sql.Int, id)
    .query(qry);
    if(products.rowsAffected > 0) return products.recordset; 
    else return [];  
  }
  catch (err) {
      throw 'Error inesperado'
  }
}  
async create(data) {

  return DB.connect().then(pool => {
  return pool.request()
  .input('idcategory', sql.Int, data.idcategory)
  .input('denomination', sql.VarChar(50), data.denomination)
  .input('additional_info', sql.VarChar(100), data.additional_info)
  .input('price', sql.Decimal(8,2), data.price)
  .input('stock', sql.Int, data.stock)
  .output('idproduct', sql.Int)
  .execute("spCreateProduct")}).then(function(value) { return value.output })
  .catch(function(err) { throw 'Error en los datos enviados' });
}

//https://tediousjs.github.io/node-mssql/
//https://www.tabnine.com/code/javascript/functions/mssql/Request/input

static async update(data) {
  return await DB.connect().then(pool => {
  return pool.request()
  .input('idproduct', sql.Int, data.idproduct)
  .input('idcategory', sql.Int, data.idcategory)
  .input('denomination', sql.VarChar(50), data.denomination)
  .input('additional_info', sql.VarChar(100), data.additional_info)
  .input('price', sql.Decimal(8,2), data.price)
  .input('stock', sql.Int, data.stock)
  .query('UPDATE products SET idcategory = @idcategory, denomination = @denomination, additional_info = @additional_info, price = @price, stock = @stock, updated_at = GETDATE() WHERE idproduct = @idproduct')
  .then(function(value) { return Promise.resolve(value.rowsAffected) })
  .catch(function(err) { return Promise.reject(err.message)});
})
}

static state(id) {
  
  return new Promise(function (resolve, reject) {
       return DB.connect().then(function(pool) { pool.request().input('id', sql.Int, id).query('UPDATE products SET enabled = 0 WHERE idproduct = @id', (err, ret) => {
      if (err) {
        reject(err);
      } else {
        resolve(ret);
      }
    });
  }) 
})
}
static async delete(id) {
    return DB.connect().then(() => {
      return sql.query`DELETE FROM products WHERE idproduct = ${id}`})
      .then(function(ret) { return ret.rowsAffected })
      .catch(function(err) { throw err.message });
  }

}
module.exports = ProductService;