const express = require('express');
const MovementController = require('../controllers/movement.controller');
const MovementSchema = require('../schemas/movement.schema');
const validatorLogin = require('../middlewares/validator.login');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
router.get('/:id', validatorLogin, MovementController.get)
router.post('/', [validatorLogin, validatorHandler(MovementSchema)], async function (req, res) { MovementController.create(req, res); })
router.delete('/:id', validatorLogin,MovementController.delete)
module.exports = router;