const User = require('../models/User');
const Post = require('../models/Post');
exports.mustBeLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        req.flash('errors', 'you mucst be logged in to perform that action')
        req.session.save(() => { res.redirect('/') })
    }
}

exports.home = (req, res) => {
    if (req.session.user) {
        res.render('home-dashboard', { username: req.session.user.username, avatar: req.session.user.avatar });
    } else {
        res.render('home-guest', { errors: req.flash('errors'), regError: req.flash('regError') });
    }
};

exports.register = (req, res) => {
    let user = new User(req.body);
    user.register().then(() => {
        req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id }
        req.session.save(() => { res.redirect('/') })
    }).catch((regErrors) => {
        regErrors.forEach((error) => {
            req.flash('regError', error)
        });
        req.session.save(() => { res.redirect('/') })
    })

};

exports.login = (req, res) => {
    let user = new User(req.body);

    user.login()
        .then(result => {
            req.session.user = { avatar: user.avatar, username: user.data.username, _id: user.data._id };
            req.session.save(function() {
                res.redirect('/');
            });
        })
        .catch(err => {
            req.flash('errors', err)
            req.session.save(() => { res.redirect('/') })
        });
};

exports.logout = async(req, res) => {
    await req.session.destroy();
    res.redirect('/');
};

exports.ifUserExist = (req, res, next) => {
    User.findByUsername(req.params.username)
        .then((userDocument) => {
            req.profileUser = userDocument
            next()
        })
        .catch(() => {
            res.render('404')
        })
}
exports.profilePostScreen = (req, res) => {
    // console.log('here' + req.profileUser);
    Post.findPostById(req.profileUser.data._id).then((posts)=>{
        res.render('profile', {
            posts:posts,
            profileUsername: req.profileUser.data.username,
            profileAvatar: req.profileUser.avatar,
        })
    }).catch(()=>{
        res.render('404')
    })
    
}