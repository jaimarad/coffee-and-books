// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const PlaceModel = require('../models/Place.model')

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/coffee-and-books";

const places = [
    {
        name: 'coffee',
        type: 'coffee shop',
        location: {
            type: 'Point',
            coordinates: [8.98, 0.76]
        }
    },
    {
        name: 'bookstore',
        type: 'bookstore',
        location: {
            type: 'Point',
            coordinates: [40.98, -3.06]
        }
    }, {
        name: 'coffee2',
        type: 'coffee shop',
        location: {
            type: 'Point',
            coordinates: [34, 5.89]
        }
    }, {
        name: 'bookstore2',
        type: 'bookstore',
        location: {
            type: 'Point',
            coordinates: [35.9, 34.8]
        }
    }, {
        name: 'coffee3',
        type: 'coffee shop',
        location: {
            type: 'Point',
            coordinates: [28.98, 10.76]
        }
    }]

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`

        );
        return PlaceModel.deleteMany();
    })
    .then(() => {
        return PlaceModel.insertMany(places)
    })
    .then(() => {
        console.log('Seeding completed')
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    })
    .finally(() => {
        console.log('Disconnected from the data base')
        mongoose.disconnect()
    })
