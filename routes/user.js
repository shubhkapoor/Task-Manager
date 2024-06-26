const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/user').post(userController.createUser);

module.exports = router;