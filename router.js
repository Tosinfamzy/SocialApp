const express = require('express');

const router = express.Router();
const usersController = require('./controllers/usersController');
const postController = require('./controllers/postController')

router.get('/', usersController.home);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/create-post', usersController.mustBeLoggedIn, postController.viewCreateScreen);
router.post('/create-post', usersController.mustBeLoggedIn, postController.create)

module.exports = router;