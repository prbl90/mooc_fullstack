const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);

const mongoUrl = 'mongodb://prbl90:hapadabud1d1@ds046677.mlab.com:46677/fullstack_db';
mongoose.connect(mongoUrl, { useNewUrlParser: true });

const PORT = 3003;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});