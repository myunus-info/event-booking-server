const mongoose = require('mongoose');
const slugify = require('slugify');

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
  slug: String,

  description: {
    type: String,
    required: true,
  },
});

eventSchema.pre('save', function (next) {
  this.slug = slugify(this.eventName, { lower: true });
  next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
