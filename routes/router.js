const express = require('express');
const loginController = require('./../controllers/loginController');
const logoutController = require('./../controllers/logoutController');
const getUserController = require('./../controllers/userControllers/getUserController');
const createUserController = require('./../controllers/userControllers/createUserController');
const deleteUserController = require('./../controllers/userControllers/deleteUserController');

const router = express.Router();

router
    .route('/login')
    .post(loginController.login);

router
    .route('/logout')
    .post(logoutController.logout)

router
    .route('/user/list')
    .get(loginController.verify,getUserController.getUser);

router
    .route('/user/create')
    .post(loginController.verify,createUserController.createUser);
    
router
    .route('/user/delete/:userId')
    .delete(loginController.verify,deleteUserController.specialUsers,deleteUserController.filterRoles,deleteUserController.deleteUser)


module.exports = router;