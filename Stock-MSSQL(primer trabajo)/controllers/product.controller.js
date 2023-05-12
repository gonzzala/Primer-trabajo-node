const ProductService = require('../services/product.service');

class ProductController {

static async get(req, res) {

        return ProductService.get(req.params.id)
        .then(function(products) {
            return res.status(200).json(products)
        })
        .catch(function(err) {
            return res.status(500).json({message: err})
        });
   }

   
async create(req, res) {

    let product = new ProductService();
    return product.create(req.body).then(function(idproduct) {
        return res.status(201).json(idproduct)
    })
    .catch(function(err) {
          return res.status(400).json({message: err})
    });
}

static async update(req, res) {

   try {
    const registro = await ProductService.update(req.body) 
    return res.status(200).json({'registros actualizados' : registro[0]})  
   }
    catch(err) {
         return res.status(400).json({message: err})
    };
}

static async state(req, res) {

    return ProductService.state(req.params.id).then(function(value) {
        return res.status(200).json(value)
    })
    .catch(function(err) {
        return res.status(400).json({message: err})
    });
}

static async delete(req, res) {

    return ProductService.delete(req.params.id).then(function(result) {
        console.log(result)
        if(result==1)
        return res.status(200).json({message: 'Se eliminó el producto id ' + req.params.id})
        else
        return res.status(200).json({message: 'No se encontró el producto id ' + req.params.id})
    })
    .catch(function(err) {
        return res.status(400).json({message: err})
    });
}
}

module.exports =ProductController