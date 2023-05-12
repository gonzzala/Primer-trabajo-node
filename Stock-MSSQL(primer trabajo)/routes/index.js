const express = require('express');

const authRouter = require('./auth.router');
const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const movementsRouter = require('./movements.router');

function routes(app) {
const router = express.Router();
 app.use('/api', router);
 router.use('/auth', authRouter);
 router.use('/categories', categoriesRouter);
 router.use('/products', productsRouter);
 router.use('/movements', movementsRouter);
 }

module.exports = routes;