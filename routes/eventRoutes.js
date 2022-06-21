const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController');

// router.post(
//   '/events',
//   eventController.uploadEventPhoto,
//   eventController.resizeEventPhoto,
//   eventController.createEvent
// );

// router.get('/events', eventController.getEvents);
router.get('/event/:eventId', eventController.getEventById);

router
  .route('/events')
  .get(eventController.getEvents)
  .post(eventController.uploadEventPhoto, eventController.resizeEventPhoto, eventController.createEvent);

module.exports = router;
