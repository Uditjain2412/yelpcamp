const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once('open', () => {
    console.log("Database Connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'http://res.cloudinary.com/dokl3xz9x/image/upload/v1707985372/YelpCamp/02994f5e46b21ad0e6717e92ed2b7175.jpg',
                    filename: 'YelpCamp/02994f5e46b21ad0e6717e92ed2b7175',
                },
                {
                    url: 'http://res.cloudinary.com/dokl3xz9x/image/upload/v1707984969/YelpCamp/514293ff2601c098a428af4122d70482.jpg',
                    filename: 'YelpCamp/514293ff2601c098a428af4122d70482',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            author: '65a8b412ed2f558406831204'
        })
        await camp.save();
    }
    db.close();
}

seedDB();
