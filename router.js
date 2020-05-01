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
router.get('/post/:id', postController.viewSingle)
router.get('/profile/:username', usersController.ifUserExist, usersController.profilePostScreen)
router.get('/post/:id/edit', usersController.mustBeLoggedIn, postController.viewEditScreen)
router.post('/post/:id/edit', usersController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', usersController.mustBeLoggedIn, postController.delete)

module.exports = router;