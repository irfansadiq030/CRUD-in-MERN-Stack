const express = require('express')

const { saveUser, getUsers, getSingleUser, deleteUser } = require('../controller/userController')

const router = express.Router();

router.route('/add').post(saveUser);
router.route('/users').get(getUsers);
router.route('/user/:id').get(getSingleUser);
router.route('/user/:id').delete(deleteUser);


module.exports = router