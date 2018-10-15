const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
    const body = request.body;

    try {
        const user = await User.findOne({username: body.username});
        const passwordCorrect = user === null ?
            false :
            await bcrypt.compare(body.password, user.password);

        if (!(user && passwordCorrect)) {
            return response.status(401).send({error: 'invalid username or password'});
        }

        const userForToken = {
            username: user.username,
            id: user._id
        };

        const token = 'Bearer ' + jwt.sign(userForToken, process.env.SECRET);

        response.status(200).send({token, username: user.username, name: user.name});
    }
    catch(exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            response.status(401).json({ error: exception.message });
        } else {
            console.log(exception);
            response.status(500).json({ error: 'something went wrong...' });
        }
    }
});




module.exports = loginRouter;