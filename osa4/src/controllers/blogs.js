const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, adult: 1});
        response.json(blogs);
    }
    catch(exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong...' });
    }
});

blogsRouter.post('/', async(request, response) => {
    try {
        const token = getTokenFrom(request);
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const user = await User.findById(decodedToken.id);

        const blogData = request.body;
        blogData.likes = request.body.likes ? request.body.likes : 0;
        blogData.user = user._id;
        //console.log(blogData);
        const blog = new Blog(blogData);
        const result = await blog.save();

        response.status(201).json(result);
    }
    catch(exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong...' });
    }
});

const getTokenFrom = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

module.exports = blogsRouter;