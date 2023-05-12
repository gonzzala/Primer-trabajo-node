const DB = require('../database/database');
const sql = require('mssql');

module.exports = {

  get: async (id) => {
  return DB.connect().then((pool) => {
      return pool.request().input('id', sql.Int, id).query('SELECT * FROM movements WHERE idproduct = @id')
      .then((ret) => ret.recordset)
      .catch((err) => {throw err.message });
    })
  },
  
  create:  async (data) => {
    return DB.connect().then((pool) => {
      return pool.request().input('idproduct', sql.Int, data.idproduct).input('quantity', sql.Int, data.quantity).input('observations', sql.VarChar(255), data.observations).output('stock', sql.Int).execute('spCreateMovement')
      .then(function(ret) { return ret.output })
      .catch(function(err) { throw err.message });
    })
    },
   
    delete: async (id) => {
      return DB.connect().then((pool) => {
        return pool.request().input('id', sql.Int, id).query('SELECT idproduct, quantity FROM movements WHERE idmovement = @id')
        .then((data) => {
            pool.request().input('idproduct', sql.Int, data.recordset[0].idproduct).input('stock', sql.Int, data.recordset[0].quantity).query('UPDATE products SET stock = stock - @stock WHERE idproduct = @idproduct')})
           .then(() => {
               return pool.request().input('id', sql.Int, id).query('DELETE FROM movements WHERE idmovement = @id') })
               .then((result) => {return result})  
                  .catch(function(err) { throw err.message });
      })
      
  }
}