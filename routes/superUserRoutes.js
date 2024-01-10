const express = require('express');
const superUserController = require('./../controllers/superUserController');

const superUserRoutes = express.Router();

superUserRoutes
    .route('/superUser/createEmployee')
    .post(superUserController.createEmployee);

superUserRoutes
    .route('/superUser/credentials')
    .post(superUserController.credentials);

module.exports = superUserRoutes;