const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override')

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
})

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    res.render('home')
})


app.listen(port, () => {
    console.log(`YelpCamp server running on port ${port}`)
})
