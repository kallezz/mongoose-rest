const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.status(200).json({
        "articles": "/articles"
    })
});

const articleRoute = require('./routes/article');
app.use('/articles', articleRoute);

const userRoute = require('./routes/user');
app.use('/users', userRoute);

// MongoDB
mongoose.connect('mongodb://localhost/mongoose-api',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
    console.log('DB Connected')
});

// Listen
app.listen(5000);