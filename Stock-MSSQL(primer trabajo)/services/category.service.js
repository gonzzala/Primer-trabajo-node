const DB = require('../database/database');
const sql = require('mssql');

module.exports = {

  get: async ()=> {
    let pool = await DB.connect();
  return new Promise(function (resolve, reject) {
    let qry = "SELECT * FROM categories";
    pool.request().query(qry, (err, categories) => {
      if (err) {
        reject(err);
      } else {
        resolve(categories.recordset);
      }
    });
  }) 
},

show: async (id)=> {
  try {
    const parametro = id;
    let qry1 = "select * from vwGetcategory";
    let qry2 = "select * from vwGetcategory where cantidad >= @parametro";
    let pool = await DB.connect();
    if (typeof parametro !== 'undefined') {
    let categorie = await pool.request().input('parametro', sql.Int, parametro).query(qry2);
    if(categorie.rowsAffected > 0) return categorie.recordset; 
    else return [];  }
    else {
      let categorie = await pool.request().input('parametro', sql.Int, id).query(qry1);
      if(categorie.rowsAffected > 0) return categorie.recordset; 
      else return [];  }
  }
  catch (err) {
      throw 'Error inesperado'
  }
},

create:  async (data) => {
  return DB.connect().then((pool) => {
  const enabledValue = data.enabled || 1; 
  return pool.request().input('description', sql.VarChar(100), data.description).input('enabled', sql.Int, enabledValue).execute('spCreatecategorie')
  .then(function(value) { return value.output })
  .catch(function(err) { throw 'Error en los datos enviados' });
  })
  }
}
