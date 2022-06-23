const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

router
  .route('/events')
  .get(eventController.getEvents)
  .post(eventController.uploadEventPhoto, eventController.resizeEventPhoto, eventController.createEvent);

router.get('/event/:eventId', eventController.getEventById);

module.exports = router;
