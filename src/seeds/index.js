const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://db:27017/yelp-camp';

mongoose.connect(MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log('MongoDBコネクションOK!!!');
    })
    .catch(e => {
        console.log('MongoDBコネクションエラー!!!');
        console.log(e);
    });

    const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i=0; i<50; ++i) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 2000) * 1000;
        const camp = new Campground({
            author: '67bc1c3f1fe5b8009f98ea62',
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomCityIndex].longitude,
                    cities[randomCityIndex].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dd6evc5oe/image/upload/v1741765900/YelpCamp/vb09h7zijgcqruppaqg4.jpg',
                  filename: 'YelpCamp/vb09h7zijgcqruppaqg4'
                },
                {
                  url: 'https://res.cloudinary.com/dd6evc5oe/image/upload/v1741765900/YelpCamp/ghqcbk9xtgryhxrdenc6.jpg',
                  filename: 'YelpCamp/ghqcbk9xtgryhxrdenc6'
                }
              ],
            description: '何かいろいろのものが一ぺんにジョバンニの方を見ました。もうじき鷲の停車場だねえああ、ここはランカシャイヤだ。それをカムパネルラが忘れるはずもなかったのジョバンニは靴をぬぎながら言いました。ザネリ、烏瓜ながしに行くんだいジョバンニがこらえかねて言いました。僕もうあんな大きな暗の中を、天の川の岸に、銀いろの霧が川下の方から、すうっと霧がはれかかりました。',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});