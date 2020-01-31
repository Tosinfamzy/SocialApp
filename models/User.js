const usersCollection = require('../db')
    .db()
    .collection('users');
const validator = require('validator');
const bcrypt = require('bcryptjs');

let User = function(data) {
    this.data = data;
    this.errors = [];
};

User.prototype.validate = function() {
    if (this.data.username == '') {
        this.errors.push('You must provide a username.');
    }
    if (
        this.data.username != '' &&
        !validator.isAlphanumeric(this.data.username)
    ) {
        this.errors.push('Username can only contain letters and numbers.');
    }
    if (!validator.isEmail(this.data.email)) {
        this.errors.push('You must provide a valid email address.');
    }
    if (this.data.password == '') {
        this.errors.push('You must provide a password.');
    }
    if (this.data.password.length > 0 && this.data.password.length < 12) {
        this.errors.push('Password must be at least 12 characters.');
    }
    if (this.data.password.length > 50) {
        this.errors.push('Password cannot exceed 50 characters.');
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
        this.errors.push('Username must be at least 3 characters.');
    }
    if (this.data.username.length > 30) {
        this.errors.push('Username cannot exceed 30 characters.');
    }

    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
    };
};

User.prototype.register = function() {
    // Step #1: Validate user data
    this.validate();

    if (!this.errors.length) {
        let salt = bcrypt.genSaltSync(10);
        this.data.password = bcrypt.hashSync(this.data.password, salt);
        usersCollection.insertOne(this.data);
    }
};

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        usersCollection.findOne({ username: this.data.username },
            (err, userInput) => {
                if (
                    userInput &&
                    bcrypt.compareSync(this.data.password, userInput.password)
                ) {
                    resolve('Logged in');
                } else {
                    reject('invalid username and password');
                }
            },
        );
    });
};

module.exports = User;