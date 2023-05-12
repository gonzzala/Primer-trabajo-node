const express = require('express');

const CategoryController = require('../controllers/category.controller');
const validatorLogin = require('../middlewares/validator.login');

const router = express.Router();

router.get('/', validatorLogin, function(req, res) { CategoryController.get(req, res) })
router.get('/products/:id?', validatorLogin, function(req, res) { CategoryController.show(req, res) })
router.post('/', validatorLogin, async function (req, res) { CategoryController.create(req, res); })
module.exports = router;