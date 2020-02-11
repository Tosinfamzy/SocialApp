const Post = require('../models/Post')
exports.viewCreateScreen = function(req, res) {
    res.render('create-post')
}

exports.create = function(req, res) {
    let post = new Post(req.body, req.session.user._id);
    post.create().then(() => {
        res.send()
    }).catch((error) => {
        res.send(error)
    })
}