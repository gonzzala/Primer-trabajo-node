const CategoryService = require('../services/category.service');

module.exports = {

    get: async function (req, res) {

       return  CategoryService.get()
       .then(function(categories) {
            return res.status(200).json(categories)
        })
        .catch(function(err) {
            return res.status(400).json({error: err.message})
        });
   },

 /*   show: async function (req, res) {

    return  CategoryService.show()
    .then(function(categories) {
         return res.status(200).json(categories)
     })
     .catch(function(err) {
         return res.status(400).json({error: err.message})
     });
}, */

    show: async function (req, res) {

    return CategoryService.show(req.params.id)
    .then(function(id) {
        return res.status(200).json(id)
    })
    .catch(function(err) {
        return res.status(500).json({message: err})
    });
}, 
   create:  async (req, res) => {
    return CategoryService.create(req.body)
    .then(function(data) {
    return res.status(201).json({stock : data})
    })
    .catch(function(err) {
      console.log(err)
        return res.status(500).json({message: err})
    });
    }

}