const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const { posts, profile, users, legislator, ballot } = require('./routes/api');

// Base requirements
const app = express();
const PORT = process.env.port || 5001;

// MiddleWares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Will replace prohibited characters with _, 
app.use(mongoSanitize({ replaceWith: '_' }));

// DB Config 
const db = require('./config/keys').mongoURI;
// Connect to MongoDB 
mongoose
    .connect(db)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch(err => console.log(err));
app.use(express.static('../../'))
app.use('/api/users', users);
// Use routes
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/legislator', legislator)
app.use('/api/ballot', ballot)


// Listen on the port
app.listen(PORT, () => {
    console.log(`Hey there guise I'm on ports ${PORT}`)
});

