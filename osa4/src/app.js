const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

process.env.SECRET = 'this is SeCrETT kee';

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const mongoUrl = 'mongodb://prbl90:hapadabud1d1@ds046677.mlab.com:46677/fullstack_db';
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const PORT = 3003;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('close', () => {
    mongoose.connection.close();
    console.log('Mongo connection closed');
});

module.exports = {
    app, server
};