const postCollection = require('../db').db().collection('posts')
const ObjectID = require('mongodb').ObjectID
module.exports = class Post {
    constructor(data, userid) {
        this.data = data
        this.errors = []
        this.userid = userid
    }
    cleanUp() {
        if (typeof(this.data.title) != "string") { this.data.title = "" }
        if (typeof(this.data.body) != "string") { this.data.title = "" }

        this.data = {
            title: this.data.title.trim(),
            body: this.data.body.trim(),
            createdDate: new Date,
            author: ObjectID(this.userid)
        }
    }
    validate() {
        if (this.data.title === '') { this.errors.push('you must provide a title') }
        if (this.data.body === '') { this.errors.push('you must provide a body') }
    }
    create() {
        return new Promise((resolve, reject) => {
            this.cleanUp()
            this.validate()
            if (!this.errors.length) {
                postCollection.insertOne(this.data).then(() => {
                    resolve()
                }).catch(() => {
                    this.errors.push('Problems connecting to database')
                    reject(this.errors)
                })
            } else {
                reject(this.errors)
            }
        })
    }
}