## Nodejs Social App

Here's the live project [https://tosin-social-app.herokuapp.com/](https://tosin-social-app.herokuapp.com/)

## Testing credentials

username: `tosinn`
password: `qwertyqwerty`

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run watch
```

In your browser - http://localhost:${PORT}/

## Features

-   Sign Up and Login
-   Create Read Updata Delete Post
-   Post Authorization and Authentication
-   Live Search Post across the site for all users
-   Search and follow users
-   Chat room
-   CRUD api

## API Documentation

url http://localhost:${PORT}/api/

### Login

Request type: Post
URL: /api/login

Body

```
{
"username": "",
"password": ""
}
```

### Create post

Request type: Post
URL: /api/create-post

```
{
	"title": "",
	"body": "",
	"token": ""
}
```

### Delete post

Request type: Delete
URL: /api/post/:id

### Find post by Author

Request type: Get
URL: /api/postsByAuthor/username

### Upcoming features (Currently working on)

-   Creat a profile (incl. profile photo, bio)
-   Ability to post photos or normal text posts
-   Hashtag option when they are posting so users can follow hashtags
-   Suggest profiles based on follows

### Potential Upgrades

-   Use a frontend Framework
