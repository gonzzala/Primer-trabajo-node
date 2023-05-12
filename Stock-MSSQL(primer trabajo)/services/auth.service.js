const boom = require('@hapi/boom');
const DB = require('../database/database');
const sql = require('mssql');

module.exports = {

  auth: async (email, password) => {

       return DB.connect().then((pool) => {
              return pool.request().input('email', sql.VarChar(50), email).input('password', sql.VarChar(50), password).execute('sp_login')
        .then(function(ret) { 
          if(ret.recordset[0].id !== null) {
              return {id: ret.recordset[0].id, message: "login succesfully"} }
                  else
              throw boom.unauthorized("invalid access")
         })
        .catch(function(err) { throw boom.badRequest(err) });
      })
    }
}