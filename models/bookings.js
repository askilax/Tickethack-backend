const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    departure : String,
    arrival: String,
    schedule: Date,
    price: Number,
});

const Bookings = mongoose.model ('bookings', bookingSchema);

module.exports =  Bookings;