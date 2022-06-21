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
    type: Number,
    required: [true, 'Age is required!'],
  },

  event: {
    eventName: {
      type: String,
      required: [true, 'Event name is required!'],
    },
    hostName: {
      type: String,
      required: [true, 'Host name is required!'],
    },
    dateTime: {
      type: Date,
      required: [true, 'Date and Time is required!'],
    },
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
