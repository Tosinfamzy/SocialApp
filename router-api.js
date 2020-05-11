const apiRouter = require('express').Router()
const usersController = require('./controllers/usersController')
const postController = require('./controllers/postController')
const followController = require('./controllers/followController')
const cors = require('cors')

apiRouter.use(cors())

apiRouter.post('/login', usersController.apiLogin)
apiRouter.post('/create-post', usersController.apimustBeLoggedIn, postController.apiCreate)
apiRouter.delete('/post/:id', usersController.apimustBeLoggedIn, postController.apiDelete)
apiRouter.get('/postsByAuthor/:username', usersController.apiGetPostsByUsername)
module.exports = apiRouter