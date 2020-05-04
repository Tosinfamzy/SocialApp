const express = require('express');

const router = express.Router();
const usersController = require('./controllers/usersController');
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')

router.get('/', usersController.home);
router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/create-post', usersController.mustBeLoggedIn, postController.viewCreateScreen);
router.post('/create-post', usersController.mustBeLoggedIn, postController.create)
router.get('/post/:id', postController.viewSingle)
router.get('/profile/:username', usersController.ifUserExist, usersController.sharedProfileData, usersController.profilePostScreen)
router.get('/profile/:username/followers', usersController.ifUserExist, usersController.sharedProfileData, usersController.followersProfileScreen)
router.get('/profile/:username/following', usersController.ifUserExist, usersController.sharedProfileData, usersController.followingProfileScreen)
router.get('/post/:id/edit', usersController.mustBeLoggedIn, postController.viewEditScreen)
router.post('/post/:id/edit', usersController.mustBeLoggedIn, postController.edit)
router.post('/post/:id/delete', usersController.mustBeLoggedIn, postController.delete)
router.post('/search', usersController.mustBeLoggedIn, postController.search)
router.post('/addFollow/:username', usersController.mustBeLoggedIn, followController.addFollow)
router.post('/removeFollow/:username', usersController.mustBeLoggedIn, followController.removeFollow)
module.exports = router;