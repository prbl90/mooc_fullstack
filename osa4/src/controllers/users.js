const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');


usersRouter.get('/', async (request, response) => {
    try {
        const users = await User.find({});
        response.json(users);
    }
    catch(exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong...' });
    }
});

usersRouter.get('/:username', async (request, response) => {
    try {
        const user = await User.find({ username: request.params.username });
        response.json(user);
    }
    catch(exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong...' });
    }
});

usersRouter.post('/', async(request, response) => {
    try {
        const userData = request.body;
        userData.password = await bcrypt.hash(userData.password, 10);
        const user = new User(userData);
        const result = await user.save();

        response.status(201).json(result);
    }
    catch(exception) {
        console.log(exception);
        response.status(500).json({ error: 'something went wrong...' });
    }
});

module.exports = usersRouter;