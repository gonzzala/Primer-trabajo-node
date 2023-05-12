const MovementService = require('../services/movement.service');

module.exports = {

get:  async function(req, res) {
    
  try {
    movements = await MovementService.get(req.params.id) 
    return res.status(201).json(movements)
    }
  catch(err) {
    return res.status(400).json(err)
   }     
   },

create:  async (req, res) => {
  return MovementService.create(req.body)
  .then(function(data) {
  return res.status(201).json({stock : data})
  })
  .catch(function(err) {
    console.log(err)
      return res.status(500).json({message: err})
  });
  },

  delete:  async (req, res) => {
    return MovementService.delete(req.params.id)
  .then(function(data) {
      return res.status(201).json({message: 'Se realizó la eliminación y actualización de stock'})
  })
  .catch(function(err) {
      return res.status(500).json({message: err})
  });
  },
}
