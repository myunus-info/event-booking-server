const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email address!'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required!'],
  },

  age: {
    type: String,
    required: [true, 'Age is required!'],
  },

  event: {
    eventName: String,
    hostName: String,
    dateTime: String,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
