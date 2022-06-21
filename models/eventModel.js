const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  hostName: {
    type: String,
    required: true,
  },
  venue: {
    house: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
  },

  dateTime: {
    type: String,
    required: true,
  },

  photo: String,

  description: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
